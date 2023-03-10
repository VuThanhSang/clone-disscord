import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as messageApi from '~/api/messageApi/messageApi';

export const getChannelMessage = createAsyncThunk('message/ChannelMessage', async (params, thunkAPI) => {
    const res = await messageApi.getChannelMessage(params);
    return res;
});
export const sendMessage = createAsyncThunk('message/SendMessage', async (params, thunkAPI) => {
    console.log(params);
    const res = await messageApi.sendMessage(params);
    return 'res';
});
export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        loading: false,
        error: '',
        data: [],
    },
    reducers: {
        clearMessage: (state, action) => {
            state.data = [];
            state.loading = false;
            state.error = '';
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
            console.log(action.payload);
            state.loading = false;
            state.error = '';
            state.data = action.payload?.result;
        });
        builder.addCase(sendMessage.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.error = '';
        });
    },
});
export const { clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
