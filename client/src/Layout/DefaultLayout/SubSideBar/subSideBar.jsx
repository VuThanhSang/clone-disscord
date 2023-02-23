import classNames from 'classnames/bind';
import styles from './subSideBar.module.scss';
import Avatar from '@mui/material/Avatar';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TagIcon from '@mui/icons-material/Tag';
import { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import SettingLayout from '~/Layout/SettingLayout';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function SubSideBar() {
    const { currentUser, loading } = useSelector((state) => state.auth);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openChat, setOpenChat] = useState(true);

    const handleClickChat = () => {
        setOpenChat(!openChat);
    };
    const [openVoice, setOpenVoice] = useState(true);

    const handleClickVoice = () => {
        setOpenVoice(!openVoice);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('server-name')}>
                <span>
                    <p>SxS</p> <ExpandMore className={cx('icon')}></ExpandMore>
                </span>
            </div>

            <div className={cx('channels')}>
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'rgb(47,49,54)',
                        color: 'rgb(150,152,157)',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton onClick={handleClickChat}>
                        {openChat ? (
                            <ExpandLess sx={{ color: 'rgb(150,152,157)', fontSize: 25 }} />
                        ) : (
                            <ExpandMore sx={{ color: 'rgb(150,152,157)', fontSize: 25 }} />
                        )}
                        {/* <p style={{ marginLeft: 0.5, fontSize: 15 }}>KÊNH CHAT</p> */}
                        <ListItemText
                            sx={{
                                marginLeft: 0.5,

                                '&:hover': { color: '#fff' },
                            }}
                            primaryTypographyProps={{
                                fontSize: 13,
                                fontWeight: 'medium',
                                letterSpacing: 0,
                            }}
                            primary="KÊNH CHAT"
                        />
                    </ListItemButton>
                    <Collapse in={openChat} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <TagIcon sx={{ color: 'rgb(150,152,157)', fontSize: 25 }} />
                                <ListItemText
                                    sx={{
                                        marginLeft: 0.5,

                                        '&:hover': { color: '#fff' },
                                    }}
                                    primaryTypographyProps={{
                                        fontSize: 13,
                                        fontWeight: 'medium',
                                        letterSpacing: 0,
                                    }}
                                    primary="Starred"
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <Collapse in={openChat} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <TagIcon sx={{ color: 'rgb(150,152,157)', fontSize: 25 }} />
                                <ListItemText
                                    sx={{
                                        marginLeft: 0.5,

                                        '&:hover': { color: '#fff' },
                                    }}
                                    primaryTypographyProps={{
                                        fontSize: 13,
                                        fontWeight: 'medium',
                                        letterSpacing: 0,
                                    }}
                                    primary="Starred"
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>

                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'rgb(47,49,54)',
                        color: 'rgb(150,152,157)',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton onClick={handleClickVoice}>
                        {openVoice ? (
                            <ExpandLess sx={{ color: 'rgb(150,152,157)', fontSize: 25 }} />
                        ) : (
                            <ExpandMore sx={{ color: 'rgb(150,152,157)', fontSize: 25 }} />
                        )}
                        {/* <p style={{ marginLeft: 0.5, fontSize: 15 }}>KÊNH CHAT</p> */}
                        <ListItemText
                            sx={{
                                marginLeft: 0.5,

                                '&:hover': { color: '#fff' },
                            }}
                            primaryTypographyProps={{
                                fontSize: 13,
                                fontWeight: 'medium',
                                letterSpacing: 0,
                            }}
                            primary="KÊNH THOẠI"
                        />
                    </ListItemButton>
                    <Collapse in={openVoice} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <VolumeUpIcon sx={{ color: 'rgb(150,152,157)', fontSize: 25 }} />
                                <ListItemText
                                    sx={{
                                        marginLeft: 0.5,

                                        '&:hover': { color: '#fff' },
                                    }}
                                    primaryTypographyProps={{
                                        fontSize: 13,
                                        fontWeight: 'medium',
                                        letterSpacing: 0,
                                    }}
                                    primary="Starred"
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <Collapse in={openVoice} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <VolumeUpIcon sx={{ color: 'rgb(150,152,157)', fontSize: 25 }} />
                                <ListItemText
                                    sx={{
                                        marginLeft: 0.5,

                                        '&:hover': { color: '#fff' },
                                    }}
                                    primaryTypographyProps={{
                                        fontSize: 13,
                                        fontWeight: 'medium',
                                        letterSpacing: 0,
                                    }}
                                    primary="Starred"
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </div>
            <div className={cx('control')}>
                <div className={cx('info')}>
                    <Avatar className={cx('avatar')} alt="Remy Sharp" src={currentUser?.result?.data.avatar?.data} />
                    <div className={cx('name')}>
                        <p>
                            {currentUser?.result?.data.lastName} {currentUser?.result?.data.middleName}{' '}
                            {currentUser?.result?.data.firstName}
                        </p>
                        <p>#6969</p>
                    </div>
                </div>
                <MicIcon className={cx('icon')}></MicIcon>
                <HeadphonesIcon className={cx('icon')}></HeadphonesIcon>

                <SettingsIcon className={cx('icon')} onClick={handleOpen}>
                    Open modal
                </SettingsIcon>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <SettingLayout callBack={handleClose}>
                            <Profile />
                        </SettingLayout>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default SubSideBar;
