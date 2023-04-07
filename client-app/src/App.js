import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminUserPage from './pages/admin/AdminUserPage';
import AdminAssetPage from './pages/admin/AdminAssetPage';
import AdminAssignmentPage from './pages/admin/AdminAssignmentPage';
import StaffHomePage from './pages/staff/StaffHomePage';
import StaffUserPage from './pages/staff/StaffUserPage';
import StaffAssetPage from './pages/staff/StaffAssetPage';
import StaffAssignmentPage from './pages/staff/StaffAssignmentPage';
import NavBar from './components/Nav/navbar';
import SideBar from './components/Side/sidebar';
import FirstLogin from './components/FirstLogin';

function App() {
  return (
    <>
      {
        localStorage.getItem("token")
          ? (
            (localStorage.getItem("isFirstLogin") === "false") ? (((localStorage.getItem("role") === "Admin")) ? (
              <div className='container'>
                <NavBar />
                <div className='main'>
                  <SideBar />
                  <div className='contents'>
                    <Routes>
                      <Route index path='/home' element={<AdminHomePage />} />
                      <Route path='/user' element={<AdminUserPage />} />
                      <Route path='/asset' element={<AdminAssetPage />} />
                      <Route path='/assignment' element={<AdminAssignmentPage />} />
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <div className='container'>
                <NavBar />
                <div className='main'>
                  <SideBar />
                  <div className='contents'>
                    <Routes>
                      <Route index path='/home' element={<StaffHomePage />} />
                      <Route path='/user' element={<StaffUserPage />} />
                      <Route path='/asset' element={<StaffAssetPage />} />
                      <Route path='/assignment' element={<StaffAssignmentPage />} />
                    </Routes>
                  </div>
                </div>
              </div>
            )) : (
              <FirstLogin />
            )
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
