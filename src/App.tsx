import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import AIPage from './pages/AIPage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import SignUpPage from './pages/SignUpPage';
import SelectedDataStore from './store/SelectedItemsContext';
import { UserProviderStore } from './store/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserProviderStore>
        <Nav />
        <SelectedDataStore>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signUp" element={<SignUpPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="ai" element={<AIPage />} />
            <Route path="detail/:contentId" element={<DetailPage />} />
          </Routes>
        </SelectedDataStore>
      </UserProviderStore>
    </BrowserRouter>
  );
}

export default App;
