import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from './card/card'
import { Deck } from './deck/deck'
import { Chat } from './chat/chat'
import { Login } from './login/login'

//Add a chat page where you can look up frineds by their name or username and send them messages or cards you've made.

async function logout() {
    const response = await fetch(`/api/auth/logout`, {method: 'delete', credentials: 'include'});
    if (response.status === 200){
        window.location.href ='/';
    }
    };

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
                    <button onClick={logout} className='logout-btn'>
                        <img src="/titledatedeck.png" alt="DateDeck logo"  className = "mx-auto header-img"/>
                    </button>
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
                                <NavLink to="/chat">
                                    {({ isActive }) => (
                                    <img src={isActive ? "/chat_icon_active.png" : "/chat_icon.png"} className="footer-icon"/>
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
                    <Route path="/chat" element={<Chat />}/>
                </Routes>
            </Layout>
    </BrowserRouter>
  );
}


