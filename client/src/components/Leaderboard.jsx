import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';
import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("tetrisUser");
    let localUser = null;
  
    if (stored) {
      try {
        localUser = JSON.parse(stored);
        setCurrentUser(localUser);
      } catch (err) {
        console.error("Failed to parse user", err);
      }
    }
  
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        const sorted = res.data.sort((a, b) => b.score - a.score);
        setUsers(sorted);
  
        if (localUser) {
          const matched = sorted.find((u) => u._id === localUser._id);
          if (matched) {
            setCurrentUser(matched);
            localStorage.setItem("tetrisUser", JSON.stringify(matched));
          }
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };
  
    fetchUsers();
  }, []);
  

  return (
    <>
    <Header />
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Leaderboard</h2>

      {currentUser && (
        <>
          <div className="current-user">
            <img
              src={currentUser.profilePicture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="Profile"
              className="profile-pic"
            />
            <span className="current-user-name">
              {currentUser.name} — {currentUser.score} pts
            </span>
          </div>
          <hr className="divider" />
        </>
      )}

      <ol className="leaderboard-list">
        {users.map((user) => (
          <li key={user._id} className="leaderboard-entry">
            <img
              src={user.profilePicture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="Profile"
              className="profile-pic"
            />
            <span className="leaderboard-name">{user.name}</span>
            <span className="leaderboard-score">{user.score} pts</span>
          </li>
        ))}
      </ol>
    </div>
    </>
  );
};

export default Leaderboard;
