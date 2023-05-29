import classNames from 'classnames/bind';
import styles from './channel.module.scss';
import Avatar from '@mui/material/Avatar';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TagIcon from '@mui/icons-material/Tag';
import { useEffect, useState } from 'react';
import { Box, ListItem, Modal, Typography } from '@mui/material';
import SettingLayout from '~/Layout/SettingLayout';
import Profile from '~/pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CreateChannel from '../CreateChannel';
import { changeChannel, getListServer } from '~/features/server/serverSlice';
import ChannelSetting from '~/pages/ChannelSetting';
import { getChannelMessage } from '~/features/message/messageSlice';
const cx = classNames.bind(styles);
function Channel() {
    const { currentUser, loading } = useSelector((state) => state.auth);
    const { currentServer } = useSelector((state) => state.servers);

    const [openModalAddChannel, setOpenModalAddChannel] = useState(false);
    const handleOpenModalAddChannel = () => {
        setOpenModalAddChannel(true);
    };
    const handleCloseModalAddChannel = () => setOpenModalAddChannel(false);

    const [modalChannelSetting, setModalChannelSetting] = useState(false);
    const handleOpenChannelSetting = () => setModalChannelSetting(true);
    const handleCloseChannelSetting = () => setModalChannelSetting(false);

    const [openChat, setOpenChat] = useState(true);
    const dispatch = useDispatch();

    const handleClickChat = () => {
        setOpenChat(!openChat);
    };
    const [openVoice, setOpenVoice] = useState(true);

    const handleClickVoice = () => {
        setOpenVoice(!openVoice);
    };
    useEffect(() => {
        dispatch(getListServer());
    }, [openModalAddChannel]);
    // console.log(currentServer);
    return (
        <div className={cx('wrapper')}>
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
                    <ListItem>
                        {openChat ? (
                            <ExpandLess onClick={handleClickChat} sx={{ color: 'rgb(150,152,157)', fontSize: 25 }} />
                        ) : (
                            <ExpandMore onClick={handleClickChat} sx={{ color: 'rgb(150,152,157)', fontSize: 25 }} />
                        )}
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
                        {currentServer?.ownerId === currentUser?.data._id && (
                            <div>
                                <AddIcon sx={{ cursor: 'pointer' }} onClick={handleOpenModalAddChannel} />
                                <Modal
                                    open={openModalAddChannel}
                                    onClose={handleCloseModalAddChannel}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <CreateChannel callback={handleCloseModalAddChannel} />
                                    {/* <SettingLayout callBack={handleCloseModalAddChannel}>
                                    </SettingLayout> */}
                                </Modal>
                            </div>
                        )}
                    </ListItem>
                    {currentServer?.channel.map((data, index) => {
                        if (data[0]?.type === 'chat') {
                            return (
                                <Collapse key={index} in={openChat} timeout="auto" unmountOnExit>
                                    <List component="div" sx={{ display: 'flex' }} disablePadding>
                                        <ListItem
                                            sx={{ pl: 4, cursor: 'pointer' }}
                                            onClick={() => {
                                                dispatch(changeChannel(data[0]));
                                                dispatch(
                                                    getChannelMessage({ currentChannel: data[0]?._id, paging: 1 }),
                                                );
                                            }}
                                        >
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
                                                primary={data[0].name}
                                            />
                                        </ListItem>
                                        {currentServer?.ownerId === currentUser?.data._id && (
                                            <div style={{ marginRight: 20, marginTop: 14, display: 'flex' }}>
                                                <PersonAddAlt1Icon
                                                    sx={{ cursor: 'pointer', fontSize: 15, marginRight: 1 }}
                                                    onClick={handleOpenModalAddChannel}
                                                />
                                                <SettingsIcon
                                                    sx={{ cursor: 'pointer', fontSize: 15 }}
                                                    onClick={handleOpenChannelSetting}
                                                />
                                            </div>
                                        )}
                                    </List>
                                </Collapse>
                            );
                        }
                    })}
                </List>
                {/* voiceChat */}
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'rgb(47,49,54)',
                        color: 'rgb(150,152,157)',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItem>
                        {openChat ? (
                            <ExpandLess onClick={handleClickVoice} sx={{ color: 'rgb(150,152,157)', fontSize: 25 }} />
                        ) : (
                            <ExpandMore onClick={handleClickVoice} sx={{ color: 'rgb(150,152,157)', fontSize: 25 }} />
                        )}
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
                        {currentServer?.ownerId === currentUser?.data._id && (
                            <div>
                                <AddIcon sx={{ cursor: 'pointer' }} onClick={handleOpenModalAddChannel} />
                                <Modal
                                    open={openModalAddChannel}
                                    onClose={handleCloseModalAddChannel}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <CreateChannel callback={handleCloseModalAddChannel} />
                                    {/* <SettingLayout callBack={handleCloseModalAddChannel}>
                                    </SettingLayout> */}
                                </Modal>
                            </div>
                        )}
                    </ListItem>
                    {currentServer?.channel.map((data, index) => {
                        if (data[0]?.type === 'voiceChat') {
                            return (
                                <Collapse key={index} in={openChat} timeout="auto" unmountOnExit>
                                    <List component="div" sx={{ display: 'flex' }} disablePadding>
                                        <ListItem
                                            sx={{ pl: 4, cursor: 'pointer' }}
                                            onClick={() => {
                                                dispatch(changeChannel(data[0]));
                                            }}
                                        >
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
                                                primary={data[0].name}
                                            />
                                        </ListItem>
                                        {currentServer?.ownerId === currentUser?.data._id && (
                                            <div style={{ marginRight: 20, marginTop: 14, display: 'flex' }}>
                                                <PersonAddAlt1Icon
                                                    sx={{ cursor: 'pointer', fontSize: 15, marginRight: 1 }}
                                                    onClick={handleOpenModalAddChannel}
                                                />
                                                <SettingsIcon
                                                    sx={{ cursor: 'pointer', fontSize: 15 }}
                                                    onClick={handleOpenChannelSetting}
                                                />
                                            </div>
                                        )}
                                    </List>
                                </Collapse>
                            );
                        }
                    })}
                </List>
            </div>

            <div>
                <Modal
                    open={openModalAddChannel}
                    onClose={handleCloseModalAddChannel}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <CreateChannel callback={handleCloseModalAddChannel} />
                </Modal>
                <Modal
                    open={modalChannelSetting}
                    onClose={handleCloseChannelSetting}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <SettingLayout channelSetting={true} callBack={handleCloseChannelSetting}>
                        <ChannelSetting />
                    </SettingLayout>
                </Modal>
            </div>
        </div>
    );
}

export default Channel;
