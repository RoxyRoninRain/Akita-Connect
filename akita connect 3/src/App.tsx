import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import Layout from './components/Layout';
/* ... Page Imports ... */
import Home from './pages/Home';
import Profile from './pages/Profile';
import AkitaDetail from './pages/AkitaDetail';
import Forums from './pages/Forums';
import Messages from './pages/Messages';
import Directory from './pages/Directory';
import AddAkita from './pages/AddAkita';
import ThreadDetail from './pages/ThreadDetail';
import PuppyMarket from './pages/PuppyMarket';
import AddLitter from './pages/AddLitter';
import LitterDetail from './pages/LitterDetail';
import Notifications from './pages/Notifications';
import Events from './pages/Events';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppRoutes: React.FC = () => {
  return (
      <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            {/* ... other routes ... */}
          </Routes>
      </Layout>
  );
}

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
         <ScrollToTop />
         <AppRoutes />
      </Router>
    </StoreProvider>
  );
};
export default App;