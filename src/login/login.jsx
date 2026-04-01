import React from 'react';
import './login.css';
import { useNavigate, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login() {
  const navigate = useNavigate();

  // State variables for email and password, initialized with values from localStorage if available
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hasAnAcount, setHasAnAcount] = React.useState(false);

  // Function to handle user login
  async function loginUser(endpoint) {
    if (username === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }
    if (!hasAnAcount && email === "") {
      alert("Please fill in all fields.");
      return;
    }
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ username: username, email: email, password: password}),
      headers:{
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200){
      navigate('/card');
    }
    else{
      const body = await response.json();
      alert(body.msg)
    }
  }

  // JSX for the login form
  return (
    <main className = "form-main">
      {!hasAnAcount && 
        <h1 className="mb-4">Create Your Account</h1>
      }
      {hasAnAcount &&
        <h1 className='mb-4'>Log in</h1>
      }

      <form onSubmit={(e) => e.preventDefault()} className="mx-auto lognin-form">

        <div className="form-floating mb-3">
          <input type="text" placeholder="Username" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <label htmlFor="username"></label>
        </div>

        {!hasAnAcount &&
          <div className="form-floating mb-3 email-input">
            <input type="text" placeholder="✉ Email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="email"></label>
          </div>
        }

        <div className = "form-floating mb-3">
          <input type="password" placeholder="🗝️ Password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <label htmlFor="password">🗝️ Password</label>
        </div>
        
        {!hasAnAcount &&
        <div>
        <div className="form-floating mb-3 email-input">
          <input type="text" placeholder="✉ Email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label htmlFor="email"></label>
        </div>
          <button type="submit" onClick = {() =>loginUser('/api/auth/register')} className="btn btn-primary w-100 custom-btn">Sign up</button>
          <div>
            Already have an accout?
            <button className='logInButton' onClick = {() => setHasAnAcount(true)}>
              Log in
            </button>
          </div>
        </div>
        }

        {hasAnAcount &&
        <div>
          <button type="submit" onClick = {() =>loginUser('/api/auth/login')} className="btn btn-primary w-100 custom-btn">Log in</button>
          <div>
            Don't have an accout?
            <button className='logInButton' onClick = {() => setHasAnAcount(false)}>
              Sign up
            </button>
          </div>
        </div>
        }
        

      </form>
    </main>
  );
}