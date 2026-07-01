import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user : null,
    accessToken: null,
    isAuthenticated : false
}
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
            state.isAuthenticated = null
        }
    }
})
// Đây là phần action trong authSlice, import để component khác sài
export const {login,logout} = authSlice.actions
// Đây là reduce export ra để bỏ vô store
export default authSlice.reducer