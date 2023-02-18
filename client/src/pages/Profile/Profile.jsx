import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Profile.module.scss';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button } from '@mui/material';
import { ChromePicker } from 'react-color';
const cx = classNames.bind(styles);

function Profile() {
    const [tabValue, setTabValue] = useState('1');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
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
                                    <h5>Avatar</h5>
                                    <div className={cx('set-avatar')}>
                                        <Button
                                            variant="contained"
                                            sx={{ color: '#fff', fontSize: 12, width: 150, height: 30 }}
                                        >
                                            Change Avatar
                                        </Button>
                                        <p>Remove Avatar</p>
                                    </div>
                                    <div className={cx('slash')}></div>
                                    <h5>Banner color</h5>
                                    <div className={cx('slash')}></div>
                                    <h5>About Me</h5>
                                    <p style={{ fontSize: 12, color: '#b8b9bf' }}>
                                        You can use markdown and links if you're like
                                    </p>

                                    <textarea
                                        rows="20"
                                        name="comment[text]"
                                        id="comment_text"
                                        cols="40"
                                        class="ui-autocomplete-input"
                                        autocomplete="off"
                                        aria-autocomplete="list"
                                        aria-haspopup="true"
                                    ></textarea>
                                </div>
                                <div className={cx('display')}></div>
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
