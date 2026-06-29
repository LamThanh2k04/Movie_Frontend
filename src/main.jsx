import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 
    Provider là một component của react-redux
    Nhiệm vụ: đưa store của redux xuống toàn bộ ứng dụng react thì những component khác sẽ có thể truy cập store bằng useSelector và useDispatch để lấy dữ liệu
    */}
  <Provider store={store}>
      <App />
  </Provider>
  </StrictMode>,
)