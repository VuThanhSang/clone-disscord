import { AgoraVideoPlayer } from 'agora-rtc-react';
import { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInChat } from '~/features/server/serverSlice';

function Videos(props) {
    const { currentUser } = useSelector((state) => state.auth);
    const { currentChannel, inChat } = useSelector((state) => state.servers);
    const { users, tracks, track } = props;
    const [gridSpacing, setGridSpacing] = useState(6);
    const [userInChat, setUserInChat] = useState([]);
    let arr = users.filter((data) => data[0]._id !== currentUser.data._id);
    useEffect(() => {
        if (users.length <= 1) {
            setGridSpacing(12);
        } else {
            setGridSpacing(6);
        }
    });
    const dispatch = useDispatch();
    console.log(inChat);
    useEffect(() => {
        dispatch(getUserInChat(currentChannel._id));
    }, []);
    return (
        <Grid container sx={{ height: '100%', padding: 22, paddingTop: 5, width: '100%' }} rowSpacing={1}>
            {track.video ? (
                <Grid
                    item
                    xs={gridSpacing}
                    style={{
                        height: '200px',
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    <AgoraVideoPlayer
                        videoTrack={tracks[1]}
                        style={{
                            height: '200px',
                        }}
                    ></AgoraVideoPlayer>
                    <p style={{ position: 'absolute', bottom: 10, left: 5, fontSize: 12, color: 'white' }}>
                        {currentUser.data.username}
                    </p>
                </Grid>
            ) : (
                <Grid item xs={gridSpacing}>
                    <div
                        style={{
                            height: '200px',
                            width: '100%',
                            backgroundColor: 'lightblue',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <Avatar src={currentUser.data?.avatar?.data} alt="gege" sx={{ width: 100, height: 100 }} />
                        <p style={{ position: 'absolute', bottom: 10, left: 5, fontSize: 12 }}>
                            {currentUser.data.username}
                        </p>
                    </div>
                </Grid>
            )}
            {users.length > 0
                ? arr.map((user) => {
                      if (user.videoTrack) {
                          return (
                              <Grid item xs={gridSpacing}>
                                  <AgoraVideoPlayer
                                      videoTrack={user.videoTrack}
                                      key={user.uid}
                                      style={{ height: '200px' }}
                                  />
                              </Grid>
                          );
                      } else return null;
                  })
                : inChat.map((data) => {
                      if (data[0]._id !== currentUser.data._id) {
                          return (
                              <Grid item xs={gridSpacing}>
                                  <div
                                      style={{
                                          height: '200px',
                                          width: '100%',
                                          backgroundColor: 'lightblue',
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          position: 'relative',
                                      }}
                                  >
                                      <Avatar src={data[0]?.avatar?.data} alt="gege" sx={{ width: 100, height: 100 }} />
                                      <p
                                          style={{
                                              position: 'absolute',
                                              bottom: 10,
                                              left: 5,
                                              fontSize: 12,
                                          }}
                                      >
                                          {data[0]?.username}
                                      </p>
                                  </div>
                              </Grid>
                          );
                      } else return null;
                  })}
        </Grid>
    );
}
export default Videos;
