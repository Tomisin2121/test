import { useState } from 'react';

// Auth pages
import LandingPage        from './pages/splash';
import SignUpPage         from './pages/signuppage';
import LoginPage         from './pages/loginpage';
import ForgotPasswordPage from './pages/forgotpassword';
import VerificationPage   from './pages/verificationPage';
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

export default function App() {
  const [page, setPage] = useState('landing');

  // Wayfinder shared state
  const [wfRoutes, setWfRoutes]       = useState([]);
  const [wfOrigin, setWfOrigin]       = useState('gate1');
  const [wfDest, setWfDest]           = useState('aud');
  const [wfPreferLit, setWfPreferLit] = useState(true);

  const navigate = (p) => setPage(p);

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
  const innerPages = {
    plan:         <PlanPage onNavigate={navigate} onRoutesReady={handleRoutesReady} />,
    wayfinder:    <WayfinderRoutesPage routes={wfRoutes} origin={wfOrigin} destination={wfDest} preferLit={wfPreferLit} onNavigate={navigate} />,
    napep:        <NapepPage onNavigate={navigate} />,
    registration: <RegistrationPage onNavigate={navigate} />,
    driverlogin:  <DriverLoginPage onNavigate={navigate} />,
    profile:      <ProfilePage onNavigate={navigate} />,
    payment:      <PaymentPage onNavigate={navigate} />,
  };

  return (
    <AppShell currentPage={page} onNavigate={navigate} hideRightPanel={page === 'plan'|| page === 'wayfinder' || page === 'napep'}>
      {innerPages[page] ?? innerPages['plan']}
    </AppShell>
  );
}