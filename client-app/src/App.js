import { Route, Routes } from 'react-router-dom';
// import './App.css';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Nav/navbar';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminUserPage from './pages/admin/AdminUserPage';
import AdminAssetPage from './pages/admin/AdminAssetPage';
import AdminAssignmentPage from './pages/admin/AdminAssignmentPage';
import StaffHomePage from './pages/staff/StaffHomePage';
import StaffUserPage from './pages/staff/StaffUserPage';
import StaffAssetPage from './pages/staff/StaffAssetPage';
import StaffAssignmentPage from './pages/staff/StaffAssignmentPage';
import Sidebar from './components/Side/sidebar';

function App() {
  return (
    <>
      {
        localStorage.getItem("token")
          ? (
            <>
              <div className='container'>
                <Navbar />
                <div className='main'>
                  <Sidebar />
                  <div className='contents'>
                    <Routes>
                      {localStorage.getItem("role") === "Admin"} ? (
                      <Route path='/home' element={<AdminHomePage />} />
                      <Route path='/user' element={<AdminUserPage />} />
                      <Route path='/asset' element={<AdminAssetPage />} />
                      <Route path='/assignment' element={<AdminAssignmentPage />} />
                      ) : (
                      <Route path='/home' element={<StaffHomePage />} />
                      <Route path='/user' element={<StaffUserPage />} />
                      <Route path='/asset' element={<StaffAssetPage />} />
                      <Route path='/assignment' element={<StaffAssignmentPage />} />
                      )
                    </Routes>

                  </div>
                </div>
              </div>
            </>
          )
          : (
            <Routes>
              <Route path='*' element={<LoginPage />} />
            </Routes>
          )
      }
    </>
  );
}

export default App;
