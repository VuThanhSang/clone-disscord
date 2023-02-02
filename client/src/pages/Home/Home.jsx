import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import TagIcon from '@mui/icons-material/Tag';
import HelpIcon from '@mui/icons-material/Help';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PushPinIcon from '@mui/icons-material/PushPin';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
const cx = classNames.bind(styles);

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgb(32,34,37)',
    height: '20px',
    marginLeft: 0,
    margin: 'auto',
    width: '80%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',

    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '8ch',
            '&:focus': {
                width: '16ch',
            },
        },
    },
}));

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('server-name')}>
                    <TagIcon className={cx('icon')}></TagIcon>
                    <p>Chung</p>
                </div>
                <div className={cx('option')}>
                    <TagIcon className={cx('icon')} />
                    <NotificationsIcon className={cx('icon')} />
                    <PushPinIcon className={cx('icon')} />
                    <PeopleAltIcon className={cx('icon')} />
                    <div>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                        </Search>
                    </div>

                    <InboxIcon className={cx('icon')} />
                    <HelpIcon className={cx('icon')} />
                </div>
            </div>
            <div className="content"></div>
        </div>
    );
}
export default Home;
