import { useState } from "react";
import { useGetUsersQuery } from "../../services/api";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: users = [] } = useGetUsersQuery();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
  e.preventDefault();

  const user = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (user) {
dispatch(login(user));

navigate("/home");  } 
else {
    setError("Invalid Email or Password");
  }
};
  return (
   <div className="auth-container">
      <h1>Login</h1>

     <form onSubmit={handleSubmit}>

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

        

        <button type="submit">
          Login
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

       <p>
  Don't have an account?{" "}
  <span
    style={{ color: "blue", cursor: "pointer" }}
    onClick={() => navigate("/register")}
  >
    Register
  </span>
</p>

      </form>

      
    </div>
  );
}

export default Login;