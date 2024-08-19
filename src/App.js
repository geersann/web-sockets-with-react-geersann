import "./App.css";

// Note: please, do not change the next things:
// - name of App prop,
// - placeholder and aria-label values
// - text on the button

import React, { useState, useEffect } from 'react';
import "./App.css";

function App({ ws }) {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState('');

  useEffect(() => {
    ws.onmessage = (event) => {
      setChat((prevChat) => prevChat + event.data + '\n');
    };
  }, [ws]);

  const handleSendMessage = () => {
    if (nickname && message) {
      const formattedMessage = `${nickname}: ${message}`;
      ws.send(formattedMessage);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Web Sockets</h1>
      <div>
        <textarea
          rows="30"
          cols="60"
          readOnly
          aria-label="chat"
          value={chat}
        />
      </div>
      <input
        placeholder="Your nickname"
        size="11"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        placeholder="Type your message"
        size="40"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default App;