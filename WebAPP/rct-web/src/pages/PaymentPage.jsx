import './inner-pages.css';
import { useState } from 'react';

const transactions = [
  { id: 1, desc: 'Gate 1 → Lekki Gate', date: 'Today, 9:14 AM', amount: '₦150', type: 'debit' },
  { id: 2, desc: 'Wallet Top-up', date: 'Today, 8:00 AM', amount: '₦2,000', type: 'credit' },
  { id: 3, desc: 'Arena → Main Gate', date: 'Yesterday, 6:30 PM', amount: '₦100', type: 'debit' },
  { id: 4, desc: 'Car Park 4 → Jumat', date: 'Yesterday, 1:22 PM', amount: '₦200', type: 'debit' },
  { id: 5, desc: 'Wallet Top-up', date: 'Jun 22, 10:00 AM', amount: '₦5,000', type: 'credit' },
];

export default function PaymentPage() {
  const [saved, setSaved] = useState(false);
  const [topupAmt, setTopupAmt] = useState('');
  const [imgPreview, setImgPreview] = useState(null);
  const [tab, setTab] = useState('wallet');

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) setImgPreview(URL.createObjectURL(file));
  };

  const handlePay = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="inner-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Payment</h1>
          <p className="page-subtitle">Manage your transit wallet & payments</p>
        </div>
      </div>

      {/* Wallet card */}
      <div className="wallet-card">
        <div className="wallet-card-top">
          <div>
            <p className="wallet-label">RCT Wallet Balance</p>
            <p className="wallet-balance">₦6,550.00</p>
          </div>
          <div className="wallet-logo">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2.5" fill="none" />
              <path d="M14 30 L24 14 L34 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="24" cy="30" r="3" fill="white" />
            </svg>
          </div>
        </div>
        <div className="wallet-card-bottom">
          <span className="wallet-id">John Doe · RCT-00124</span>
          <span className="wallet-status">● Active</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="pay-tabs">
        {['wallet', 'transit', 'picture'].map(t => (
          <button key={t} className={`pay-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'wallet' ? 'Top Up' : t === 'transit' ? 'Transit Pay' : 'Update Picture'}
          </button>
        ))}
      </div>

      {/* Tab: Wallet top-up */}
      {tab === 'wallet' && (
        <div className="pay-section">
          <div className="reg-section-title">Top Up Wallet</div>
          <div className="topup-amounts">
            {['500', '1000', '2000', '5000'].map(amt => (
              <button key={amt} className={`topup-chip ${topupAmt === amt ? 'active' : ''}`} onClick={() => setTopupAmt(amt)}>
                ₦{parseInt(amt).toLocaleString()}
              </button>
            ))}
          </div>
          <div className="form-group" style={{ marginTop: '12px' }}>
            <label className="form-label">Or enter amount</label>
            <input className="form-input" type="number" placeholder="₦0.00" value={topupAmt} onChange={e => setTopupAmt(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Payment Method</label>
            <div className="payment-methods">
              {['Paystack', 'Bank Transfer', 'USSD'].map(m => (
                <button key={m} className="pay-method-btn">{m}</button>
              ))}
            </div>
          </div>
          <button className="btn-primary" onClick={handlePay}>Top Up Wallet</button>

          {saved && (
            <div className="saved-banner" style={{ marginTop: '12px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Payment successful!
            </div>
          )}

          <div className="reg-section-title" style={{ marginTop: '28px' }}>Recent Transactions</div>
          <div className="tx-list">
            {transactions.map(tx => (
              <div key={tx.id} className="tx-item">
                <div className={`tx-icon ${tx.type}`}>
                  {tx.type === 'credit'
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
                  }
                </div>
                <div className="tx-info">
                  <p className="tx-desc">{tx.desc}</p>
                  <p className="tx-date">{tx.date}</p>
                </div>
                <span className={`tx-amount ${tx.type}`}>
                  {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Transit pay */}
      {tab === 'transit' && (
        <div className="pay-section">
          <div className="reg-section-title">Transit Payment</div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Pay for your NAPEP ride directly from your RCT wallet.
          </p>
          <div className="form-group">
            <label className="form-label">NAPEP ID</label>
            <input className="form-input" placeholder="e.g. A12" />
          </div>
          <div className="form-group">
            <label className="form-label">Amount</label>
            <input className="form-input" type="number" placeholder="₦0.00" />
          </div>
          <div className="form-group">
            <label className="form-label">Route</label>
            <input className="form-input" placeholder="e.g. Gate 1 → Lekki Gate" />
          </div>
          <button className="btn-primary" onClick={handlePay}>Pay Now</button>
          {saved && (
            <div className="saved-banner" style={{ marginTop: '12px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Transit payment successful!
            </div>
          )}
        </div>
      )}

      {/* Tab: Update picture */}
      {tab === 'picture' && (
        <div className="pay-section">
          <div className="reg-section-title">Update Profile Picture</div>
          <div className="profile-pic-section" style={{ marginBottom: '20px' }}>
            <div className="profile-pic-wrap">
              {imgPreview
                ? <img src={imgPreview} alt="Profile" className="profile-pic-img" />
                : <div className="profile-pic-placeholder">JD</div>
              }
            </div>
            <div>
              <p className="profile-pic-name">John Doe</p>
              <p className="profile-pic-role">NAPEP Driver</p>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Choose New Photo</label>
            <div className="upload-box" onClick={() => document.getElementById('pay-pic').click()}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
              <p>Click to upload</p>
              <span>PNG, JPG up to 5MB</span>
            </div>
            <input id="pay-pic" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImg} />
          </div>

          {/* Saved state */}
          <div className="payment-saved-state">
            <div className="saved-icon" style={{ width: '70px', height: '70px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p className="saved-title" style={{ fontSize: '1.1rem', marginTop: '12px' }}>Saved</p>
          </div>

          <button className="btn-primary" onClick={handlePay} style={{ marginTop: '16px' }}>
            Update Picture
          </button>
          {saved && (
            <div className="saved-banner" style={{ marginTop: '12px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Picture updated!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
