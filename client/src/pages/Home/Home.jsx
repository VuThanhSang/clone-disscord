import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from './Header';
import ChatArena from './ChatArena/ChatArena';
import MemberList from './MemberList';
const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <ChatArena />
        </div>
    );
}
export default Home;
