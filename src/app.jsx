import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Card } from './card/card'
import { Deck } from './deck/deck'
import { Login } from './login/login'
import { Social } from './social/social'


function Layout({children}) {
    const location = use.Location();
    const isLogin = location.pathname == "/";

    return(
        <div>
            {isLogin && (
                <header className="login-header">
                    {<img src = "/datedeck.png" class = "mx-auto d-block mb-5 py-1"/>}
                </header>
        )}

            {!isLogin && (
                <header>
                    <NavLink to="login">
                    <img src = "/titledatedeck.png" class = "mx-auto d-block"/>
                    </NavLink>
                </header>
        )}

            {children}

            {isLogin && (
                <footer className="login-footer">
                    <span>Ethan Andrew Peterson</span> 
                    <NavLink to="https://github.com/ethanlovewii-sys/DateDeck">GitHub</NavLink>
                </footer>
        )}

            {!isLogin && (
                <footer className="bg-dark text-white-50">
                    <nav>
                        <ul class="footer-nav">
                            <li><NavLink to="card"> <img src="/card_icon.png" width="50"/></NavLink></li>
                            <li><NavLink to="deck"> <img src="/deck_icon_active.png" width="50"/></NavLink></li>
                            <li><NavLink to="social"> <img src="/socail_icon.png" width="50"/></NavLink></li>
                        </ul>
                    </nav>
                </footer>
        )}
        </div>
    );
}

export default function App() {
  return (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/card" element={<Card />}/>
                <Route path="/deck" element={<Deck />}/>
                <Route path="/social" element={<Social />}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </Layout>
    </BrowserRouter>
  );
}