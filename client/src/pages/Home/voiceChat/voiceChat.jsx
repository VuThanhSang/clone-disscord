import React, { useEffect, useRef, useState } from 'react';
import { config, useClient, useMicrophoneAndCameraTracks, channelName } from '~/utils/agoraSetting';
import { Button, Divider, Drawer, Grid, Stack } from '@mui/material';
import Controls from './Controls';
import Videos from './Videos';
import { useDispatch, useSelector } from 'react-redux';
import { joinChannel } from '~/features/server/serverSlice';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import InboxIcon from '@mui/icons-material/Inbox';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import CloseIcon from '@mui/icons-material/Close';
function VoiceChat(props) {
    const { currentChannel } = useSelector((state) => state.servers);
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();
    const [track, setTrack] = useState({ video: true, audio: true });
    const [OpenChat, setOpenChat] = useState(false);
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
    useEffect(() => {
        dispatch(joinChannel(currentChannel?._id));
    }, []);
    return (
        <Grid container direction="column" style={{ height: '100%', backgroundColor: 'black' }}>
            <Grid item sx={{ height: '5%', padding: 2, display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                    <VolumeUpIcon sx={{ color: 'white' }} />
                    <p style={{ color: 'white', fontSize: 18 }}>{currentChannel?.name}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <ViewComfyIcon style={{ color: 'white', marginLeft: 3, cursor: 'pointer' }} />
                    <InboxIcon style={{ color: 'white', marginLeft: 20, cursor: 'pointer' }} />
                    <MoreHorizIcon style={{ color: 'white', marginLeft: 20, cursor: 'pointer' }} />
                    <ChatBubbleIcon
                        onClick={() => setOpenChat(!OpenChat)}
                        style={{ color: 'white', marginLeft: 20, cursor: 'pointer' }}
                    />
                </div>
            </Grid>
            <Grid item sx={{ height: '85%' }}>
                {start && tracks && <Videos tracks={tracks} users={users} track={track} setTrack={setTrack} />}
            </Grid>
            <Grid item sx={{ height: '10%' }}>
                {ready && tracks && <Controls tracks={tracks} setStart={setStart} track={track} setTrack={setTrack} />}
            </Grid>

            <React.Fragment>
                <Drawer anchor="right" open={OpenChat} onClose={() => setOpenChat(!OpenChat)}>
                    <Stack
                        direction="column"
                        sx={{ width: '450px', height: '100%', backgroundColor: '#313338', color: 'white' }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ fontSize: 16, height: '10%' }}
                        >
                            <Stack direction="row" sx={{ padding: 2, alignItems: 'center' }}>
                                <ChatBubbleIcon sx={{ marginRight: 2 }}></ChatBubbleIcon>
                                <p>{currentChannel.name}</p>
                            </Stack>
                            <CloseIcon sx={{ marginRight: 2 }}></CloseIcon>
                        </Stack>
                        <Divider></Divider>
                        <Stack sx={{ height: '80%' }}>chat</Stack>
                        <Stack sx={{ height: '10%%' }}>khung chat</Stack>
                    </Stack>
                </Drawer>
            </React.Fragment>
        </Grid>
    );
}
export default VoiceChat;
