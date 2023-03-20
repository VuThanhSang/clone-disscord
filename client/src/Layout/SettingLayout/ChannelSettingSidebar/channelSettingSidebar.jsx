import classNames from 'classnames/bind';
import styles from './channelSettingSidebar.module.scss';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser, logout } from '~/features/auth/authSlice';

const cx = classNames.bind(styles);
function ChannelSettingSidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const actionResult = await dispatch(logout());

            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div style={{ width: 160 }}></div>
            <div className={cx('container')}>
                <div className={cx('setting')}>
                    <div className={cx('title')}>
                        {' '}
                        <strong> User Setting</strong>
                    </div>
                    <div variant="outlined" className={cx('btn')}>
                        <p href="/">My Account</p>
                    </div>
                    <div variant="outlined" className={cx('btn')}>
                        <p href="/">Profile</p>
                    </div>
                    <div variant="outlined" className={cx('btn')}>
                        <p href="/">Friend Request</p>
                    </div>
                    <div className={cx('slash')}></div>
                </div>
                <div className={cx('setting')}>
                    <div variant="outlined" className={cx('btn')}>
                        <p onClick={handleLogout}>Log out </p>
                        <LogoutIcon sx={{ margin: 'auto', fontSize: 16 }} />
                    </div>
                    <div className={cx('slash')}></div>
                </div>
            </div>
        </div>
    );
}

export default ChannelSettingSidebar;
