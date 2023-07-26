import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import styles from './Profile.module.scss';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Avatar, Box, Button, Card, CardHeader, InputBase } from '@mui/material';
import { ChromePicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '~/features/auth/authSlice';
const cx = classNames.bind(styles);

function Profile() {
    const [tabValue, setTabValue] = useState('1');
    const { currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const inputRef = useRef();

    const handleUpload = (e) => {
        inputRef.current.click();
    };
    const updateAvatarHandler = (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('intro', '1');
        dispatch(updateUser(formData));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h5>Profiles</h5>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: '#3f4147' }}>
                            <TabList onChange={handleTabChange} textColor="inherit" aria-label="lab API tabs example">
                                <Tab className={cx('tab')} label="User Profile" value="1" />
                                <Tab className={cx('tab')} label="Server Profile" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div className={cx('tab-content')}>
                                <div className={cx('update')}>
                                    <div>
                                        <h5>Display Name</h5>
                                        <div className={cx('set-avatar')}>
                                            <InputBase
                                                sx={{
                                                    ml: 1,
                                                    flex: 1,
                                                    backgroundColor: '#1e1f22',
                                                    color: 'white',
                                                    fontSize: 12,
                                                    marginRight: 1,
                                                    paddingLeft: 1,
                                                }}
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }}
                                                placeholder={currentUser.data.username}
                                            />
                                            <Button
                                                variant="contained"
                                                sx={{ color: '#fff', fontSize: 9, width: 100, height: 30 }}
                                                onClick={(e) => {
                                                    dispatch(updateUser({ username: username }));
                                                }}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                        <div className={cx('slash')}></div>
                                    </div>

                                    <div>
                                        <h5>Avatar</h5>
                                        <div className={cx('set-avatar')}>
                                            <input
                                                ref={inputRef}
                                                type="file"
                                                onChange={updateAvatarHandler}
                                                style={{ display: 'none' }}
                                            />
                                            <Button
                                                variant="contained"
                                                sx={{ color: '#fff', fontSize: 12, width: 150, height: 30 }}
                                                onClick={handleUpload}
                                            >
                                                Change Avatar
                                            </Button>
                                            <p>Remove Avatar</p>
                                        </div>
                                        <div className={cx('slash')}></div>
                                    </div>
                                </div>

                                <div className={cx('display')}>
                                    <Card sx={{ maxWidth: 345, margin: 5, backgroundColor: '#232428', color: 'white' }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar
                                                    src={currentUser.data.avatar.data}
                                                    sx={{ width: 40, height: 40 }}
                                                    aria-label="recipe"
                                                ></Avatar>
                                            }
                                            title={currentUser.data.username}
                                            subheader={'#' + currentUser.data.username}
                                        />
                                    </Card>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    );
}
export default Profile;
