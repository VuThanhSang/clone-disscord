import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import LogoutIcon from '@mui/icons-material/Logout';
const cx = classNames.bind(styles);
function Sidebar() {
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
                        <p href="/">Log out </p>
                        <LogoutIcon sx={{ margin: 'auto', fontSize: 16 }} />
                    </div>
                    <div className={cx('slash')}></div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
