import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signUp" element={<SignUpPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="detail" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
