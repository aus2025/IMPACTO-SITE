'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Info } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isHtml?: boolean;
  timestamp?: number;
}

interface N8NResponse {
  cleaned_output: string;
}

// Get webhook URL from environment variables or use fallback for development
const CHATBOT_WEBHOOK_URL = process.env.NEXT_PUBLIC_CHATBOT_WEBHOOK_URL || 
  'https://n8n.srv783503.hstgr.cloud/webhook/550ce096-c2d6-4b09-84fb-ab963848319b';

// Get Supabase credentials
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initial welcome message
const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: 'Hello! I\'m your automation assistant. How can I help you today?',
  isHtml: false,
  timestamp: Date.now()
};

// LocalStorage key for chat session ID
const SESSION_ID_KEY = 'impacto_chat_session_id';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [supabase, setSupabase] = useState<any>(null);
  const [debug, setDebug] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Supabase client
  useEffect(() => {
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      console.log('Initializing Supabase client with URL:', SUPABASE_URL.substring(0, 10) + '...');
      const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      setSupabase(supabaseClient);
      console.log('Supabase client initialized successfully');
    } else {
      console.error('Missing Supabase credentials!', {
        hasUrl: !!SUPABASE_URL,
        hasKey: !!SUPABASE_ANON_KEY
      });
    }
  }, []);

  // Initialize or retrieve session ID
  useEffect(() => {
    const getOrCreateSessionId = () => {
      if (typeof window !== 'undefined') {
        let storedSessionId = localStorage.getItem(SESSION_ID_KEY);
        
        if (!storedSessionId) {
          // Create a new session ID if none exists
          storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          localStorage.setItem(SESSION_ID_KEY, storedSessionId);
        }
        
        setSessionId(storedSessionId);
        return storedSessionId;
      }
      return '';
    };
    
    const sid = getOrCreateSessionId();
    
    // Fetch chat history from Supabase if session ID exists
    if (sid && supabase) {
      fetchChatHistoryFromSupabase(sid);
    }
  }, [supabase]);

  // Fetch chat history from Supabase
  const fetchChatHistoryFromSupabase = async (sid: string) => {
    try {
      console.log('Fetching chat history for session:', sid);
      const { data, error } = await supabase
        .from('chatbot_history')
        .select('*')
        .eq('session_id', sid)
        .single();
      
      if (error) {
        console.error('Error fetching chat history:', error);
        setMessages([WELCOME_MESSAGE]);
        return;
      }
      
      if (data && data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
        console.log('Found chat history:', data.messages.length, 'messages');
        setMessages(data.messages);
      } else {
        console.log('No chat history found, using welcome message');
        setMessages([WELCOME_MESSAGE]);
      }
    } catch (err) {
      console.error('Error fetching chat history from Supabase:', err);
      setMessages([WELCOME_MESSAGE]);
    }
  };

  // Save chat history to Supabase
  const saveChatHistoryToSupabase = async () => {
    if (!sessionId || !supabase || messages.length === 0) return;
    
    try {
      console.log('Saving chat history for session:', sessionId);
      
      // First check if this session exists
      const { data: existingSession, error: checkError } = await supabase
        .from('chatbot_history')
        .select('id')
        .eq('session_id', sessionId)
        .single();
      
      const metadata = {
        last_message: messages[messages.length - 1].content,
        message_count: messages.length,
        last_updated: new Date().toISOString()
      };
      
      if (checkError || !existingSession) {
        console.log('Creating new chat session');
        // Create new session
        const { error: insertError } = await supabase
          .from('chatbot_history')
          .insert({
            session_id: sessionId,
            messages: messages,
            metadata: metadata
          });
        
        if (insertError) {
          console.error('Error saving chat history:', insertError);
        } else {
          console.log('Successfully created new chat session');
        }
      } else {
        console.log('Updating existing chat session');
        // Update existing session
        const { error: updateError } = await supabase
          .from('chatbot_history')
          .update({
            messages: messages,
            metadata: metadata
          })
          .eq('session_id', sessionId);
        
        if (updateError) {
          console.error('Error updating chat history:', updateError);
        } else {
          console.log('Successfully updated chat session');
        }
      }
    } catch (err) {
      console.error('Error saving chat history to Supabase:', err);
    }
  };

  // Save messages to Supabase when they change
  useEffect(() => {
    if (sessionId && supabase && messages.length > 0) {
      saveChatHistoryToSupabase();
    }
  }, [messages, sessionId, supabase]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  // Show welcome message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([WELCOME_MESSAGE]);
    }
  }, [isOpen, messages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage,
      timestamp: Date.now()
    }]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch(CHATBOT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Validate the response format
      if (!data || typeof data !== 'object' || !data.cleaned_output) {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format from server');
      }

      const { cleaned_output } = data;

      // Add a small delay to simulate typing
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: cleaned_output,
          isHtml: true,
          timestamp: Date.now()
        }]);
      }, 1000);
    } catch (error) {
      console.error('Error in chatbot:', error);
      let errorMessage = 'Sorry, there was an error connecting to the service. Please try again later.';
      
      if (error instanceof Error) {
        if (error.message.includes('Invalid response format')) {
          errorMessage = 'The assistant is currently unavailable. Please try again in a moment.';
        }
      }

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: errorMessage,
          timestamp: Date.now()
        }]);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChatHistory = () => {
    // Create a new session when clearing chat
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(SESSION_ID_KEY, newSessionId);
    setSessionId(newSessionId);
    setMessages([WELCOME_MESSAGE]);
  };

  // Debug function for testing Supabase connection
  const testSupabaseConnection = async () => {
    setDebug('Testing Supabase connection...');
    
    if (!supabase) {
      setDebug('No Supabase client found! Check environment variables.');
      return;
    }
    
    try {
      // First check if we have valid credentials
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        setDebug('Missing Supabase credentials in environment variables!');
        return;
      }
      
      // Then try to query the table
      const { data, error } = await supabase
        .from('chatbot_history')
        .select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        // More informative error message
        setDebug(`Connection error: ${error.message}. Check your network and credentials.`);
      } else {
        setDebug(`Connected to Supabase! Table exists and is accessible.`);
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setDebug(`Unexpected error: ${errMsg}. Check browser console for details.`);
      console.error('Supabase connection test error:', err);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-96 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 p-3 flex justify-between items-center">
            <div className="flex items-center">
              <h3 className="font-semibold !text-white">Chat Assistant</h3>
              {messages.length > 1 && (
                <button 
                  onClick={clearChatHistory}
                  className="ml-2 text-xs text-white/70 hover:text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Clear Chat
                </button>
              )}
              <button 
                onClick={testSupabaseConnection}
                className="ml-2 text-xs text-white/70 hover:text-white p-1 rounded hover:bg-blue-700"
                title="Test Connection"
              >
                <Info size={14} />
              </button>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 rounded-full p-1 text-white">
              <X size={20} />
            </button>
          </div>
          
          {debug && (
            <div className="bg-yellow-50 border-b border-yellow-100 p-2 text-xs text-yellow-800">
              {debug}
            </div>
          )}
          
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  } ${message.role === 'assistant' ? 'max-w-full w-full' : ''}`}
                >
                  {message.isHtml ? (
                    <div 
                      dangerouslySetInnerHTML={{ __html: message.content }}
                      className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-800 prose-li:text-gray-800"
                    />
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-4 text-left">
                <div className="inline-block p-3 rounded-lg bg-gray-200">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageSquare size={24} />
        </button>
      )}

      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 2px;
          background-color: #6b7280;
          border-radius: 50%;
          display: inline-block;
          opacity: 0.6;
        }
        
        .typing-indicator span:nth-child(1) {
          animation: bounce 1s infinite;
        }
        
        .typing-indicator span:nth-child(2) {
          animation: bounce 1s infinite 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation: bounce 1s infinite 0.4s;
        }
        
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}
