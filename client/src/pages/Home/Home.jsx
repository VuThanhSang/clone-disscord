import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from './Header';
import ChatArena from './ChatArena/ChatArena';
import MemberList from './MemberList';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '~/api/authApi/authApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '~/features/auth/authSlice';
const cx = classNames.bind(styles);

function Home() {
    const { currentUser, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (currentUser === null || !currentUser) {
            navigate('/login');
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Header />
            <ChatArena />
        </div>
    );
}
export default Home;
