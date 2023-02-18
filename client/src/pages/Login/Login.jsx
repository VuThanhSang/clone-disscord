import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { signInGithub, signInGoogle, signInPassWord } from '~/features/auth/authSlice';
import { configRouter } from '~/configs/router';
const cx = classNames.bind(styles);
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickButtonSignIn = async () => {
        const dataUser = {
            password: password,
            email: username,
            authType: 'local',
        };
        try {
            const actionResult = await dispatch(signInPassWord({ data: dataUser }));
            const currentUser = unwrapResult(actionResult);
            navigate(configRouter.home);
            console.log(currentUser);
        } catch (error) {
            console.log('failed', error.message);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrap-form-login')}>
                <div className={cx('form-login')}>
                    <div className={cx('welcome')}>
                        <h2>Welcome Back!</h2>
                        <p>We're so excited to see toy again!</p>
                    </div>
                    <div className={cx('text-box')}>
                        <label htmlFor="">
                            <strong>EMAIL OR PHONE NUMBER</strong>
                        </label>
                        <input
                            type="input"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>

                    <div className={cx('text-box')}>
                        <label htmlFor="">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <a href="/">Forgot your Password?</a>
                    </div>
                    <div className={cx('btn')}>
                        <Button sx={{ width: 500 }} variant="contained" onClick={handleClickButtonSignIn}>
                            Login
                        </Button>
                        <div className={cx('register')}>
                            <p>Need an account ?</p> <a href="/">Register</a>
                        </div>
                    </div>
                </div>
                <div className={cx('qr')}>
                    <div className={cx('social-login-label')}>
                        <div className={cx('label-or')}>
                            <div className={cx('line-left')}></div>
                            <span className={cx('label-text')}>Đăng nhập với</span>
                            <div className={cx('line-right')}></div>
                        </div>
                        <div className={cx('icon-login')}>
                            <Button className={cx('face')}>
                                <GitHubIcon />
                            </Button>
                            <Button className={cx('goog')}>
                                <GoogleIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
