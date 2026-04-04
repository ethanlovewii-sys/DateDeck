import React from 'react';
import './chat.css';

export function Chat(){

    const [isDesktop, setIsDesktop] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [chats, setChats] = React.useState([
        {id: 1, name: "Jamie", lastMessage: "Yeah lets do this one", timestamp: "8:05pm", color: "#ffd8d8"},
        {id: 2, name: "John", lastMessage: "Sounds fun!", timestamp: "7:45pm", color: "#d8e7ff"},
        {id: 3, name: "Emily", lastMessage: "Can't wait to try this!", timestamp: "6:30pm", color: "#d8ffd8"},
    ]);

const messages = [
  {
    sender: "friend",
    text: "Hey, do you want to try out that new restaurant this weekend?"
  },
  {
    sender: "self",
    text: "Yeah, that sounds great! What day were you thinking?"
  },
  {
    sender: "friend",
    text: "maybe Saturday? I heard they have amazing brunch!"
  },
  {
    sender: "self",
    text: "Saturday works for me! What time should we meet?"
  },
  {
    sender: "friend",
    text: "I was thinking around 10 AM?"
  },
  {
    sender: "self",
    text: "10 AM is perfect! I'm really looking forward to it!"
  },
  {
    sender: "friend",
    text: "Hey, do you want to try out that new restaurant this weekend?"
  },
  {
    sender: "self",
    text: "Yeah, that sounds great! What day were you thinking?"
  },
  {
    sender: "friend",
    text: "maybe Saturday? I heard they have amazing brunch!"
  },
  {
    sender: "self",
    text: "Saturday works for me! What time should we meet?"
  },
  {
    sender: "friend",
    text: "I was thinking around 10 AM?"
  },
  {
    sender: "self",
    text: "10 AM is perfect! I'm really looking forward to it!"
  }
];

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


    //scroll to bottom of chat when new messages are added
    const chatBodyRef = React.useRef(null);
    React.useEffect(() => {
        const element = chatBodyRef.current;
        if (element) {
            setTimeout(() => {
            element.scrollTop = element.scrollHeight;
            }, 10); 
        }
    }, [messages]);


    return (
        <main className={`chat-layout ${isDesktop ? 'desktop' : 'mobile'}`}>

            {/* Left side: Chat selector and search */}

            <div className="chat-list">

                <div className='list-header'>
                    <div className='chat-username'>{username}</div>
                    <div className='new-message-icon'>✎</div>
                </div>

                <div className='search-container'>
                    <input sender="text" placeholder="🔍︎ Search" className="search-bar"/>
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

                <div className='chat-window-header'>
                    <div className='chat-window-avatar-name'>
                        <div className='chat-window-avatar' style={{ backgroundColor: "#ffd8d8" }}>
                            J
                        </div>
                        <div className='chat-window-name'>
                            Jamie
                        </div>
                    </div>
                    <div className='chat-window-info'>
                        𝒊
                    </div>
                </div>
{/* Make chat start at bottom then add the input layer */}
                <div className='chat-window-body' ref={chatBodyRef}>
                    <div className='all-chat-messages'>
                        {/* Map chat messages */}
                        {messages.map((message, i) => (
                            <div key={i} className={`chat-message ${
                                message.sender === "self" ? "self-chat-message" : "friend-chat-message"
                                }`}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='chat-window-input'>
                    <input sender="text" placeholder="Type a message..." className="message-input"/>
                </div>
            </div>
        </main>
    );
}
