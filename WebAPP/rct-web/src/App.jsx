import { useState } from 'react';

// Auth pages
import LandingPage        from './pages/splash';
import SignUpPage         from './pages/signuppage';
import LoginPage         from './pages/loginpage';
import ForgotPasswordPage from './pages/forgotpassword';
import VerificationPage   from './pages/verificationpage';
import NewPasswordPage    from './pages/newpasswordpage';
import SuccessPage        from './pages/successpage';

// App shell
import AppShell from './pages/AppShell';

// Inner pages
import PlanPage            from './pages/PlanPage';
import WayfinderRoutesPage from './pages/WayfinderRoutesPage';
import NapepPage           from './pages/NapepPage';
import RegistrationPage    from './pages/RegistrationPage';
import DriverLoginPage     from './pages/DriverLoginPage';
import ProfilePage         from './pages/ProfilePage';
import PaymentPage         from './pages/PaymentPage';

// Admin pages
import AdminSimPage    from './pages/AdminSimPage';
import AdminControlPage from './pages/AdminControlPage';
import AdminDataPage   from './pages/AdminDataPage';

export default function App() {
  const [page, setPage] = useState('landing');
  const [role, setRole] = useState(null);

  // Wayfinder shared state
  const [wfRoutes, setWfRoutes]       = useState([]);
  const [wfOrigin, setWfOrigin]       = useState('gate1');
  const [wfDest, setWfDest]           = useState('aud');
  const [wfPreferLit, setWfPreferLit] = useState(true);

  const authPages = ['landing', 'login', 'signup', 'forgot-password', 'verification', 'new-password', 'success'];

  const navigate = (p, userRole) => {
    if (userRole) setRole(userRole);
    if (authPages.includes(p)) setRole(null);
    setPage(p);
  };

  const handleRoutesReady = (routes, origin, destination, preferLit) => {
    setWfRoutes(routes);
    setWfOrigin(origin);
    setWfDest(destination);
    setWfPreferLit(preferLit);
  };

  // Auth pages (no shell)
  if (page === 'landing')         return <LandingPage onGetStarted={navigate} />;
  if (page === 'signup')          return <SignUpPage onNavigate={navigate} />;
  if (page === 'login')           return <LoginPage onNavigate={navigate} />;
  if (page === 'forgot-password') return <ForgotPasswordPage onNavigate={navigate} />;
  if (page === 'verification')    return <VerificationPage onNavigate={navigate} />;
  if (page === 'new-password')    return <NewPasswordPage onNavigate={navigate} />;
  if (page === 'success')         return <SuccessPage onNavigate={navigate} />;

  // Inner pages (wrapped in AppShell)
  const isAdmin = role === 'admin';

  const innerPages = {
    plan:         <PlanPage onNavigate={navigate} onRoutesReady={handleRoutesReady} />,
    wayfinder:    <WayfinderRoutesPage routes={wfRoutes} origin={wfOrigin} destination={wfDest} preferLit={wfPreferLit} onNavigate={navigate} />,
    napep:        <NapepPage onNavigate={navigate} />,
    registration: <RegistrationPage onNavigate={navigate} />,
    driverlogin:  <DriverLoginPage onNavigate={navigate} />,
    profile:      <ProfilePage onNavigate={navigate} />,
    payment:      <PaymentPage onNavigate={navigate} />,
    adminsim:     <AdminSimPage onNavigate={navigate} />,
    admincontrol: <AdminControlPage onNavigate={navigate} />,
    admindata:    <AdminDataPage onNavigate={navigate} />,
  };

  const adminPages = ['adminsim', 'admincontrol', 'admindata'];
  const hideRight = isAdmin
    ? adminPages.includes(page)
    : page === 'plan' || page === 'wayfinder' || page === 'napep';

  return (
    <AppShell currentPage={page} onNavigate={navigate} role={role} hideRightPanel={hideRight}>
      {innerPages[page] ?? (isAdmin ? innerPages['adminsim'] : innerPages['plan'])}
    </AppShell>
  );
}