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
export const getUserInChat = createAsyncThunk('channel/getUserInChat', async (params, thunkAPI) => {
    const res = await serverApi.getUserInChat(params);
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
        inChat: [],
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
        changeServer: (state, action) => {
            console.log(action.payload);
            state.currentServer = action.payload;
            state.currentChannel = action.payload.channel[0][0];
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
            state.server = action.payload?.result.server;
            if (action.payload?.result.currentChannel[0] !== null) {
                state.currentServer = state.server[0];
                state.currentChannel = state.currentServer.channel[0][0];
            } else {
                const currentServer = state.server?.find(
                    (data) => data._id === action.payload?.result.currentChannel[0].serverId,
                );
                state.currentServer = currentServer;
                state.currentChannel = action.payload?.result.currentChannel[0];
            }
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

        builder.addCase(getUserInChat.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserInChat.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(getUserInChat.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.inChat = action.payload?.result[0]?.User;
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
export const { clearServer, changeChannel, changeServer } = serverSlice.actions;
export default serverSlice.reducer;
