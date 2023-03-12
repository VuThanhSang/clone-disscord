import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from './Header';
import ChatArena from './ChatArena/ChatArena';
import MemberList from './MemberList';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '~/features/auth/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getListServer } from '~/features/server/serverSlice';
import { refreshAccessToken } from '~/utils/interceptor';
const cx = classNames.bind(styles);

function Home() {
    let { currentUser, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getListServer());
    }, []);
    return (
        <div>
            {currentUser && (
                <div className={cx('wrapper')}>
                    <Header />
                    <ChatArena />
                </div>
            )}
        </div>
    );
}
export default Home;
