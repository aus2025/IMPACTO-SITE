'use client';

import React from 'react';

interface DraggableItemProps {
  id: string;
  title: string;
  description: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, title, description }) => {
  return (
    <div className="bg-white border rounded-md p-4 shadow-md w-full max-w-md opacity-90">
      <h3 className="font-semibold text-md mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
};

export default DraggableItem; 