import './inner-pages.css';
import { useState } from 'react';

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) setImgPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="inner-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Driver's Profile</h1>
          <p className="page-subtitle">Manage your account information</p>
        </div>
      </div>

      {/* Profile picture */}
      <div className="profile-pic-section">
        <div className="profile-pic-wrap">
          {imgPreview
            ? <img src={imgPreview} alt="Profile" className="profile-pic-img" />
            : <div className="profile-pic-placeholder">JD</div>
          }
          <label className="profile-pic-edit" htmlFor="pic-upload">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
          </label>
          <input id="pic-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImg} />
        </div>
        <div>
          <p className="profile-pic-name">John Doe</p>
          <p className="profile-pic-role">NAPEP Driver · Gate 1 Area</p>
          <label htmlFor="pic-upload" className="update-pic-btn">Update Picture</label>
        </div>
      </div>

      {/* Saved banner */}
      {saved && (
        <div className="saved-banner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          Profile saved successfully!
        </div>
      )}

      {/* Form */}
      <div className="profile-form">
        <div className="reg-section-title">Personal Information</div>
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input className="form-input" defaultValue="John" />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input className="form-input" defaultValue="Doe" />
          </div>
        </div>
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" defaultValue="johndoe@gmail.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-input" type="tel" defaultValue="+234 800 000 0000" />
          </div>
        </div>
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">NAPEP Plate No.</label>
            <input className="form-input" defaultValue="ABC-123-XY" />
          </div>
          <div className="form-group">
            <label className="form-label">Wheel Number</label>
            <input className="form-input" defaultValue="WH-4421" />
          </div>
        </div>
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">State of Origin</label>
            <input className="form-input" defaultValue="Ogun State" />
          </div>
          <div className="form-group">
            <label className="form-label">Vehicle Model</label>
            <input className="form-input" defaultValue="Keke NAPEP" />
          </div>
        </div>

        <div className="reg-section-title" style={{ marginTop: '20px' }}>Select Operational Area</div>
        <div className="op-area-grid">
          {['Gate 1 Area', 'Lekki Gate', 'Car Park 4', 'Jumat Mosque', 'Arena', 'Main Gate'].map((area, i) => (
            <button key={area} className={`op-area-btn ${i === 0 ? 'active' : ''}`}>{area}</button>
          ))}
        </div>

        <button className="btn-primary" style={{ marginTop: '24px' }} onClick={handleSave}>
          Save Profile
        </button>
      </div>
    </div>
  );
}
