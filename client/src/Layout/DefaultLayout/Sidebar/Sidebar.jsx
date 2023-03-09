import { Avatar, Tooltip } from '@mui/material';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);
function Sidebar() {
    const { server, loading } = useSelector((state) => state.servers);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('box')}>
                <Avatar
                    sx={{ width: 45, height: 45 }}
                    src="https://static.vecteezy.com/system/resources/thumbnails/006/892/625/small/discord-logo-icon-editorial-free-vector.jpg"
                    alt="none"
                />
            </div>
            <div className={cx('slash')}></div>
            {server.map((data) => {
                return (
                    <div className={cx('box')}>
                        <Tooltip title={data.name} placement="right">
                            <Avatar
                                sx={{ width: 45, height: 45 }}
                                src="https://static.vecteezy.com/system/resources/thumbnails/006/892/625/small/discord-logo-icon-editorial-free-vector.jpg"
                                alt="none"
                            />
                        </Tooltip>
                    </div>
                );
            })}
        </div>
    );
}

export default Sidebar;
