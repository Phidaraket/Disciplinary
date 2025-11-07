
import React from 'react';
import { Message, Role } from '../types';
import Icon from './Icon';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white self-end'
    : 'bg-gray-700 text-gray-200 self-start';
  
  const containerClasses = isUser
    ? 'justify-end'
    : 'justify-start';

  return (
    <div className={`flex items-end gap-2 w-full ${containerClasses}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <Icon icon="bot" className="w-5 h-5 text-gray-300" />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-2xl rounded-2xl px-4 py-3 ${bubbleClasses}`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
      {isUser && (
         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
          <Icon icon="user" className="w-5 h-5 text-gray-200" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
