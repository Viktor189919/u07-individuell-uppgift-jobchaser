import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import jobListReducer from "@/redux/jobListSlice";
import { jobtechApi } from "@/redux/jobtechApi";


const store = configureStore({
    reducer: {
        jobList: jobListReducer,
        [jobtechApi.reducerPath]: jobtechApi.reducer,
},
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare().concat(jobtechApi.middleware),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;