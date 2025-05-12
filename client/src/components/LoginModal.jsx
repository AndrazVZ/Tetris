import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";

const LoginModal = ({ onClose, onLoginSuccess }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", {
                name,
                password,
            });

            onLoginSuccess(res.data);
            onClose();
        } catch (error) {
            alert(error.response.data.error || "Login failed");
        }
    };

    return (
        <>
            <div className="overlay" onClick={onClose}></div> {}
            <div className="modal">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <button onClick={onClose} className="cancel">Cancel</button>
            </div>
        </>
    );
};

export default LoginModal;
