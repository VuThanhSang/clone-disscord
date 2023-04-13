import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MessageBox.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { scrollMessage } from '~/features/message/messageSlice';
import { Avatar } from '@mui/material';
import { calculateTimePassed } from '~/utils/utils';
import { InView } from 'react-intersection-observer';
const cx = classNames.bind(styles);
function MessageBox(props) {
    const { divRef, PagingOfChat, setPagingOfChat } = props;
    const messageInState = useSelector((state) => state.message.data);
    const paging = useSelector((state) => state.message.paging);
    const { currentChannel } = useSelector((state) => state.servers);
    const dispatch = useDispatch();
    const scrollTopHandle = async (inView, entry) => {
        if (inView === true) {
            if (PagingOfChat <= paging) {
                setPagingOfChat(PagingOfChat + 1);
                dispatch(scrollMessage({ currentChannel: currentChannel?._id, paging: PagingOfChat }));
                divRef.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
            }
        }
    };
    return (
        <div className={cx('message-box')}>
            {messageInState?.map((data, index, array) => {
                return messageInState?.length - 1 === index ? (
                    <div className={cx('chat')} key={index} ref={divRef}>
                        <Avatar alt="Remy Sharp" src={data.User[0]?.avatar?.data} />
                        <div className={cx('content')}>
                            <div className={cx('user')}>
                                <p className={cx('user-name')}>{data.User[0].username}</p>
                                <p className={cx('time')}>{calculateTimePassed(data.createdAt)}</p>
                            </div>
                            <div className={cx('message')}>{data.message}</div>
                            {data.source.length > 0 && (
                                <div style={{ display: 'flex', width: '400px' }}>
                                    {data.source.map((img) => {
                                        return (
                                            <img src={img.data} style={{ height: '80%', width: '80%' }} alt="img"></img>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                ) : index === 0 ? (
                    <InView as="div" key={index} onChange={scrollTopHandle}>
                        <div className={cx('chat')}>
                            <Avatar alt="Remy Sharp" src={data.User[0]?.avatar?.data} />
                            <div className={cx('content')}>
                                <div className={cx('user')}>
                                    <p className={cx('user-name')}>{data.User[0].username}</p>
                                    <p className={cx('time')}>{calculateTimePassed(data.createdAt)}</p>
                                </div>
                                <div className={cx('message')}>{data.message}</div>
                                {data.source.length > 0 && (
                                    <div style={{ display: 'flex', width: '400px' }}>
                                        {data.source.map((img) => {
                                            return (
                                                <img
                                                    src={img.data}
                                                    style={{ height: '80%', width: '80%' }}
                                                    alt="img"
                                                ></img>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </InView>
                ) : (
                    <div className={cx('chat')} key={index}>
                        <Avatar alt="Remy Sharp" src={data.User[0]?.avatar?.data} />
                        <div className={cx('content')}>
                            <div className={cx('user')}>
                                <p className={cx('user-name')}>{data.User[0].username}</p>
                                <p className={cx('time')}>{calculateTimePassed(data.createdAt)}</p>
                            </div>
                            <div className={cx('message')}>{data.message}</div>
                            {data.source.length > 0 && (
                                <div style={{ display: 'flex', width: '400px' }}>
                                    {data.source.map((img) => {
                                        return (
                                            <img src={img.data} style={{ height: '80%', width: '80%' }} alt="img"></img>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MessageBox;
