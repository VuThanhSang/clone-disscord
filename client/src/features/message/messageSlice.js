import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as messageApi from '~/api/messageApi/messageApi';

export const getChannelMessage = createAsyncThunk('message/ChannelMessage', async (params, thunkAPI) => {
    const res = await messageApi.getChannelMessage(params);
    return res;
});
export const scrollMessage = createAsyncThunk('message/ScrollMessage', async (params, thunkAPI) => {
    const res = await messageApi.getChannelMessage(params);
    return res;
});
export const sendMessage = createAsyncThunk('message/SendMessage', async (params, thunkAPI) => {
    console.log(params);
    const res = await messageApi.sendMessage(params);
    return res;
});
export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        loading: false,
        error: '',
        data: [],
        paging: 1,
    },
    reducers: {
        clearMessage: (state, action) => {
            state.data = [];
            state.loading = false;
            state.error = '';
        },
        getNewMessage: (state, action) => {
            state.data.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getChannelMessage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getChannelMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getChannelMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = action.payload?.result.data.reverse();
            state.paging = action.payload?.result.paging;
        });
        builder.addCase(scrollMessage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(scrollMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(scrollMessage.fulfilled, (state, action) => {
            if (
                !(JSON.stringify(state.data) === JSON.stringify(action.payload?.result.data.reverse())) &&
                action.payload?.result.data.length !== 0
            ) {
                console.log(action.payload?.result.data);
                state.data = action.payload?.result.data.concat(state.data);
            }
            state.loading = false;
            state.error = '';
        });
        builder.addCase(sendMessage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
        });
    },
});
export const { clearMessage, getNewMessage } = messageSlice.actions;
export default messageSlice.reducer;
