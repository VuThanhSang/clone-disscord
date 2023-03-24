import classNames from 'classnames/bind';
import styles from './subSideBar.module.scss';
import Avatar from '@mui/material/Avatar';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';

import ExpandMore from '@mui/icons-material/ExpandMore';

import { useEffect, useState } from 'react';
import { Box, Fade, ListItem, Menu, MenuItem, Modal, Typography } from '@mui/material';
import SettingLayout from '~/Layout/SettingLayout';
import Profile from '~/pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import Channel from './Channel';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const cx = classNames.bind(styles);
function SubSideBar() {
    const { currentUser, loading } = useSelector((state) => state.auth);
    const { currentServer } = useSelector((state) => state.servers);

    const [openModalSetting, setOpenModalSetting] = useState(false);
    const handleOpenModalSetting = () => setOpenModalSetting(true);
    const handleCloseModalSetting = () => setOpenModalSetting(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('server-name')}>
                <span
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <p>SxS</p> <ExpandMore className={cx('icon')}></ExpandMore>
                </span>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            bgcolor: '#111214',
                            color: '#fff',
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },

                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <div className={cx('dropdown-item')}>
                            <p>Invite People</p>
                            <PersonAddAltIcon />
                        </div>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <div className={cx('dropdown-item')}>
                            <p> Server Setting</p>
                            <SettingsIcon />
                        </div>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <div className={cx('dropdown-item')}>
                            <p> Create Channel </p>
                            <AddCircleIcon />
                        </div>
                    </MenuItem>
                </Menu>
            </div>
            <Channel />
            <div className={cx('control')}>
                <div className={cx('info')}>
                    <Avatar className={cx('avatar')} alt="Remy Sharp" src={currentUser?.data.avatar?.data} />
                    <div className={cx('name')}>
                        <p>{currentUser?.data.username}</p>
                        <p>#6969</p>
                    </div>
                </div>
                <MicIcon className={cx('icon')}></MicIcon>
                <HeadphonesIcon className={cx('icon')}></HeadphonesIcon>

                <SettingsIcon className={cx('icon')} onClick={handleOpenModalSetting}>
                    Open modal
                </SettingsIcon>
                <Modal
                    open={openModalSetting}
                    onClose={handleCloseModalSetting}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <SettingLayout callBack={handleCloseModalSetting}>
                        <Profile />
                    </SettingLayout>
                </Modal>
            </div>
        </div>
    );
}

export default SubSideBar;
