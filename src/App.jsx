import { Routes, Route } from 'react-router-dom';
import Catalog from './components/Catalog';
import { AuthProvider } from './useContext';
import BookSummary from './components/BookSummary';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import Navigations from './components/Navigations';

function App() {
  
  return (
    <>
      <AuthProvider>
        <Navigations />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/books/:bookid" element={<BookSummary/>} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>   
      </AuthProvider>
    </>

  )
} 
export default App

    
