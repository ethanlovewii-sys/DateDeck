import React from 'react';
import './chat.css';

export function Chat(){

    const [isDesktop, setIsDesktop] = React.useState(false);
    const [username, setUsername] = React.useState();

    React.useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth > 500);
        check();
    }, []);

    return (
        <main className={`chat-layout ${isDesktop ? 'desktop' : 'mobile'}`}>
            <div className="chat-list">
                <div className='list-header'>
                    <h1></h1>
                    username and new message
                </div>
                <div className='list-search'>
                    search here
                </div>
                <div className='list-body'>
                    chats here
                </div>
            </div>
            <div className={`chat-window ${isDesktop ? 'chat-window-desktop' : 'chat-window-mobile'}`}>
                Window
            </div>
        </main>
    );
}