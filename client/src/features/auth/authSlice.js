import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import * as authApi from '~/api/authApi/authApi';
import * as userApi from '~/api/userApi/userApi';
import { clearServer } from '~/features/server/serverSlice';
import { clearMessage } from '~/features/message/messageSlice';

export const signUpPassWord = createAsyncThunk('auth/signUpPassWord', async (params, thunkAPI) => {
    const data = params.data;
    const res = await authApi.registerPassword(data);
    return res;
});
export const signInPassWord = createAsyncThunk('auth/signInPassWord', async (params, thunkAPI) => {
    const data = params.data;
    const res = await authApi.loginPass({ data });
    return res;
});
export const getUserInfo = createAsyncThunk('auth/getUserInfo', async (params, thunkAPI) => {
    const res = await authApi.getUserInfo();
    return res;
});
export const updateUser = createAsyncThunk('user/update', async (params, thunkAPI) => {
    console.log(params);
    const res = await userApi.updateUser(params);
    return res;
});
export const logout = createAsyncThunk('auth/logout', async (params, thunkAPI) => {});
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        loading: false,
        error: '',
        typeLogin: '',
    },
    reducers: {
        refetchToken: (state, action) => {
            state.currentUser = action.payload;
        },
        clearUser: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = '';
            state.typeLogin = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signInPassWord.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInPassWord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(signInPassWord.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.result;
            state.typeLogin = 'password';
        });
        builder.addCase(signUpPassWord.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signUpPassWord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(signUpPassWord.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.result;
            state.typeLogin = 'password';
        });
        builder.addCase(getUserInfo.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload?.result;
            state.typeLogin = 'google';
        });
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = null;
            state.typeLogin = '';
        });

        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = { data: action.payload.result };
            state.typeLogin = '';
        });
    },
});
export const { refetchToken, clearUser } = authSlice.actions;

export default authSlice.reducer;
