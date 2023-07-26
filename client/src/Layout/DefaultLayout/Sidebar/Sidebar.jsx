import { styled, alpha } from '@mui/material/styles';
import { Avatar, Box, Button, InputBase, Modal, Tooltip } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChannel, changeServer, getListServer } from '~/features/server/serverSlice';
import styles from './Sidebar.module.scss';
import CreateServer from './CreateServer';
import { getChannelMessage } from '~/features/message/messageSlice';

const cx = classNames.bind(styles);

function Sidebar() {
    const { server, loading } = useSelector((state) => state.servers);
    const [openModalAddServer, setOpenModalAddServer] = useState(false);
    const dispatch = useDispatch();

    const handleOpenModalAddServer = () => {
        setOpenModalAddServer(true);
    };
    const handleCloseModalAddServer = () => {
        setOpenModalAddServer(false);
        dispatch(getListServer());
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('box')}>
                <Avatar
                    sx={{ width: 45, height: 45 }}
                    src="https://static.vecteezy.com/system/resources/thumbnails/006/892/625/small/discord-logo-icon-editorial-free-vector.jpg"
                    alt="none"
                />
            </div>
            <div className={cx('slash')}></div>
            {server?.map((data, index) => {
                return (
                    <div className={cx('box')} key={index}>
                        <Tooltip title={data.name} placement="right">
                            <Avatar
                                sx={{ width: 45, height: 45 }}
                                src="https://static.vecteezy.com/system/resources/thumbnails/006/892/625/small/discord-logo-icon-editorial-free-vector.jpg"
                                alt="none"
                                onClick={(e) => {
                                    dispatch(changeServer(data));
                                    console.log(data.channel[0][0]._id);
                                    dispatch(getChannelMessage({ currentChannel: data.channel[0][0]?._id, paging: 1 }));
                                }}
                            />
                        </Tooltip>
                    </div>
                );
            })}
            <div className={cx('box')} onClick={handleOpenModalAddServer}>
                <Tooltip title="Create New server" placement="right">
                    <Avatar
                        sx={{ width: 45, height: 45, backgroundColor: '#2B2D31' }}
                        src="https://static.vecteezy.com/system/resources/previews/000/365/670/original/plus-vector-icon.jpg"
                        alt="none"
                    />
                </Tooltip>
            </div>
            <Modal
                open={openModalAddServer}
                onClose={handleCloseModalAddServer}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CreateServer callback={handleCloseModalAddServer} />
            </Modal>
        </div>
    );
}

export default Sidebar;
