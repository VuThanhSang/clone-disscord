import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '~/features/auth/authSlice';
import serverReducer from '~/features/server/serverSlice';
import messageReducer from '~/features/message/messageSlice';
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['server', 'message'],
};

export default configureStore({
    reducer: { auth: authReducer, servers: serverReducer, message: messageReducer },
});
// auth: authReducer
const rootReducer = combineReducers({ auth: authReducer, servers: serverReducer, message: messageReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
