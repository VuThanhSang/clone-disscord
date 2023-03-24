import classNames from 'classnames/bind';
import styles from './SettingLayout.module.scss';

import Sidebar from './Sidebar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ChannelSettingSidebar from './ChannelSettingSidebar';
const cx = classNames.bind(styles);

function SettingLayout({ children, callBack, channelSetting }) {
    console.log(channelSetting);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {channelSetting ? <ChannelSettingSidebar /> : <Sidebar />}
                <div className={cx('btn-close')}>
                    <HighlightOffIcon onClick={callBack} className={cx('icon')}></HighlightOffIcon>
                </div>

                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default SettingLayout;
