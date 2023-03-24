import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './ChannelSetting.module.scss';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, InputBase, styled } from '@mui/material';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '600px',
    backgroundColor: '#1E1F22',
    borderRadius: '5px',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 1),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '53ch',
        },
    },
}));
function ChannelSetting() {
    const { currentChannel, loading } = useSelector((state) => state.servers);
    const [tabValue, setTabValue] = useState('1');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h5>Overview</h5>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <div className={cx('tab-content')}>
                        <div className={cx('update')}>
                            <h5 style={{ marginTop: 20 }}>Channel Name</h5>
                            <StyledInputBase placeholder="Message #Chung" inputProps={{ 'aria-label': 'search' }} />
                            <div className={cx('slash')}></div>
                            <h5>Banner color</h5>
                            <div className={cx('slash')}></div>
                            <h5>About Me</h5>
                            <p style={{ fontSize: 12, color: '#b8b9bf' }}>
                                You can use markdown and links if you're like
                            </p>
                        </div>
                        <div className={cx('display')}></div>
                    </div>
                </Box>
            </div>
        </div>
    );
}
export default ChannelSetting;
