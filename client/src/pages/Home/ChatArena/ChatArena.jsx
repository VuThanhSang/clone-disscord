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
import { getChannelMessage, scrollMessage, sendMessage } from '~/features/message/messageSlice';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { getListServer, joinChannel } from '~/features/server/serverSlice';
import { InView } from 'react-intersection-observer';
import { calculateTimePassed } from '~/utils/utils';
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
    const paging = useSelector((state) => state.message.paging);
    const [Message, setMessage] = useState('');
    const [SocketConnected, setSocketConnected] = useState(false);
    const { currentUser } = useSelector((state) => state.auth);
    const { currentChannel } = useSelector((state) => state.servers);
    const dispatch = useDispatch();
    const [PagingOfChat, setPagingOfChat] = useState(1);
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
            dispatch(getChannelMessage({ currentChannel: currentChannel?._id, paging: 1 }));
            divRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollTopHandle = async (inView, entry) => {
        if (inView === true) {
            if (PagingOfChat <= paging) {
                setPagingOfChat(PagingOfChat + 1);
                dispatch(scrollMessage({ currentChannel: currentChannel?._id, paging: PagingOfChat }));
                divRef.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
            }
        }
    };
    const divRef = useRef(null);
    // useEffect(() => {}, []);

    //join socket
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', currentUser.data);
        socket.on('connection', () => {
            setSocketConnected(true);
        });
    }, []);
    //update while change channel
    useEffect(() => {
        dispatch(joinChannel(currentChannel?._id));
        dispatch(getChannelMessage({ currentChannel: currentChannel?._id, paging: 1 }));
        setPagingOfChat(1);
        socket.emit('joinChat', currentChannel?._id);
    }, [currentChannel]);
    //socket
    useEffect(() => {
        if (PagingOfChat === 1) {
            divRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        socket.on('message Received', (newMessageReceived) => {
            if (currentChannel?._id !== newMessageReceived.targetId) {
            } else {
                dispatch(getChannelMessage({ currentChannel: currentChannel?._id, paging: 1 }));
            }
        });
    });
    return (
        <div className={cx('chat-arena')}>
            <div className={cx('message-container')}>
                <div className={cx('message-box')}>
                    {messageInState?.map((data, index, array) => {
                        return messageInState?.length - 1 === index ? (
                            <div className={cx('chat')} key={index} ref={divRef}>
                                <Avatar alt="Remy Sharp" src={data.User[0]?.avatar?.data} />
                                <div className={cx('content')}>
                                    <div className={cx('user')}>
                                        <p className={cx('user-name')}>{data.User[0].username}</p>
                                        <p className={cx('time')}>{calculateTimePassed(data.User[0].createdAt)}</p>
                                    </div>
                                    <div className={cx('message')}>{data.message}</div>
                                </div>
                            </div>
                        ) : index === 0 ? (
                            <InView as="div" key={index} onChange={scrollTopHandle}>
                                <div className={cx('chat')}>
                                    <Avatar alt="Remy Sharp" src={data.User[0]?.avatar?.data} />
                                    <div className={cx('content')}>
                                        <div className={cx('user')}>
                                            <p className={cx('user-name')}>{data.User[0].username}</p>
                                            <p className={cx('time')}>{calculateTimePassed(data.User[0].createdAt)}</p>
                                        </div>
                                        <div className={cx('message')}>{data.message}</div>
                                    </div>
                                </div>
                            </InView>
                        ) : (
                            <div className={cx('chat')} key={index}>
                                <Avatar alt="Remy Sharp" src={data.User[0]?.avatar?.data} />
                                <div className={cx('content')}>
                                    <div className={cx('user')}>
                                        <p className={cx('user-name')}>{data.User[0].username}</p>
                                        <p className={cx('time')}>{calculateTimePassed(data.User[0].createdAt)}</p>
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
