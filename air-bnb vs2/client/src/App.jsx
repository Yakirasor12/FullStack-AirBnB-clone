import './App.css'
import { Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Layout from './Components/Layout';
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import  axios  from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import FormPage from './pages/FormPage';
import PlacePage from './pages/PlacePage';
import BookingPage from './pages/BookingPage';
import BookingsPage from "./pages/BookingsPage";
import AdminPage from './pages/AdminPage';
import { useState } from 'react';



axios.defaults.baseURL = "http://127.0.0.1:4000/api";
axios.defaults.withCredentials = true;

function App() {
const [searchQuery, setSearchQuery] = useState("");
  return (
    <UserContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          }
        >
          <Route
            index
            element={
              <Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<FormPage />} />
          <Route path="/account/places/:id" element={<FormPage />} />
          <Route path="/places/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App
