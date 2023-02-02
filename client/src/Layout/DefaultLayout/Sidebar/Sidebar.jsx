import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('box')}>
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/006/892/625/small/discord-logo-icon-editorial-free-vector.jpg"
                    alt="none"
                />
            </div>
            <div className={cx('slash')}></div>
            <div className={cx('box')}>
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/006/892/625/small/discord-logo-icon-editorial-free-vector.jpg"
                    alt="none"
                />
            </div>
            <div className={cx('box')}>
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/006/892/625/small/discord-logo-icon-editorial-free-vector.jpg"
                    alt="none"
                />
            </div>
            <div className={cx('box')}>
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/006/892/625/small/discord-logo-icon-editorial-free-vector.jpg"
                    alt="none"
                />
            </div>
            <div className={cx('box')}>
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/006/892/625/small/discord-logo-icon-editorial-free-vector.jpg"
                    alt="none"
                />
            </div>
            <div className={cx('box')}>
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/006/892/625/small/discord-logo-icon-editorial-free-vector.jpg"
                    alt="none"
                />
            </div>
            <div className={cx('box')}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRal66RNJGRaNvsBcwWGY8S9rZO5UPXXpAEwg&usqp=CAU"
                    alt="none"
                />
            </div>
            <div className={cx('box')}>
                <img
                    src="data:image/png;base64,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"
                    alt="none"
                />
            </div>
        </div>
    );
}

export default Sidebar;
