import { configureStore } from "@reduxjs/toolkit";
import authReduce from '../features/auth/authSlice'
// Đây là nơi quản lý toàn bộ dữ liệu
// Bên trong nó sẽ chứa có slice, store là kho tổng sẽ quản lý các slice bên trong 
// 1 slide gồm 3 phần (state, reducer, action)
// State là dữ liệu ban đầu 
// reducer là nơi thay đổi dữ liệu
// action là tín hiệu hành động
// "Nếu dữ liệu chỉ phục vụ một component → useState. Nếu dữ liệu cần chia sẻ cho nhiều component hoặc tồn tại xuyên suốt ứng dụng → Redux."
export const store = configureStore({
    reducer : {
        auth: authReduce
    }
})