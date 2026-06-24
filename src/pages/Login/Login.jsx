import { useState } from "react";
import { useGetUsersQuery } from "../../services/api";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: users = [] } = useGetUsersQuery();
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
    console.log("Invalid Credentials");
  }
};
  return (
    <div>
      <h1>Login</h1>

     <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

      
    </div>
  );
}

export default Login;