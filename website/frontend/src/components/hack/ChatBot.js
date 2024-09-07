import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import axios from 'axios';

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
  messagesContainer: {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#f5f5f5',
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
};

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [stationName, setStationName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isUser: true }]);

    try {
      const response = await axios.post('/chatbot', { question: input, stationName });
      setMessages(prev => [...prev, { text: response.data.response, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { text: 'Sorry, there was an error processing your request.', isUser: false }]);
    }

    setInput('');
  };

  return (
    <Paper sx={styles.chatContainer} elevation={0}>
      <Box sx={styles.messagesContainer}>
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
  );
};

export default ChatBot;