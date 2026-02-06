import React from 'react';
import './login.css';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login() {
  return (
    <main className = "text-center">
      <h1 className="mb-4">Create Your Account</h1>

      <form onSubmit={(e) => e.preventDefault()} className="mx-auto lognin-form">

        <div className="form-floating mb-3">
          <input type="email" placeholder="✉ Email" className="form-control" id="email"/>
          <label htmlFor="email">✉ Email</label>
        </div>

        <div className = "form-floating mb-3">
          <input type="password" placeholder="🗝️ Password" className="form-control" id="password"/>
          <label htmlFor="password">🗝️ Password</label>
        </div>

        <div className="form-check mb-3 text-start ps-0"> 
            <input className="form-check-impu" type="checkbox" value="" id="remember"/> 
            <label className="form-check-label" htmlFor="remember">Remember me</label>
        </div> 
        
        <NavLink to="/card">
            <button type="submit" className="btn btn-primary w-100 custom-btn">Sign up / Log in</button>
        </NavLink>
      </form>
    </main>
  );
}