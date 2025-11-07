import React from 'react';
import Icon from './Icon';

const Header: React.FC = () => {
  return (
    <header className="flex items-center p-4 bg-gray-800 text-white shadow-md border-b border-gray-700">
      <Icon icon="bot" className="w-8 h-8 text-blue-400 mr-3" />
      <h1 className="text-xl font-bold">วินัยประจำปี</h1>
    </header>
  );
};

export default Header;