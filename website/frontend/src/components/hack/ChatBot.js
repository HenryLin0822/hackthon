import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [stationName, setStationName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message to chat
        setMessages(prev => [...prev, { text: input, isUser: true }]);

        console.log("stationName: ", stationName);
        console.log("input: ", input);

        try {
            alert("firsy");
            const response = await 
                axios
                    .post('/chatbot', { question: input, stationName });

            // Add bot response to chat
            setMessages(prev => [...prev, { text: response.data.response, isUser: false }]);
        } catch (error) {
            alert("error");
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { text: 'Sorry, there was an error processing your request.', isUser: false }]);
        }

        setInput('');
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow overflow-auto p-4">
                {messages.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            {message.text}
                        </span>
                    </div>
                ))}
            </div>
            <div className="p-4">
                <input
                    type="text"
                    value={stationName}
                    onChange={(e) => setStationName(e.target.value)}
                    placeholder="Enter station name"
                    className="w-full p-2 mb-2 border rounded"
                />
                <form onSubmit={handleSubmit} className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow p-2 border rounded-l"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;