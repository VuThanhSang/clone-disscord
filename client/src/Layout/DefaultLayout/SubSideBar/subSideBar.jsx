import classNames from 'classnames/bind';
import styles from './subSideBar.module.scss';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Avatar from '@mui/material/Avatar';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useState } from 'react';
const cx = classNames.bind(styles);
function SubSideBar() {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('server-name')}>
                <span>
                    <p>SxS</p> <ArrowDownwardIcon className={cx('icon')}></ArrowDownwardIcon>
                </span>
            </div>

            <div className={cx('channels')}>
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'rgb(47,49,54)',
                        color: 'rgb(150,152,157)',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton onClick={handleClick}>
                        {open ? (
                            <ExpandLess sx={{ color: 'rgb(150,152,157)', fontSize: 14 }} />
                        ) : (
                            <ExpandMore sx={{ color: 'rgb(150,152,157)', fontSize: 14 }} />
                        )}
                        {/* <p style={{ marginLeft: 0.5, fontSize: 15 }}>KÊNH CHAT</p> */}
                        <ListItemText
                            sx={{
                                marginLeft: 0.5,

                                '&:hover': { color: '#fff' },
                            }}
                            primaryTypographyProps={{
                                fontSize: 12,
                                fontWeight: 'medium',
                                letterSpacing: 0,
                            }}
                            primary="KÊNH CHAT"
                        />
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </div>
            <div className={cx('control')}>
                <div className={cx('info')}>
                    <Avatar
                        className={cx('avatar')}
                        alt="Remy Sharp"
                        src="data:image/jpeg;base64,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"
                    />
                    <div className={cx('name')}>
                        <p>Tùng Mountain</p>
                        <p>#6969</p>
                    </div>
                </div>
                <MicIcon className={cx('icon')}></MicIcon>
                <HeadphonesIcon className={cx('icon')}></HeadphonesIcon>
                <SettingsIcon className={cx('icon')}></SettingsIcon>
            </div>
        </div>
    );
}

export default SubSideBar;
