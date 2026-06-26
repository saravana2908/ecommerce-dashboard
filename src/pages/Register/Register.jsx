import { useState } from "react";
import { useRegisterUserMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    await registerUser(userData).unwrap();
    alert("Registration Successful");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;