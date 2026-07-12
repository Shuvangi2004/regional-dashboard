import React, { useState, useEffect } from 'react';

// Sample Dashboard Component
function Dashboard({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Navigation Bar */}
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Manager Regional Portal</h1>
            <p className="text-slate-500 text-sm">Welcome back, <span className="font-semibold text-slate-700">{user.email}</span></p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition"
          >
            Log Out
          </button>
        </header>

        {/* Dashboard Main Content */}
        <main className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center py-16">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Regional Request Audit Trail</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Your interactive dashboard components go here! (You can paste your table or regional filters inside this section).
          </p>
        </main>
      </div>
    </div>
  );
}

// Main App Component with Authentication Logic
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check if user was previously logged in on page refresh
  useEffect(() => {
    const savedUser = localStorage.getItem('isLoggedIn');
    if (savedUser === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple mock validation (Accepts any email with password: 'password123' or non-empty password)
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Success login
    setError('');
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  };

  const storedEmail = localStorage.getItem('userEmail') || email || 'manager@region.com';

  return (
    <div>
      {!isAuthenticated ? (
        /* Login Page View */
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-xl mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Portal Login</h1>
              <p className="text-slate-500 text-sm">Sign in to access regional manager approvals</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="manager@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-200 text-sm"
              >
                Sign In to Dashboard
              </button>
            </form>

            <p className="text-center text-xs text-slate-400">
              Demo Mode: Enter any valid email & password (6+ chars)
            </p>
          </div>
        </div>
      ) : (
        /* Protected Dashboard View */
        <Dashboard user={{ email: storedEmail }} onLogout={handleLogout} />
      )}
    </div>
  );
}