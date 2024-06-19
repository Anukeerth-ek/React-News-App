import { configureStore } from '@reduxjs/toolkit';
import categoryNewsReducer from './CategoryNewsSlice';

const store = configureStore({
    reducer: {
        categoryNews: categoryNewsReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
