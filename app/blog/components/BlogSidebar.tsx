import React, { ReactNode } from 'react';

interface BlogSidebarProps {
  children: ReactNode;
}

export default function BlogSidebar({ children }: BlogSidebarProps) {
  return (
    <aside className="bg-white rounded-lg shadow-md p-6">
      {children}
    </aside>
  );
} 