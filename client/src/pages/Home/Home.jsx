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
const cx = classNames.bind(styles);

function Home() {
    let { currentUser, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getServer = async () => {
        const data = await dispatch(getUserInfo());
        // console.log(data);
        const actionResult = await dispatch(getListServer());
        return actionResult;
    };
    useEffect(() => {
        getServer();
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
