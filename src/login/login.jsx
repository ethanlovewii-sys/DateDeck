import React from 'react';
import './login.css';
import { useNavigate, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login() {
  const navigate = useNavigate();

  // State variables for email and password, initialized with values from localStorage if available
  const [email, setEmail] = React.useState(localStorage.getItem("email") || "");
  const [password, setPassword] = React.useState("");

  // Function to handle user login
  async function loginUser() {
    if (localStorage.getItem("email") === email) {
      if (localStorage.getItem("password") === password) {
        navigate('/card');
        return;
      }
      else{
        alert("Incorrect password. Please try again.");
        return;
      }
    }
    if (email === "" | password === "") {
      alert("Please fill in all fields.");
      return;
    }
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    navigate('/card');
  }

  // JSX for the login form
  return (
    <main className = "text-center">
      <h1 className="mb-4">Create Your Account</h1>

      <form onSubmit={(e) => e.preventDefault()} className="mx-auto lognin-form">

        <div className="form-floating mb-3 email-input">
          <input type="email" placeholder="✉ Email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label htmlFor="email">✉ Email</label>
        </div>

        <div className = "form-floating mb-3">
          <input type="password" placeholder="🗝️ Password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <label htmlFor="password">🗝️ Password</label>
        </div>

        <div className="form-check mb-3 text-start ps-0"> 
            <input className="form-check-imput" type="checkbox" value="" id="remember"/> 
            <label className="form-check-label remember-text" htmlFor="remember">Remember me</label>
        </div> 
        
        <button type="submit" onClick = {() =>loginUser()} className="btn btn-primary w-100 custom-btn">Sign up / Log in</button>
      </form>
    </main>
  );
}