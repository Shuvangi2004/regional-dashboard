import React, { useState, useEffect } from 'react';

// Initial Mock Requests Data
const initialRequests = [
  { id: '#101', region: 'North', leader: 'Aarav Sharma', description: 'Budget approval for Q3 event marketing drive', date: '2026-07-01', status: 'PENDING' },
  { id: '#102', region: 'North', leader: 'Aarav Sharma', description: 'New laptop requisition for team lead position', date: '2026-06-25', status: 'APPROVED' },
  { id: '#103', region: 'South', leader: 'Priya Nair', description: 'Venue booking advance payment for annual meetup', date: '2026-07-05', status: 'APPROVED' },
  { id: '#104', region: 'West', leader: 'Rohan Mehta', description: 'Travel allowance reimbursement for site visits', date: '2026-07-10', status: 'PENDING' },
  { id: '#105', region: 'South', leader: 'Priya Nair', description: 'Sponsorship tier upgrade request for regional expo', date: '2026-07-11', status: 'PENDING' },
  { id: '#106', region: 'East', leader: 'Ananya Roy', description: 'Logistics vendor retainer renewal', date: '2026-07-09', status: 'APPROVED' },
];

// Dashboard Component with Full Table & Filters
function Dashboard({ user, onLogout }) {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRegion, setSelectedRegion] = useState('All regions');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter requests based on selected region and search query
  const filteredRequests = requests.filter((req) => {
    const matchesRegion = selectedRegion === 'All regions' || req.region === selectedRegion;
    const matchesSearch =
      req.leader.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  // Toggle status between APPROVED and PENDING
  const handleToggleStatus = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: req.status === 'PENDING' ? 'APPROVED' : 'PENDING' }
          : req
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manager Regional Portal</h1>
            <p className="text-slate-500 text-sm">
              Logged in as: <span className="font-semibold text-slate-700">{user.email}</span>
            </p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition"
          >
            Log Out
          </button>
        </header>

        {/* Audit Trail Section */}
        <main className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Request Audit Trail</h2>
              <p className="text-xs text-slate-500">Track team leader submissions and issue approvals</p>
            </div>

            {/* Controls: Search & Region Filter */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search region, leader..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
              />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="All regions">All regions</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Region</th>
                  <th className="py-3 px-4">Team Leader</th>
                  <th className="py-3 px-4">Request Description</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Manager Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-3 px-4 text-slate-400 font-medium text-xs">{req.id}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{req.region}</td>
                      <td className="py-3 px-4 text-slate-700">{req.leader}</td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{req.description}</td>
                      <td className="py-3 px-4 text-slate-400 text-xs">{req.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-full tracking-wider ${
                            req.status === 'APPROVED'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                              : 'bg-rose-50 text-rose-600 border border-rose-200'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleToggleStatus(req.id)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                            req.status === 'PENDING'
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                          }`}
                        >
                          {req.status === 'PENDING' ? 'Approve' : 'Revert'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-400 text-sm">
                      No matching regional requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="text-right text-xs text-slate-400">
            Showing {filteredRequests.length} of {requests.length} entries
          </div>
        </main>
      </div>
    </div>
  );
}

// Authentication Controller
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('isLoggedIn');
    if (savedUser === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

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
        <Dashboard user={{ email: storedEmail }} onLogout={handleLogout} />
      )}
    </div>
  );
}