import { useEffect, useRef, useState } from 'react';
import { config, useClient, useMicrophoneAndCameraTracks, channelName } from '~/utils/agoraSetting';
import { Button, Grid } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Controls(props) {
    const client = useClient();
    const { tracks, setStart, track, setTrack } = props;
    const leaveChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setStart(false);
    };
    const mute = async (type) => {
        if (type === 'audio') {
            await tracks[0].setEnabled(!track.audio);
            setTrack((ps) => {
                return { ...ps, audio: !ps.audio };
            });
        } else if (type === 'video') {
            await tracks[1].setEnabled(!track.video);
            setTrack((ps) => {
                return { ...ps, video: !ps.video };
            });
        }
    };
    return (
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
                <Button
                    sx={{ backgroundColor: 'white', width: '50px', height: '50px', borderRadius: 100 }}
                    onClick={() => mute('audio')}
                >
                    {track.audio ? <MicIcon /> : <MicOffIcon />}
                </Button>
            </Grid>
            <Grid item>
                <Button
                    sx={{ backgroundColor: 'white', width: '50px', height: '50px', borderRadius: 100 }}
                    onClick={() => mute('video')}
                >
                    {track.video ? <VideocamIcon /> : <VideocamOffIcon />}
                </Button>
            </Grid>
            <Grid item>
                <Button
                    sx={{ backgroundColor: 'darkslategrey', width: '50px', height: '50px', borderRadius: 100 }}
                    onClick={() => leaveChannel()}
                    color="error"
                >
                    <ExitToAppIcon />
                </Button>
            </Grid>
        </Grid>
    );
}
export default Controls;
