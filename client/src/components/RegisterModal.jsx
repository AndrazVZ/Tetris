import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";

const RegisterModal = ({ onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        // Email format regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Password strength regex: at least 6 characters, at least 1 letter and 1 number
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!passwordRegex.test(password)) {
            alert("Password must be at least 6 characters long and include both letters and numbers.");
            return;
        }

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
