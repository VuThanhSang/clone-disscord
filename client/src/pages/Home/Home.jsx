import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from '~/Layout/Components/Home/Header';
import ChatArena from './ChatArena/ChatArena';
import MemberList from '../../Layout/Components/Home/MemberList';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '~/features/auth/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getListServer } from '~/features/server/serverSlice';
import { refreshAccessToken } from '~/utils/interceptor';
import VoiceChat from './voiceChat';
const cx = classNames.bind(styles);

function Home() {
    let { currentUser, loading } = useSelector((state) => state.auth);
    let { currentChannel } = useSelector((state) => state.servers);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getListServer());
    }, []);
    return (
        <div>
            {currentChannel?.type === 'chat' ? (
                <div className={cx('wrapper')}>
                    <Header />
                    <ChatArena />
                </div>
            ) : (
                <div className={cx('wrapper')}>
                    <VoiceChat />
                </div>
            )}
        </div>
    );
}
export default Home;
