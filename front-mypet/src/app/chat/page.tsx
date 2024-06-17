import React, { useState } from 'react';
import { Input, Button } from 'rsuite';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'me' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[85vh] p-4 bg-gray-100 max-w-md mx-auto shadow-md rounded-md">
      <div className="flex-grow overflow-y-auto p-4 bg-white rounded-md">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded-md max-w-xs ${
              message.sender === 'me' ? 'bg-green-200 ml-auto' : 'bg-gray-200 mr-auto'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center">
        <Input
          className="flex-grow"
          value={newMessage}
          onChange={(value: string) => setNewMessage(value)}
          placeholder="Type a message"
        />
        <Button appearance="primary" className="ml-2" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;