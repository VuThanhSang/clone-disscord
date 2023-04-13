import classNames from 'classnames/bind';
import styles from './Header.module.scss';
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
    padding: '1px',
    marginLeft: 0,
    margin: 'auto',
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    height: 24,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    fontSize: 12,
    '& .MuiInputBase-input': {
        '&:placeholder': {},
        marginLeft: '10px',
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '15ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));

function Header() {
    return (
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
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                        <SearchIconWrapper>
                            <SearchIcon sx={{ fontSize: 18 }} />
                        </SearchIconWrapper>
                    </Search>
                </div>

                <InboxIcon className={cx('icon')} />
                <HelpIcon className={cx('icon')} />
            </div>
        </div>
    );
}
export default Header;
