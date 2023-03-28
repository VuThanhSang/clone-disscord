import { AgoraVideoPlayer } from 'agora-rtc-react';
import { useEffect, useRef, useState } from 'react';
import { config, useClient, useMicrophoneAndCameraTracks, channelName } from '~/utils/agoraSetting';
import { Button, Grid } from '@mui/material';

function Videos(props) {
    const { users, tracks } = props;
    const [gridSpacing, setGridSpacing] = useState(6);
    // useEffect(() => {
    //     // setGridSpacing(Math.max(Math.floor(12 * (users.length + 1))), 4);
    // }, [users, tracks]);
    return (
        <Grid container sx={{ height: '100%', padding: 15 }} rowSpacing={1}>
            <Grid item xs={gridSpacing}>
                <AgoraVideoPlayer videoTrack={tracks[1]} style={{ height: '150px', width: '300px' }} />
            </Grid>
            {users.length > 0 &&
                users.map((user) => {
                    if (user.videoTrack) {
                        return (
                            <Grid item xs={gridSpacing}>
                                <AgoraVideoPlayer
                                    videoTrack={user.videoTrack}
                                    key={user.uid}
                                    style={{ height: '150px', width: '300px' }}
                                />
                            </Grid>
                        );
                    } else return null;
                })}
        </Grid>
    );
}
export default Videos;
