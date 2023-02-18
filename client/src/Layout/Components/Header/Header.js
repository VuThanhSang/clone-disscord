import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2]);
        }, 3000);
    }, []);
    return <></>;
}

export default Header;
