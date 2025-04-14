'use client';

import React, { useState } from 'react';
import { MessageData } from '../../types';

interface MessageFormProps {
  data: MessageData;
  onChange: (data: MessageData) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ data, onChange }) => {
  const [message, setMessage] = useState<string>(data.message || '');
  const [charCount, setCharCount] = useState<number>(data.message ? data.message.length : 0);
  const MAX_CHARS = 300;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    if (newMessage.length <= MAX_CHARS) {
      setMessage(newMessage);
      setCharCount(newMessage.length);
      onChange({ message: newMessage });
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Text Message QR Code</h4>
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Create a QR code that contains a text message (up to 300 characters). This can be scanned and read directly without requiring internet access.
        </p>
      </div>

      <div>
        <label htmlFor="message-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Enter Message
        </label>
        <textarea
          id="message-input"
          value={message}
          onChange={handleMessageChange}
          rows={6}
          placeholder="Enter your message here (max 300 characters)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${charCount > MAX_CHARS * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/{MAX_CHARS} characters
          </span>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Tips for Text Message QR Codes</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1 list-disc pl-4">
          <li>Keep your message concise and to the point.</li>
          <li>Avoid using special characters that might not be supported by all QR code scanners.</li>
          <li>Consider including contact information if you want recipients to be able to respond.</li>
          <li>For longer messages, consider using a URL QR code that links to a webpage with your full message.</li>
        </ul>
      </div>
    </div>
  );
};

export default MessageForm;
