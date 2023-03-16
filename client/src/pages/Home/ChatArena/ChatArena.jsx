import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import GifBoxIcon from '@mui/icons-material/GifBox';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import classNames from 'classnames/bind';
import Avatar from '@mui/material/Avatar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styles from './ChatArena.module.scss';
import { Divider } from '@mui/material';
import MemberList from '../MemberList';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessage, sendMessage } from '~/features/message/messageSlice';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { getListServer, joinChannel } from '~/features/server/serverSlice';
const cx = classNames.bind(styles);
const ENDPOINT = 'http://localhost:3240';
var socket, seletedChatCompare;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    cursor: 'copy',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        // width: '75%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    // height: '100%',
    // position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: 'auto',
    '& .MuiInputBase-input': {
        // padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '53ch',
        },
    },
}));

function ChatArena() {
    const messageInState = useSelector((state) => state.message.data);
    const [Message, setMessage] = useState('');
    const [SocketConnected, setSocketConnected] = useState(false);
    const { currentUser } = useSelector((state) => state.auth);
    const { currentChannel } = useSelector((state) => state.servers);
    const messageData = useSelector((state) => state.message.data);
    const dispatch = useDispatch();
    const getMessage = async () => {
        const actionResult = await dispatch(getChannelMessage(currentChannel?._id));
        return actionResult;
    };
    const sendMessageHandle = async (event) => {
        if (event.keyCode === 13 && event.target.value !== '') {
            const data = { targetId: currentChannel._id, targetType: 'channel', message: event.target.value };
            const actionResult = await dispatch(sendMessage(data));
            setMessage('');
            console.log(actionResult);
            socket.emit('newMessage', {
                ...actionResult.meta.arg,
                senderId: currentUser.data?._id,
                inChat: currentChannel.inChat,
            });
            getMessage();
        }
    };
    const divRef = useRef(null);
    console.log(currentChannel);
    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', currentUser.data);
        socket.on('connection', () => {
            setSocketConnected(true);
        });
    }, []);
    useEffect(() => {
        dispatch(joinChannel(currentChannel?._id));
        getMessage();
        socket.emit('joinChat', currentChannel?._id);
    }, [currentChannel]);
    useEffect(() => {
        socket.on('message Received', (newMessageReceived) => {
            if (currentChannel?._id !== newMessageReceived.targetId) {
            } else {
                getMessage();
            }
        });
    });
    return (
        <div className={cx('chat-arena')}>
            <div className={cx('message-container')}>
                <div className={cx('message-box')}>
                    {messageData?.map((data, index, array) => {
                        return messageData?.length - 1 === index ? (
                            <div className={cx('chat')} ref={divRef}>
                                <Avatar alt="Remy Sharp" src={data.User[0]?.avatar?.data} />
                                <div className={cx('content')}>
                                    <div className={cx('user')}>
                                        <p className={cx('user-name')}>{data.User[0].username}</p>
                                        <p className={cx('time')}>to day at 9:25 AM</p>
                                    </div>
                                    <div className={cx('message')}>{data.message}</div>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('chat')}>
                                <Avatar alt="Remy Sharp" src={data.User[0]?.avatar?.data} />
                                <div className={cx('content')}>
                                    <div className={cx('user')}>
                                        <p className={cx('user-name')}>{data.User[0].username}</p>
                                        <p className={cx('time')}>to day at 9:25 AM</p>
                                    </div>
                                    <div className={cx('message')}>{data.message}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('search-container')}>
                    <Search className={cx('chat-bar')}>
                        <div className={cx('text-box')}>
                            <SearchIconWrapper>
                                <AddCircleIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Message #Chung"
                                onKeyDown={sendMessageHandle}
                                value={Message}
                                onChange={(e) => setMessage(e.target.value)}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={cx('option')}>
                            <SearchIconWrapper>
                                <CardGiftcardIcon className={cx('icon')} />
                                <GifBoxIcon className={cx('icon')} />
                                <InsertDriveFileIcon className={cx('icon')} />
                                <EmojiEmotionsIcon className={cx('icon')} />
                                <Divider orientation="vertical" sx={{}} />
                            </SearchIconWrapper>
                        </div>
                    </Search>
                </div>
            </div>
            <MemberList />
        </div>
    );
}
export default ChatArena;
