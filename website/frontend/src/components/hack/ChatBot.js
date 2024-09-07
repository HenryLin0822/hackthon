import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import axios from "../axios";

const styles = {
    chatContainer: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '350px',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
    },
    minimizedChat: {
        width: '60px',
        height: '60px',
    },
    messagesContainer: {
        flexGrow: 1,
        overflowY: 'auto',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column-reverse',
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
    },
};

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [stationName, setStationName] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages(prev => [{ text: input, isUser: true }, ...prev]);

        const payload = { stationName, question: input };
        console.log("Payload:", payload);

        try {
            const response = await axios.post('/chatbot', payload);
            const res = await axios.get("/getData");
            setMessages(prev => [{ text: res.data.number, isUser: false }, ...prev]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput('');
    };

    const toggleChat = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box>
            {!isExpanded && (
                <Fab color="primary" aria-label="chat" onClick={toggleChat} sx={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                    <ChatIcon />
                </Fab>
            )}
            {isExpanded && (
                <Paper sx={{...styles.chatContainer, ...(isExpanded ? {} : styles.minimizedChat)}} elevation={3}>
                    <Button onClick={toggleChat} sx={styles.minimizeButton}>
                        <CloseIcon />
                    </Button>
                    <Box sx={styles.messagesContainer}>
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
                    <Box sx={styles.inputContainer} component="form" onSubmit={handleSubmit}>
                        <TextField
                            size="small"
                            variant="outlined"
                            value={stationName}
                            onChange={(e) => setStationName(e.target.value)}
                            placeholder="Station name"
                            sx={styles.input}
                        />
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
                </Paper>
            )}
        </Box>
    );
};

export default ChatBot; 