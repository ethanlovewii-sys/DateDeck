import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from './card/card'
import { Deck } from './deck/deck'
import { Login } from './login/login'
import { Social } from './social/social'


function Layout({children}) {
    const location = useLocation();
    const isLogin = location.pathname == "/";

    return(
        <div className="app-layout">
            {isLogin && (
                <header className="login-header">
                    <img src = "/datedeck.png" className = "mx-auto d-block mb-5 py-1 title"/>
                </header>
            )}

            {!isLogin && (
                <header className="normal-header">
                    <NavLink to="/">
                    <img src = "/titledatedeck.png" className = "mx-auto header-img"/>
                    </NavLink>
                </header>
            )}
            <main>
                {children}
            </main>

            {isLogin && (
                <footer className="login-footer d-flex justify-content-between align-items-center px-3 border-top">
                    <span>Ethan Andrew Peterson</span> 
                    <NavLink to="https://github.com/ethanlovewii-sys/DateDeck">GitHub</NavLink>
                </footer>
            )}

            {!isLogin && (
                <footer className="normal-footer">
                    <nav>
                        <ul className="footer-nav">
                            <li>
                                <NavLink to="/card">
                                    {({ isActive }) => (
                                    <img src={isActive ? "/card_icon_active.png" : "/card_icon.png"} className="footer-icon"/>
                                )}
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/deck">
                                    {({ isActive }) => (
                                    <img id="deck-icon" src={isActive ? "/deck_icon_active.png" : "/deck_icon.png"} className="footer-icon"/>
                                )}
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/social">
                                    {({ isActive }) => (
                                    <img src={isActive ? "/social_icon_active.png" : "/social_icon.png"} className="footer-icon"/>
                                )}
                                </NavLink>
                            </li>

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
                </Routes>
            </Layout>
    </BrowserRouter>
  );
}


