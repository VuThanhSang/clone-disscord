import { Divider, Drawer, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import io from 'socket.io-client';
import ChatBar from './ChatBar';
import { joinChannel } from '~/features/server/serverSlice';
import { getChannelMessage } from '~/features/message/messageSlice';
import MessageBox from '../../Chat/MessageBox/MessageBox';
import { useSocket } from '~/utils/socketProvider';
const ENDPOINT = 'http://localhost:3240';
var socket, seletedChatCompare;
function Chat(props) {
    const { OpenChat, setOpenChat } = props;
    const { currentChannel } = useSelector((state) => state.servers);
    const [PagingOfChat, setPagingOfChat] = useState(1);
    const divRef = useRef(null);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
    const [SocketConnected, setSocketConnected] = useState(false);
    socket = useSocket();

    //update while change channel
    // useEffect(() => {
    //     dispatch(joinChannel(currentChannel?._id));
    //     dispatch(getChannelMessage({ currentChannel: currentChannel?._id, paging: 1 }));
    //     socket.emit('room:join', { user: currentUser.data, channel: currentChannel });
    // }, [currentChannel]);
    useEffect(() => {
        socket.emit('room:join', { user: currentUser.data, channel: currentChannel });
    }, [currentChannel]);
    useEffect(() => {
        if (PagingOfChat === 1) {
            divRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    });
    return (
        <React.Fragment>
            <Drawer
                anchor="right"
                open={OpenChat}
                onClose={() => {
                    setOpenChat(!OpenChat);
                }}
            >
                <Stack
                    direction="column"
                    sx={{ width: '450px', height: '100%', backgroundColor: '#313338', color: 'white' }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ fontSize: 16, height: '10%' }}
                    >
                        <Stack direction="row" sx={{ padding: 2, alignItems: 'center' }}>
                            <ChatBubbleIcon sx={{ marginRight: 2 }}></ChatBubbleIcon>
                            <p>{currentChannel?.name}</p>
                        </Stack>
                        <CloseIcon sx={{ marginRight: 2 }}></CloseIcon>
                    </Stack>
                    <Divider></Divider>
                    <Stack sx={{ height: '80%' }}>
                        <MessageBox
                            setPagingOfChat={setPagingOfChat}
                            PagingOfChat={PagingOfChat}
                            divRef={divRef}
                        ></MessageBox>
                    </Stack>
                    <Stack sx={{ height: '10%' }}>
                        <ChatBar PagingOfChat={PagingOfChat} divRef={divRef} socket={socket}></ChatBar>
                    </Stack>
                </Stack>
            </Drawer>
        </React.Fragment>
    );
}

export default Chat;
