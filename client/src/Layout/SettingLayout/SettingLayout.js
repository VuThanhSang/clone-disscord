import classNames from 'classnames/bind';
import styles from './SettingLayout.module.scss';

import Sidebar from './Sidebar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const cx = classNames.bind(styles);

function SettingLayout({ children, callBack }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('btn-close')}>
                    <HighlightOffIcon onClick={callBack} className={cx('icon')}></HighlightOffIcon>
                    <p>close</p>
                </div>

                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default SettingLayout;
