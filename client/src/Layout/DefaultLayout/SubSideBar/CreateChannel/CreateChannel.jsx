import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './CreateChannel.module.scss';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    IconButton,
    InputBase,
    Paper,
    RadioGroup,
    Typography,
} from '@mui/material';
import { ChromePicker } from 'react-color';
import Radio from '@mui/material/Radio';
import CloseIcon from '@mui/icons-material/Close';
import TagIcon from '@mui/icons-material/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { createChannel, getListServer } from '~/features/server/serverSlice';
const cx = classNames.bind(styles);
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 466,
    height: 480,
    borderRadius: 3,
    bgcolor: 'rgb(49,51,56)',
    border: '2px solid #000',
    color: '#ffffff',
    boxShadow: 24,
    p: 4,
    padding: 0,
};
function CreateChannel({ callback }) {
    const { currentServer } = useSelector((state) => state.servers);

    const [ChooseType, setChooseType] = useState('chat');
    const [NameChannel, setNameChannel] = useState('');
    const dispatch = useDispatch();

    const handleOptionChange = async (e) => {
        console.log(e.target.value);
        setChooseType(e.target.value);
    };
    const handleCreate = () => {
        dispatch(createChannel({ serverId: currentServer._id, name: NameChannel, type: ChooseType }));
        callback();
        dispatch(getListServer());
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Box sx={style}>
                    <div className={cx('header')}>
                        <div>
                            <h5>Create Channel</h5>
                            <p>In</p>
                        </div>
                        <CloseIcon className={cx('icon')} onClick={callback} />
                    </div>
                    <div className={cx('chooseType')}>
                        <h6>Channel Type</h6>
                        <form action="">
                            <div className={cx('typeRadio')}>
                                <TagIcon className={cx('icon')} onClick={callback} />
                                <div className={cx('type-info')}>
                                    <h6>Text</h6>
                                    <p>Send message, image, GIF's, emoji, opinions, and puns</p>
                                </div>
                                <input
                                    type="radio"
                                    value="chat"
                                    checked={ChooseType === 'option1'}
                                    onChange={handleOptionChange}
                                />
                            </div>
                            <div className={cx('typeRadio')}>
                                <CloseIcon className={cx('icon')} onClick={callback} />
                                <div className={cx('type-info')}>
                                    <h6>Voice Chat</h6>
                                    <p>Hang out together with voice,video,and screen share</p>
                                </div>
                                <input
                                    type="radio"
                                    value="voiceChat"
                                    checked={ChooseType === 'option2'}
                                    onChange={handleOptionChange}
                                />
                            </div>
                        </form>
                    </div>
                    <div className={cx('name-channel')} style={{ marginTop: 20, paddingLeft: 20 }}>
                        <h6>Channel Type</h6>
                        <Paper
                            component="form"
                            sx={{
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                width: 425,
                                backgroundColor: '#1E1F22',
                            }}
                        >
                            <IconButton sx={{ p: '10px', color: '#DBDEE1' }} aria-label="menu">
                                <TagIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1, color: '#DBDEE1' }}
                                placeholder="new-channel"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                value={NameChannel}
                                onChange={(e) => setNameChannel(e.target.value)}
                            />
                        </Paper>
                    </div>
                    <div className={cx('submit')}>
                        <a href="/" style={{ color: '#DBDEE1', fontSize: 15, marginRight: 20 }}>
                            cancel
                        </a>
                        <Button variant="contained" onClick={handleCreate} sx={{ marginRight: 1, fontSize: 12 }}>
                            Create Channel
                        </Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}
export default CreateChannel;
