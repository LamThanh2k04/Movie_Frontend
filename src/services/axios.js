import axios from "axios";
import { Store } from "lucide-react";
import { store } from "../app/store";
import { logout } from "../features/auth/authSlice";

const api = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000 // Khoảng thời gian mà request được phép chờ server phản hồi (10000 --> 10s), nếu quá 10s sẽ tự hủy và throw lỗi
})
// Ban đầu khi gọi api thì axios chưa gửi ngay mà tạo object tên config sau đó interceptors nhận config này và thêm token vào header rồi mới gửi request đi. Nếu không có token thì config vẫn được gửi đi nhưng không có header Authorization
// Interceptor nghĩa là hàm trung gian giúp chạy trc khi request được gửi đi, ở đây mình dùng Interceptor để thêm token vào header của request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {

            // Xóa dữ liệu đăng nhập
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Cập nhật Redux
            store.dispatch(logout());

       
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);


export default api