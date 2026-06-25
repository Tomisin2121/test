import './inner-pages.css';
import AppShell from './AppShell';
import { useState } from 'react';

export default function RegistrationPage({ onNavigate }) {
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);

  const handleSubmit = () => {
    setSaved(true);
    setTimeout(() => onNavigate?.('profile'), 1800);
  };

  return (
    <AppShell currentPage="registration" onNavigate={onNavigate}>
      <div className="inner-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Driver Registration</h1>
            <p className="page-subtitle">Riders Registration Only</p>
          </div>
          <div className="reg-steps">
            <div className={`reg-step ${step >= 1 ? 'done' : ''}`}>1</div>
            <div className="reg-step-line" />
            <div className={`reg-step ${step >= 2 ? 'done' : ''}`}>2</div>
          </div>
        </div>

        {saved ? (
          <div className="saved-state">
            <div className="saved-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="saved-title">Saved!</h2>
            <p className="saved-sub">Registration submitted successfully.</p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="reg-form">
                <div className="reg-section-title">Personal Information</div>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="Emeka Okafor" />
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" type="tel" placeholder="+234 800 000 0000" />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input className="form-input" type="password" placeholder="••••••••" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input className="form-input" type="password" placeholder="••••••••" />
                  </div>
                </div>

                <div className="reg-section-title" style={{ marginTop: '20px' }}>Select Operational Area</div>
                <div className="op-area-grid">
                  {['Gate 1 Area', 'Lekki Gate', 'Car Park 4', 'Jumat Mosque', 'Arena', 'Main Gate'].map(area => (
                    <button key={area} className="op-area-btn">{area}</button>
                  ))}
                </div>

                <button className="btn-primary" style={{ marginTop: '24px' }} onClick={() => setStep(2)}>
                  Next Step →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="reg-form">
                <div className="reg-section-title">Vehicle & Documents</div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">NAPEP Plate No.</label>
                    <input className="form-input" placeholder="ABC-123-XY" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Vehicle Model</label>
                    <input className="form-input" placeholder="Keke NAPEP" />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Driver's License No.</label>
                    <input className="form-input" placeholder="DL-00000000" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Years of Experience</label>
                    <input className="form-input" type="number" placeholder="e.g. 3" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Upload Driver's License</label>
                  <div className="upload-box">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                    <p>Click to upload or drag & drop</p>
                    <span>PNG, JPG up to 5MB</span>
                  </div>
                </div>

                <div className="reg-btn-row">
                  <button className="btn-outline-green" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
                    Submit Registration
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}