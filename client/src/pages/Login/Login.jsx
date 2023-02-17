import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';
// import { login, loginGoogleUser } from '~/redux/apiRequest';
import { useNavigate } from 'react-router-dom';
//component
// import images from '~/asset/images';
import { useState } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
const cx = classNames.bind(styles);
function Login() {
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
                        <input type="input" />
                    </div>

                    <div className={cx('text-box')}>
                        <label htmlFor="">
                            <strong>Password</strong>
                        </label>
                        <input type="Password" />
                        <a href="/">Forgot your Password?</a>
                    </div>
                    <div className={cx('btn')}>
                        <Button sx={{ width: 500 }} variant="contained">
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
