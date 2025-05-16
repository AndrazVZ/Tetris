import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Header.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import GameOverModal from "./GameOverModal";

const API_BASE = "http://localhost:3000";

const Header = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("tetrisUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Toggle settings modal and lock scroll when open
  const toggleSettings = () => {
    setShowSettings(prev => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "auto";
      return next;
    });
  };

  // Toggle profile modal and lock scroll when open
  const toggleProfile = () => {
    setShowProfile(prev => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "auto";
      return next;
    });
  };

  // Toggle game over modal and lock scroll when open
  const toggleGameOver = () => {
    setShowGameOver(prev => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "auto";
      return next;
    });
  };

  // After login, store user in state and localStorage
  const handleLoginSuccess = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("tetrisUser", JSON.stringify(userInfo));
    setShowLogin(false);
  };

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("tetrisUser");
    setUser(null);
    setShowProfile(false);
  };

  // When a file is selected, upload to server
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user?._id) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const { data } = await axios.put(
        `${API_BASE}/api/users/update-profile-picture/${user._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUser(data);
      localStorage.setItem("tetrisUser", JSON.stringify(data));
    } catch (err) {
      console.error("Upload failed", err);
      alert("Could not upload profile picture.");
    }
  };

  return (
    <>
      {/* Hidden file input for picking images */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* Header bar */}
      <div className="header">
        <div className="icon-button" onClick={() => window.history.back()}>
          &#8592;
        </div>

        <h1 className="header-title">TETRIS</h1>

        {user ? (
          <img
            src={
              user.profilePicture
                ? `${API_BASE}${user.profilePicture}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="header-profile-pic"
            onClick={toggleProfile}
          />
        ) : (
          <div className="icon-button" onClick={toggleProfile}>
            &#128100;
          </div>
        )}

        <div className="icon-button" onClick={toggleSettings}>
          &#9881;
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <>
          <div className="overlay" onClick={toggleSettings}></div>
          <div className="settings-modal">
            <h2>SETTINGS</h2>
            <div className="volume-control">
              <span role="img" aria-label="volume">
                🔈
              </span>
              <input type="range" min="0" max="100" />
            </div>
            <div className="control-keys">
              <div><span>Hold</span> <span>⬆️</span></div>
              <div><span>Down</span> <span>⬇️</span></div>
              <div><span>Left</span> <span>⬅️</span></div>
              <div><span>Right</span> <span>➡️</span></div>
            </div>
            <button className="save-button" onClick={toggleSettings}>Save</button>
          </div>
        </>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <>
          <div className="overlay" onClick={toggleProfile}></div>
          <div className="profile-modal">
            {user ? (
              <>
                <img
                  src={
                    user.profilePicture
                      ? `${API_BASE}${user.profilePicture}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="profile-picture"
                  onClick={() => fileInputRef.current.click()}
                  style={{ cursor: "pointer" }}
                />
                <h2 className="profile-name">{user.name}</h2>
                <button className="save-button" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <h2>Welcome!</h2>
                <button className="save-button" onClick={() => { setShowLogin(true); setShowProfile(false); }}>Login</button>
                <br />
                <button className="save-button" onClick={() => { setShowRegister(true); setShowProfile(false); }}>Register</button>
              </>
            )}
          </div>
        </>
      )}

      {/* Login/Register Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}

      {/* GameOver Modal */}
      {showGameOver && <GameOverModal onClose={() => setShowGameOver(false)}/>}
    </>
  );
};

export default Header;
