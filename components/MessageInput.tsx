
import React from 'react';
import Icon from './Icon';

interface MessageInputProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  userInput,
  setUserInput,
  onSendMessage,
  isLoading,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage(e);
    }
  };

  return (
    <form
      onSubmit={onSendMessage}
      className="flex items-center p-4 bg-gray-800 border-t border-gray-700"
    >
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-grow px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
      />
      <button
        type="submit"
        disabled={isLoading || !userInput.trim()}
        className="ml-4 p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
      >
        <Icon icon="send" className="w-5 h-5" />
      </button>
    </form>
  );
};

export default MessageInput;
