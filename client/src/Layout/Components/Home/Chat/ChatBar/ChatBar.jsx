import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessage, getNewMessage, sendMessage } from '~/features/message/messageSlice';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import GifBoxIcon from '@mui/icons-material/GifBox';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import classNames from 'classnames/bind';
import styles from './ChatBar.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha, Button, Divider, InputBase, styled } from '@mui/material';

const cx = classNames.bind(styles);

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
function ChatBar(props) {
    const { divRef, PagingOfChat, socket } = props;
    const { currentChannel } = useSelector((state) => state.servers);
    const { currentUser } = useSelector((state) => state.auth);
    const messageData = useSelector((state) => state.message.data);

    const [Images, setImages] = useState([]);
    const [Message, setMessage] = useState('');
    const onDrop = useCallback((acceptedFiles) => {
        const array = Images;
        array.push(acceptedFiles);
        setImages(array);
    }, []);
    const dispatch = useDispatch();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const s = getRootProps();
    s.onClick = null;
    s.onBlur = null;
    const sendMessageHandle = async (event) => {
        if (event.keyCode === 13 && event.target.value !== '') {
            const formData = new FormData();
            formData.append('targetId', currentChannel._id);
            formData.append('targetType', 'channel');
            formData.append('message', event.target.value);
            Images.forEach((element) => {
                formData.append('files', element[0], element[0].name);
            });
            const actionResult = await dispatch(sendMessage(formData));
            setMessage('');
            setImages([]);
            console.log(actionResult);
            socket.emit('newMessage', {
                newMessage: { ...actionResult.payload.result },
                user: currentUser.data,
                channel: currentChannel,
            });
        }
    };
    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messageData]);
    useEffect(() => {
        socket.on('message Received', (data) => {
            dispatch(getNewMessage({ ...data.newMessage, User: [data.user] }));
        });
    }, [socket]);
    return (
        <div
            style={{
                backgroundColor: 'rgb(49, 51, 56)',
            }}
        >
            {Images.length !== 0 && (
                <div
                    style={{
                        height: '230px',
                        position: 'absolute',
                        top: '55%',
                        width: '700px',
                        backgroundColor: '#383A40',
                        marginLeft: '25px',
                        display: 'flex',
                    }}
                >
                    {Images.map((data) => {
                        return (
                            <div
                                style={{
                                    backgroundColor: '#2b2d31',
                                    margin: 20,
                                    width: '200px',
                                    marginRight: 10,
                                    borderRadius: 10,
                                    position: 'relative',
                                }}
                            >
                                <Button
                                    sx={{ position: 'absolute', left: '150px' }}
                                    onClick={() => {
                                        const array = Images;
                                        const temp = array.filter((img) => img[0] !== data[0]);
                                        setImages(temp);
                                    }}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </Button>
                                <img
                                    style={{ height: '150px', width: '200px' }}
                                    src={URL.createObjectURL(data[0])}
                                    alt=" "
                                ></img>
                                <p style={{ color: 'white', fontSize: 12 }}>{data[0].name}</p>
                            </div>
                        );
                    })}
                </div>
            )}
            <div className={cx('chat-container')}>
                <Search className={cx('chat-bar')}>
                    <div className={cx('text-box')}>
                        <SearchIconWrapper>
                            <AddCircleIcon />
                        </SearchIconWrapper>

                        <div {...s}>
                            <StyledInputBase
                                placeholder="Message #Chung"
                                onKeyDown={sendMessageHandle}
                                value={Message}
                                onChange={(e) => setMessage(e.target.value)}
                                inputProps={{ 'aria-label': 'search' }}
                            ></StyledInputBase>
                        </div>
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
    );
}

export default ChatBar;
