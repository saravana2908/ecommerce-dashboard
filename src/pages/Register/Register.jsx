import { useState } from "react";
function Register() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Register</h1>

      <form>
        <input
  type="text"
  placeholder="Enter Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

        <br /><br />

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
          Register
        </button>

        <p>{name}</p>
<p>{email}</p>
<p>{password}</p>
      </form>
    </div>
  );
}

export default Register;