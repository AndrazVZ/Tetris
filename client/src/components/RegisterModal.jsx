import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";

const RegisterModal = ({ onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await axios.post("http://localhost:3000/api/auth/register", {
                name,
                email,
                password,
            });

            alert("Registered successfully! Now login.");
            onClose();
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("Registration failed. Please try again.");
            }
        }
    };


    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="modal">
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleRegister}>Register</button>
                <button onClick={onClose} className="cancel">Cancel</button>
            </div>
        </>
    );
};

export default RegisterModal;
