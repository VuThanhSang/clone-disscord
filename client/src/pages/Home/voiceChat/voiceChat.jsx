import { useEffect, useRef, useState } from 'react';
import { config, useClient, useMicrophoneAndCameraTracks, channelName } from '~/utils/agoraSetting';
import { Grid } from '@mui/material';
import Controls from './Controls';
import Videos from './Videos';
import { useDispatch, useSelector } from 'react-redux';
import { joinChannel } from '~/features/server/serverSlice';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
function VoiceChat(props) {
    const { currentUser } = useSelector((state) => state.auth);
    const { currentChannel } = useSelector((state) => state.servers);
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(users);

        let init = async (name) => {
            client.on('user-published', async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === 'video') {
                    setUsers((prevUsers) => {
                        return [...prevUsers, user];
                    });
                }
                if (mediaType === 'audio') {
                    user.audioTrack.play();
                }
            });
            client.on('user-unpublished', (user, mediaType) => {
                if (mediaType === 'audio') {
                    if (user.audioTrack) user.audioTrack.stop();
                }
                if (mediaType === 'video') {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                    });
                }
            });

            client.on('user-left', (user) => {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });

            try {
                await client.join(config.appId, name, config.token, null);
            } catch (error) {
                console.log(error);
            }
            if (tracks) await client.publish([tracks[0], tracks[1]]);

            setStart(true);
        };

        if (ready && tracks) {
            try {
                init(channelName);
            } catch (error) {
                console.log(error);
            }
        }
    }, [channelName, client, ready, tracks]);
    return (
        <Grid container direction="column" style={{ height: '100%', backgroundColor: 'black' }}>
            <Grid item sx={{ height: '5%', display: 'flex' }}>
                <VolumeUpIcon sx={{ color: 'white' }} />
                <p style={{ color: 'white', fontSize: 18 }}>{currentChannel.name}</p>
            </Grid>
            <Grid item sx={{ height: '85%' }}>
                {start && tracks && <Videos tracks={tracks} users={users} />}
            </Grid>
            <Grid item sx={{ height: '10%' }}>
                {ready && tracks && <Controls tracks={tracks} setStart={setStart} />}
            </Grid>
        </Grid>
    );
}
export default VoiceChat;
