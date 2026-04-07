import React from 'react';
import './chat.css';
import { CloseButton } from 'react-bootstrap';

// load messages from db
// add searching and accepting requests

//to do later
//add user timestaps that update when the cards are loaded

export function Chat(){

    const [isDesktop, setIsDesktop] = React.useState(false);

    //Websocket connection
    const socketRef = React.useRef(null);

    const [username, setUsername] = React.useState("");
    const [chats, setChats] = React.useState([]); // {id: 3, name: "Emily", lastMessage: "Can't wait to try this!", timestamp: "6:30pm", color: "#d8ffd8"},
    const [messages, setMessages] = React.useState([]);
    const [selectedChat, setSelectedChat] = React.useState(null);
    const [chatData, setChatData] = React.useState(null); //{users: ["self", "Emily"], accepted: true, lastMessage: "Can't wait to try this!", color: "#d8ffd8"}
    const otherUser = chatData?.users.filter(u => u !== username)[0] || "";

    const [searchQuery, setSearchQuery] = React.useState("");
    const [usersFound, setUsersFound] = React.useState([]);
    const [searchingForChat, setSearchingForChat] = React.useState(false);

    // Initialize WebSocket connection and set up event listeners
    React.useEffect(() => {
        const socket = new WebSocket("ws://localhost:3001");

        socket.onopen = () => {
            console.log("Frontend connected to WebSocket");
        };

        //Catches new messages
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            setMessages(prev => [...prev, message]);
        };

        socket.onclose = () => {
            console.log("Frontend disconnected from WebSocket");
        };

        socketRef.current = socket;

        return () => socket.close();
    }, []);

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

    //load chats for the left side
    const loadChats = async () => {
        const response = await fetch('/api/chat/loadChats', {credentials: 'include'});
        const data = await response.json();
        setChats(data.sortedChats);
    };

    React.useEffect(() => {
        loadChats();
    }, []);

    //auto resize the textarea input
    const textareaRef = React.useRef(null);
    const [messageContents, setMessageContents] = React.useState("");
    const autoResize = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = Math.max(50, textarea.scrollHeight) + 'px';

        textarea.style.overflowY = textarea.scrollHeight > 130 ? 'auto' : 'hidden';
    };

    React.useEffect(() => {
        autoResize();
    }, [messageContents]);


    //Send message through websocket
    const sendMessage = () => {
        if (!messageContents.trim()) return;

        const message = {
            sender: "self",
            text: messageContents,
            timestamp: new Date()
        };

        socketRef.current.send(JSON.stringify(message));

        setMessageContents("");
    };

    // Pulls users that match the search query for starting new chats
    const searchUsers = async (query) => {
        if (!query.trim()) {
            setUsersFound([]);
            return;
        }

        try {
            const response = await fetch(`/api/chat/searchUsers?q=${encodeURIComponent(query)}`, {credentials: 'include'});
            const data = await response.json();
            setUsersFound(data.users);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    const openChatWithUser = async (friendUsername) => {
        //If chat exists, load that chat's messages and info into the right side of the chat window. 
        //If not, create a new chat in the DB and open new chat window on the right
        // connect websocket to the new chat room and load messages for that chat
        const response = await fetch(`/api/chat/openChat`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ friendUsername })
        });
        const data = await response.json();
        loadChats();
        setChatData(data.chat);
        console.log("chat ID:", data.chat.chatId);
        setSelectedChat(data.chat.chatId);
    };

    React.useEffect(() => {
        if (!selectedChat) return;

        async function fetchChat() {
            const res = await fetch(`/api/chat/getChat?chatId=${selectedChat}`, {
                credentials: 'include'
            });
            const data = await res.json();
            setChatData(data.chat);
        }

        fetchChat();
    }, [selectedChat]);


    return (
        <main className={`chat-layout ${isDesktop ? 'desktop' : 'mobile'}`}>

            {/* Left side: Chat selector and search */}

            <div className="chat-list">

                <div className='list-header'>
                    <div className='chat-username'>{username}</div>
                    <div className='new-message-icon'>✎</div>
                </div>

                <div className='search-container'>
                    <input type="text" placeholder="🔍︎ Search" className="search-bar" 
                        value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value); searchUsers(e.target.value); }}
                        onClick={setSearchingForChat.bind(this, true)} onBlur={setSearchingForChat.bind(this, false)}
                        />
                    {searchingForChat && (
                        <div className='search-result-list'>
                            {usersFound.map((user) => (
                                <button key={user.username} className='search-result' 
                                    onMouseDown={() => {
                                        openChatWithUser(user.username);
                                        setSearchingForChat(false);
                                        setSearchQuery('');
                                    }}
                                >
                                    {user.username}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className='list-body'>

                    {/* Map through chats and display them */}

                    {chats.map((chat) => (
                        <div key={chat.chatId} className='chat-item' 
                        onClick={() => {
                            if (selectedChat === chat.chatId) return;
                            setChatData(null);
                            setMessages([]);
                            setSelectedChat(chat.chatId);
                        }}>
                            <div className='chat-avatar' style={{ backgroundColor: chat.color }}>
                                {/* grab the username that is not self */}
                                {chat.users.filter(u => u !== username)[0][0].toUpperCase()}
                            </div>
                            <div className='chat-info'>
                                <div className='chat-name-and-time'>
                                    <div className='chat-name'>{chat.users.filter(u => u !== username)[0]}</div>
                                    <div className='chat-timestamp'>{chat.userTimestamp}</div>
                                </div>
                                <div className='last-message'>{chat.lastMessage}</div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Right side: Selected chat window */}

            <div className='chat-window-container'>
                {selectedChat && (
                <div className='chat-window'>
                    <div className='chat-window-header'>
                        <div className='chat-window-avatar-name'>
                            <div className='chat-window-avatar' style={{ backgroundColor: chatData?.color || 'none' }}>
                                {otherUser?.[0]?.toUpperCase() || ""}
                            </div>
                            <div className='chat-window-name'>
                                {otherUser}
                            </div>
                        </div>
                        <div className='chat-window-info'>
                            𝒊
                        </div>
                    </div>
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
                        <div className='message-input-container'>
                            <textarea ref={textareaRef} className="message-input" value={messageContents}  rows={1} placeholder='Type a message...'
                                onChange={(e) => {setMessageContents(e.target.value); autoResize(); }} />
                            <button className='send-button' onClick={sendMessage}>🡩</button>
                        </div>
                    </div>
                </div>) || (
                    <div className='no-chat-selected'>
                        <p>Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </main>
    );
}
