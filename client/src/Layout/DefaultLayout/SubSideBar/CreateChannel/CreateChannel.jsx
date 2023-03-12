import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './CreateChannel.module.scss';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, FormControl, FormControlLabel, RadioGroup, Typography } from '@mui/material';
import { ChromePicker } from 'react-color';
import Radio from '@mui/material/Radio';
import CloseIcon from '@mui/icons-material/Close';
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
    padding: 2,
};
function CreateChannel({ callback }) {
    const [ChooseType, setChooseType] = useState('option1');
    const handleOptionChange = async (e) => {
        setChooseType(e.target.value);
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
                                <CloseIcon className={cx('icon')} onClick={callback} />
                                <div className={cx('type-info')}>
                                    <h6>Text</h6>
                                    <p>Send message, image, GIF's, emoji, opinions, and puns</p>
                                </div>
                                <input
                                    type="radio"
                                    value="option1"
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
                                    value="option2"
                                    checked={ChooseType === 'option2'}
                                    onChange={handleOptionChange}
                                />
                            </div>
                        </form>
                    </div>
                </Box>
            </div>
        </div>
    );
}
export default CreateChannel;
