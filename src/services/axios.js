import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:8000',
    timeout : 10000 // Khoảng thời gian mà request được phép chờ server phản hồi (10000 --> 10s), nếu quá 10s sẽ tự hủy và throw lỗi
})

export default api