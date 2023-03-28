import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as serverApi from '~/api/serverApi/serverApi';

export const getListServer = createAsyncThunk('user/listServer', async (params, thunkAPI) => {
    const res = await serverApi.getListServer();
    return res;
});
export const createServer = createAsyncThunk('server/Create', async (params, thunkAPI) => {
    const res = await serverApi.createServer({ name: params });
    return res;
});
export const deleteServer = createAsyncThunk('server/delete', async (params, thunkAPI) => {
    const res = await serverApi.deleteServer(params);
    return res;
});
export const createChannel = createAsyncThunk('channel/Create', async (params, thunkAPI) => {
    // console.log(params);
    const res = await serverApi.createChannel(params);
    return res;
});
export const joinChannel = createAsyncThunk('user/joinChannel', async (params, thunkAPI) => {
    const res = await serverApi.joinChannel(params);
    return res;
});
export const leaveChannel = createAsyncThunk('user/leaveChannel', async (params, thunkAPI) => {
    const res = await serverApi.joinChannel(params);
    return res;
});
export const serverSlice = createSlice({
    name: 'servers',
    initialState: {
        loading: false,
        error: '',
        server: [],
        currentServer: null,
        currentChannel: null,
    },
    reducers: {
        clearServer: (state, action) => {
            state.server = [];
            state.loading = false;
            state.error = '';
            state.currentChannel = null;
            state.currentServer = null;
        },
        changeChannel: (state, action) => {
            state.currentChannel = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getListServer.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getListServer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getListServer.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.server = action.payload?.result;
            state.currentServer = action.payload?.result[0];
            state.currentChannel = state.currentServer?.channel[0][0];
        });

        builder.addCase(createServer.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createServer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(createServer.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            // state.server = action.payload?.result;
            console.log(action.payload);
        });

        builder.addCase(deleteServer.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteServer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(deleteServer.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            // state.server = action.payload?.result;
            console.log(action.payload);
        });

        builder.addCase(joinChannel.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(joinChannel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(joinChannel.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            // state.currentChannel = state.payload?.result;
        });

        builder.addCase(leaveChannel.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(leaveChannel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(leaveChannel.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.currentChannel = state.currentServer?.channel[0][0];
        });

        builder.addCase(createChannel.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createChannel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(createChannel.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
        });
    },
});
export const { clearServer, changeChannel } = serverSlice.actions;
export default serverSlice.reducer;
