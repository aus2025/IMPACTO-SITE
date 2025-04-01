'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-blue max-w-none">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          // Renders code blocks with syntax highlighting
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={tomorrow}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // Custom styling for headings
          h1: ({ node, ...props }) => (
            <h1 
              className="text-3xl font-bold mb-4 mt-8 text-gray-900" 
              {...props} 
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 
              className="text-2xl font-bold mb-3 mt-6 text-gray-900" 
              {...props} 
            />
          ),
          h3: ({ node, ...props }) => (
            <h3 
              className="text-xl font-bold mb-3 mt-5 text-gray-900" 
              {...props} 
            />
          ),
          // Custom styling for links
          a: ({ node, ...props }) => (
            <a 
              className="text-blue-600 hover:text-blue-800 underline" 
              {...props} 
            />
          ),
          // Custom styling for block quotes
          blockquote: ({ node, ...props }) => (
            <blockquote 
              className="border-l-4 border-blue-500 pl-4 py-1 italic text-gray-700" 
              {...props} 
            />
          ),
          // Custom styling for images
          img: ({ node, ...props }) => (
            <img 
              className="rounded-md my-8 max-w-full h-auto" 
              {...props} 
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 