import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatIcon from '@mui/icons-material/Chat';
import MinimizeIcon from '@mui/icons-material/Minimize';
import axios from "../axios";

const styles = {
    chatContainer: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        transition: 'all 0.5s ease',
        zIndex: 1000,
    },
    expandedChat: {
        width: 'calc(100% - 40px)',
        height: '80vh',
        maxWidth: '1200px',
    },
    shrinkingChat: {
        width: '60px',
        height: '60px',
        borderRadius: '30px',
    },
    minimizedChat: {
        width: '60px',
        height: '60px',
        borderRadius: '30px',
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    messagesContainer: {
        flexGrow: 1,
        overflowY: 'auto',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column-reverse',
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },
    visibleMessages: {
        opacity: 1,
    },
    messageWrapper: {
        display: 'flex',
        marginBottom: '10px',
        alignItems: 'flex-start',
    },
    message: {
        maxWidth: '75%',
        padding: '8px 12px',
        borderRadius: '16px',
        wordWrap: 'break-word',
    },
    userMessage: {
        backgroundColor: '#e3f2fd',
        marginLeft: 'auto',
        borderBottomRightRadius: '4px',
    },
    botMessage: {
        backgroundColor: 'white',
        marginRight: 'auto',
        borderBottomLeftRadius: '4px',
    },
    avatar: {
        width: 28,
        height: 28,
        margin: '0 8px',
    },
    inputContainer: {
        display: 'flex',
        padding: '8px',
        backgroundColor: 'white',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },
    visibleInputs: {
        opacity: 1,
    },
    input: {
        marginRight: '8px',
    },
    sendButton: {
        minWidth: '36px',
        padding: '6px',
    },
    minimizeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        minWidth: '30px',
        width: '30px',
        height: '30px',
        padding: 0,
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },
    visibleMinimize: {
        opacity: 1,
    },
    chatIcon: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        transition: 'opacity 0.3s ease',
        zIndex: 1000,
    },
};

const ChatBot = (stationName) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    // const [stationName, setStationName] = useState('');
    const [chatState, setChatState] = useState('minimized'); // 'minimized', 'expanding', 'expanded', 'shrinking'
    const [isContentVisible, setIsContentVisible] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages(prev => [{ text: input, isUser: true }, ...prev]);

        // alert("Station Name: " + stationName.stationName);
        const Realname = stationName.stationName;
        const payload = { stationName: Realname , question: input };
        console.log("Payload:", payload);

        try {
            const response = await axios.post('/chatbot', payload);
            setInput('');
            // alert("Response: " + JSON.stringify(response.data));
        } catch (error) {
            console.error('Error sending message:', error);
            setInput('');
        }

        //sleep 2 second
        await new Promise(r => setTimeout(r, 5000));

        axios
            .get("/getData")
            .then((res) => {
                setMessages(prev => [{ text: res.data.number, isUser: false }, ...prev]);
            })
            .catch((err) => {
                console.log(err);
            });

        setInput('');
    };

    const toggleChat = () => {
        if (chatState === 'expanded') {
            setIsContentVisible(false);
            setChatState('shrinking');
            setTimeout(() => {
                setChatState('minimized');
            }, 500);
        } else if (chatState === 'minimized') {
            setChatState('expanding');
            setTimeout(() => {
                setChatState('expanded');
                setIsContentVisible(true);
            }, 50);
        }
    };

    const chatStyle = () => {
        switch (chatState) {
            case 'expanded':
                return {...styles.chatContainer, ...styles.expandedChat};
            case 'shrinking':
                return {...styles.chatContainer, ...styles.shrinkingChat};
            case 'minimized':
                return {...styles.chatContainer, ...styles.minimizedChat};
            default:
                return styles.chatContainer;
        }
    };

    return (
        <>
            <Paper sx={chatStyle()} elevation={chatState !== 'minimized' ? 3 : 0}>
                {chatState !== 'minimized' && (
                    <>
                        <Button 
                            onClick={toggleChat} 
                            sx={{
                                ...styles.minimizeButton,
                                ...(isContentVisible ? styles.visibleMinimize : {})
                            }}
                        >
                            <MinimizeIcon fontSize="small" />
                        </Button>
                        <Box 
                            sx={{
                                ...styles.messagesContainer,
                                ...(isContentVisible ? styles.visibleMessages : {})
                            }}
                        >
                            <div ref={messagesEndRef} />
                            {messages.map((message, index) => (
                                <Box
                                    key={index}
                                    sx={styles.messageWrapper}
                                    flexDirection={message.isUser ? 'row-reverse' : 'row'}
                                >
                                    <Avatar sx={styles.avatar}>
                                        {message.isUser ? <PersonIcon /> : <SmartToyIcon />}
                                    </Avatar>
                                    <Box
                                        sx={{
                                            ...styles.message,
                                            ...(message.isUser ? styles.userMessage : styles.botMessage),
                                        }}
                                    >
                                        <Typography variant="body2">{message.text}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Box 
                            sx={{
                                ...styles.inputContainer,
                                ...(isContentVisible ? styles.visibleInputs : {})
                            }} 
                            component="form" 
                            onSubmit={handleSubmit}
                        >
                            {/* <TextField
                                size="small"
                                variant="outlined"
                                value={stationName}
                                onChange={(e) => setStationName(e.target.value)}
                                placeholder="Station name"
                                sx={styles.input}
                            /> */}
                            <TextField
                                size="small"
                                fullWidth
                                variant="outlined"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                sx={styles.input}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={styles.sendButton}
                            >
                                <SendIcon fontSize="small" />
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
            {chatState === 'minimized' && (
                <Fab 
                    color="primary" 
                    aria-label="chat" 
                    onClick={toggleChat} 
                    sx={styles.chatIcon}
                >
                    <ChatIcon />
                </Fab>
            )}
        </>
    );
};

export default ChatBot;