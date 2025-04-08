'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';

export default function AuthDebug() {
  const [status, setStatus] = useState('Checking authentication...');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [authResponse, setAuthResponse] = useState<any>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [envVars, setEnvVars] = useState<{[key: string]: string | undefined}>({});
  const [middlewareInfo, setMiddlewareInfo] = useState<string>('Checking for middleware...');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // Check current auth state
    checkAuth();
    
    // Check environment variables
    checkEnvVars();
    
    // Check middleware info
    checkMiddleware();
  }, []);

  const checkEnvVars = () => {
    setEnvVars({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
        ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 5)}...` 
        : undefined,
    });
  };
  
  const checkMiddleware = async () => {
    try {
      // Try to fetch the middleware.js file
      const response = await fetch('/middleware.js', { 
        method: 'HEAD',
        cache: 'no-store'
      });
      
      if (response.ok) {
        setMiddlewareInfo('Middleware file detected - likely causing redirects');
      } else if (response.status === 404) {
        setMiddlewareInfo('No middleware file directly accessible');
      } else {
        setMiddlewareInfo(`Middleware check returned status: ${response.status}`);
      }
    } catch (err) {
      setMiddlewareInfo('Could not check for middleware file');
    }
  };

  const checkAuth = async () => {
    try {
      setStatus('Checking current session...');
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }
      
      setStatus(data.session ? 'Authenticated' : 'Not authenticated');
      
      if (data.session) {
        const { data: userData } = await supabase.auth.getUser();
        setUser(userData.user);
      }
    } catch (err: any) {
      setStatus('Error checking auth');
      setError(err.message || 'Unknown error');
    }
  };

  const handleTestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Attempting login...');
    setError(null);
    setAuthResponse(null);
    
    try {
      const response = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      setAuthResponse(response);
      
      if (response.error) {
        setStatus('Login failed');
        setError(response.error.message);
      } else {
        setStatus('Login successful');
        setUser(response.data.user);
      }
    } catch (err: any) {
      setStatus('Login error');
      setError(err.message || 'Unknown error');
    }
  };

  const handleSignOut = async () => {
    setStatus('Signing out...');
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      setStatus('Sign out error');
      setError(error.message);
    } else {
      setStatus('Signed out');
      setUser(null);
    }
    
    await checkAuth();
  };
  
  const handleDirectNavigation = () => {
    window.location.href = '/admin/dashboard';
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Supabase Auth Debug</h1>
        <p className="text-gray-600">Use this page to debug authentication issues</p>
      </div>
      
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
        <p className="font-bold">Middleware Status:</p>
        <p>{middlewareInfo}</p>
        <p className="text-sm mt-2">
          If middleware is redirecting you from admin pages, you need to create a Supabase user first and then login 
          with that user before accessing admin pages.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Auth Status</h2>
          <div className="mb-4">
            <div className={`px-4 py-3 rounded ${
              status === 'Authenticated' 
                ? 'bg-green-100 text-green-800' 
                : status.includes('Error') || status === 'Login failed'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
            }`}>
              <p className="font-medium">{status}</p>
              {error && <p className="text-sm mt-1">{error}</p>}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Environment Variables</h3>
            <div className="bg-gray-100 p-3 rounded text-sm">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="mb-1">
                  <strong>{key}:</strong> {value || 'Not set'}
                </div>
              ))}
            </div>
          </div>
          
          {user && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">User Info</h3>
              <div className="bg-gray-100 p-3 rounded">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at).toLocaleString()}</p>
              </div>
            </div>
          )}
          
          {user ? (
            <div className="space-y-3">
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Sign Out
              </button>
              
              <button
                onClick={handleDirectNavigation}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Go To Dashboard
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Not currently authenticated
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test Authentication</h2>
          
          <form onSubmit={handleTestLogin} className="mb-4">
            <div className="mb-3">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Test Login
            </button>
          </form>
          
          <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
            <h3 className="font-medium mb-2">Create a Supabase User</h3>
            <p className="mb-2">
              If you haven't created a user yet, you need to do so in the Supabase dashboard:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Go to the Supabase dashboard</li>
              <li>Navigate to Authentication &gt; Users</li>
              <li>Click "Add User" or "Invite"</li>
              <li>Enter an email and password</li>
              <li>Return here and login with those credentials</li>
            </ol>
          </div>
          
          {authResponse && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Auth Response</h3>
              <pre className="bg-gray-100 p-3 rounded text-xs whitespace-pre-wrap overflow-auto max-h-64">
                {JSON.stringify(authResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex space-x-4">
        <Link href="/admin/login" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Go to Login
        </Link>
        <Link href="/" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Home
        </Link>
      </div>
    </div>
  );
} 