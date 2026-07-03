import { createSlice } from "@reduxjs/toolkit";


const accessToken = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user || null,
    accessToken: accessToken || null,
    isAuthenticated: !!accessToken,
};
const authSlice = createSlice({
    name : 'auth', // tên slice
    // Đây là dữ liệu mặc định nằm ở đây
    initialState,
    // Các hàm cập nhật dữ liệu tại đây (cập nhật dữ liệu state)
    reducers : {
        // mutation giống như thao tác trực tiếp như immertation || IMMEr
        login(state,action) {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.isAuthenticated = true
        },
        logout(state){
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false
        }
    }
})
// Đây là phần action trong authSlice, import để component khác sài
export const {login,logout} = authSlice.actions
// Đây là reduce export ra để bỏ vô store
export default authSlice.reducer