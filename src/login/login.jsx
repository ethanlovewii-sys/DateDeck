import React from 'react';
import './login.css';

export function About() {
  return (
    <main className = "text-center">
      <h1 className="mb-4">Create Your Account</h1>

      <form method="get" action="card.html" className="mx-auto" style="max-width: 350px;">

        <div className="form-floating mb-3">
          <input type="email" placeholder="✉ Email" className="form-control" id="email"/>
          <label for="email">✉ Email</label>
        </div>

        <div className = "form-floating mb-3">
          <input type="password" placeholder="🗝️ Password" className="form-control" id="password"/>
          <label for="password">🗝️ Password</label>
        </div>

        <div className="form-check mb-3 text-start ps-0"> 
            <input className="form-check-impu" type="checkbox" value="" id="remember"/> 
            <label className="form-check-label" for="remember">Remember me</label>
        </div> 
        
        <button type="submit" className="btn btn-primary w-100 custom-btn">Sign up / Log in</button>
      </form>
    </main>
  );
}