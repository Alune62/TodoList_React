import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './app.css'
import './style.css'
import Login from './login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pratique2 from './patique2.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
           <Routes>
            <Route path="/" element={<App/> }/>
            <Route path="/login" element={<Login/> }/>
            <Route path="/pratique2" element={<Pratique2 />} />
           </Routes>
  </BrowserRouter>
)
