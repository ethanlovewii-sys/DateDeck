import React from 'react';
import './chat.css';

export function Chat(){

    const [isDesktop, setIsDesktop] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [chats, setChats] = React.useState([
        {id: 1, name: "Alee", lastMessage: "I like this one", timestamp: "8:05pm", color: "#ffd8d8"},
        {id: 2, name: "John", lastMessage: "Sounds fun!", timestamp: "7:45pm", color: "#d8e7ff"},
        {id: 3, name: "Emily", lastMessage: "Can't wait to try this!", timestamp: "6:30pm", color: "#d8ffd8"},
    ]);

    // Check for mobile vs desktop
    React.useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth > 500);
        check();
    }, []);

    // Grap username for the chat header
    React.useEffect(() => {
        async function fetchUsername() {
            const response = await fetch('/api/chat/getUsername', {credentials: 'include'});
            const userData = await response.json();
            setUsername(userData.username);
        }
        fetchUsername();
    }, []);


    return (
        <main className={`chat-layout ${isDesktop ? 'desktop' : 'mobile'}`}>

            {/* Left side: Chat selector and search */}
            
            <div className="chat-list">

                <div className='list-header'>
                    <div className='chat-username'>{username}</div>
                    <div className='new-message-icon'>✎</div>
                </div>

                <div className='search-container'>
                    <input type="text" placeholder="🔍︎ Search" className="search-bar"/>
                </div>

                <div className='list-body'>

                    {/* Map through chats and display them */}

                    {chats.map((chat) => (
                        <div key={chat.id} className='chat-item'>
                            <div className='chat-avatar' style={{ backgroundColor: chat.color }}>
                                {chat.name[0]}
                            </div>
                            <div className='chat-info'>
                                <div className='chat-name-and-time'>
                                    <div className='chat-name'>{chat.name}</div>
                                    <div className='chat-timestamp'>{chat.timestamp}</div>
                                </div>
                                <div className='last-message'>{chat.lastMessage}</div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Right side: Selected chat window */}

            <div className={`chat-window ${isDesktop ? 'chat-window-desktop' : 'chat-window-mobile'}`}>
                Window
            </div>
        </main>
    );
}
