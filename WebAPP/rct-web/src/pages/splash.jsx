import './global.css';
import './LandingPage.css';
import rcgIcon from '../assets/rccg_logo 2.png'
import { useEffect } from 'react';

export default function LandingPage({onGetStarted}) {
    useEffect(() => {
    const timer = setTimeout(() => {
      onGetStarted?.('signup');
    }, 3000);
return () => clearTimeout(timer);
  }, []);
return(
 <div className="landing-screen">
      <img src={rcgIcon} className='landing-icon'/>
    <div className="landing-logo-text">
            <span className="logo-line1">REDEMPTION CITY</span>
            <span className="logo-line2">TRANSIT</span>
          </div>
    </div>
)}
  


  
  