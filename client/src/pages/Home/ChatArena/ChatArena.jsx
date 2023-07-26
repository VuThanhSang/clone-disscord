import classNames from 'classnames/bind';

import styles from './ChatArena.module.scss';
import MemberList from '../../../Layout/Components/Home/MemberList';
import { useCallback, useEffect, useRef, useState } from 'react';
import ChatBar from '~/Layout/Components/Home/Chat/ChatBar';
import MessageBox from '~/Layout/Components/Home/Chat/MessageBox/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { joinChannel } from '~/features/server/serverSlice';
import { getChannelMessage } from '~/features/message/messageSlice';
import { useSocket } from '~/utils/socketProvider';
var socket;
const cx = classNames.bind(styles);

function ChatArena() {
    const [PagingOfChat, setPagingOfChat] = useState(1);
    const divRef = useRef(null);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
    const { currentChannel } = useSelector((state) => state.servers);
    socket = useSocket();

    // useEffect(() => {
    //     socket.emit('setup', currentUser.data);
    //     socket.on('connection', () => {
    //         setSocketConnected(true);
    //     });
    // }, []);
    //update while change channel
    useEffect(() => {
        socket.emit('room:join', { user: currentUser.data, channel: currentChannel });
    }, [currentChannel]);
    useEffect(() => {
        if (PagingOfChat === 1) {
            divRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        socket.on('user:joined', (data) => {
            console.log('user Joined', data);
        });
    }, [socket]);
    useEffect(() => {
        dispatch(getChannelMessage({ currentChannel: currentChannel?._id, paging: 1 }));
    }, []);
    return (
        <div className={cx('chat-arena')}>
            <div className={cx('message-container')}>
                <MessageBox setPagingOfChat={setPagingOfChat} PagingOfChat={PagingOfChat} divRef={divRef}></MessageBox>
                <ChatBar PagingOfChat={PagingOfChat} divRef={divRef} socket={socket}></ChatBar>
            </div>
            <MemberList />
        </div>
    );
}
export default ChatArena;
