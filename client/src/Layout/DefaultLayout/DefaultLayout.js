import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '~/Layout/Components/Header';
import Sidebar from './Sidebar';
import SubSideBar from './SubSideBar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Sidebar />
                <SubSideBar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
