function LandingPage({ setView, user, handleLogout }) {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Kaun Banega Crorepati</h1>
        <p className="landing-subtitle">Bharat ka sabse bada game show, ab aapke screen par!</p>
        <div className="landing-buttons">
          <button className="landing-btn play" onClick={() => setView('start')}>
            Khelna Shuru Karein
          </button>
          
          {user && (
            <>
              <button className="landing-btn dashboard" onClick={() => setView('dashboard')}>
                Mera Dashboard
              </button>
              <button className="landing-btn dashboard" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      
      <img src="/YSlogo.png" alt="YS Logo" className="logo-image" />

      <footer className="landing-footer">
        Made with ❤️ by <a href="https://www.linkedin.com/in/yoursyuvii/" target="_blank" rel="noopener noreferrer">yoursyuvii</a>
      </footer>
    </div>
  );
}

export default LandingPage;