import axios from 'axios';
import { clearUser, refetchToken } from '~/features/auth/authSlice';
import { clearMessage } from '~/features/message/messageSlice';
import { clearServer } from '~/features/server/serverSlice';
import instance from '~/utils/HttpRequest';

export const refreshAccessToken = async () => {
    try {
        const res = await instance.post('auth/refresh', {
            withCredentials: true,
        });
        return res.data?.accessToken;
    } catch (error) {
        console.log(error);
    }
};

const setUpInterceptor = (store) => {
    const handleError = async (error) => {
        return Promise.reject(error);
    };
    function select(state) {
        return state.auth.currentUser;
    }
    instance.interceptors.request.use(async (config) => {
        if (
            config?.url.includes('auth/login') ||
            config?.url.includes('auth/refresh') ||
            config?.url.includes('auth/login/success')
        ) {
            return config;
        }
        const user = select(store.getState());
        if (user?.data?.accessToken) {
            config.headers['token'] = user?.data?.accessToken ? `Bearer ${user?.data?.accessToken}` : '';
        }
        return config;
    }, handleError);

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async function (error) {
            const user = select(store.getState());
            const originalRequest = error.config;
            if (
                (error?.response?.status === 403 &&
                    !(error.request.responseURL === 'http://localhost:3240/v1/auth/refresh')) ||
                (error?.response?.status === 401 &&
                    !(error.request.responseURL === 'http://localhost:3240/v1/auth/refresh'))
            ) {
                originalRequest._retry = true;
                const access_token = await refreshAccessToken();
                if (access_token) {
                    axios.defaults.headers.common['token'] = `Bearer ${access_token}`;
                    const refreshUser = {
                        data: { ...user?.data, accessToken: access_token },
                        status: 'true',
                        message: 'successfully',
                    };
                    store.dispatch(refetchToken(refreshUser));
                } else {
                    store.dispatch(clearUser());
                    store.dispatch(clearServer());
                    store.dispatch(clearMessage());
                }
                return instance(originalRequest);
            } else if (
                // (error?.response?.status === 403 &&
                //     error.request.responseURL === 'http://localhost:3240/v1/auth/refresh') ||
                // (error?.response?.status === 401 &&
                //     error.request.responseURL === 'http://localhost:3240/v1/auth/refresh')
                (error?.response?.status === 403 &&
                    error.request.responseURL === 'http://localhost:3240/v1/auth/refresh') ||
                (error?.response?.status === 401 &&
                    error.request.responseURL === 'http://localhost:3240/v1/auth/refresh')
            ) {
                console.log('het han r ne');
                localStorage.removeItem('persist:root');
                store.dispatch(clearUser());
                store.dispatch(clearServer());
                store.dispatch(clearMessage());
                // return;
            }

            return error;
        },
    );
};

export default setUpInterceptor;
