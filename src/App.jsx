import React, { useState } from 'react';

// INITIAL DATA MODEL
const INITIAL_DATA = {
  leaders: [
    { region: "North", leaderName: "Aarav Sharma", email: "aarav.s@company.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
    { region: "South", leaderName: "Priya Nair", email: "priya.n@company.com", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
    { region: "West", leaderName: "Rohan Mehta", email: "rohan.m@company.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
    { region: "East", leaderName: "Ananya Roy", email: "ananya.r@company.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
  ],
  requests: [
    { id: 101, region: "North", leader: "Aarav Sharma", requestText: "Budget approval for Q3 event marketing drive", date: "2026-07-01", status: "pending" },
    { id: 102, region: "North", leader: "Aarav Sharma", requestText: "New laptop requisition for team lead position", date: "2026-06-25", status: "approved" },
    { id: 103, region: "South", leader: "Priya Nair", requestText: "Venue booking advance payment for annual meetup", date: "2026-07-05", status: "approved" },
    { id: 104, region: "West", leader: "Rohan Mehta", requestText: "Travel allowance reimbursement for site visits", date: "2026-07-10", status: "pending" },
    { id: 105, region: "South", leader: "Priya Nair", requestText: "Sponsorship tier upgrade request for regional expo", date: "2026-07-11", status: "pending" },
    { id: 106, region: "East", leader: "Ananya Roy", requestText: "Logistics vendor retainer renewal", date: "2026-07-09", status: "approved" }
  ]
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [requests, setRequests] = useState(INITIAL_DATA.requests);

  // 1. FILTER LOGIC: Handles search bar input and dropdown selection
  const filteredRequests = requests.filter((req) => {
    const matchesRegionSelect =
      selectedRegion === "All" || req.region.toLowerCase() === selectedRegion.toLowerCase();

    const matchesSearchTerm =
      req.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.leader.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requestText.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRegionSelect && matchesSearchTerm;
  });

  // 2. LEADER MATCHING: Finds leader details for single region view
  const activeLeader = INITIAL_DATA.leaders.find(
    (l) => l.region.toLowerCase() === selectedRegion.toLowerCase() ||
           l.region.toLowerCase() === searchQuery.trim().toLowerCase()
  );

  // 3. ACTION HANDLER: Flip request status dynamically
  const handleStatusChange = (requestId, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      
      {/* HEADER SECTION */}
      <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Manager Regional Portal</h1>
            <p className="text-sm text-slate-500">Track team leader submissions and issue approvals</p>
          </div>

          {/* SEARCH & FILTER CONTROLS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search region, leader..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-60 pl-3 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
              />
            </div>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-medium text-slate-700"
            >
              <option value="All">All Regions</option>
              {INITIAL_DATA.leaders.map((item) => (
                <option key={item.region} value={item.region}>
                  {item.region} Region
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* TEAM LEADER CARD (Shows when specific region is active) */}
      {activeLeader && (
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-5 rounded-2xl shadow-md mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={activeLeader.avatar}
              alt={activeLeader.leaderName}
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-300"
            />
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-200">
                {activeLeader.region} Region Leader
              </span>
              <h2 className="text-xl font-bold">{activeLeader.leaderName}</h2>
            </div>
          </div>
          <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-indigo-100 font-mono hidden sm:inline-block">
            {activeLeader.email}
          </span>
        </div>
      )}

      {/* REQUEST HISTORY TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">Request Audit Trail</h3>
          <span className="text-xs font-medium bg-slate-200 text-slate-600 px-2.5 py-1 rounded-full">
            {filteredRequests.length} Entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">ID</th>
                <th className="p-4">Region</th>
                <th className="p-4">Team Leader</th>
                <th className="p-4">Request Description</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Manager Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-mono text-xs text-slate-400">#{req.id}</td>
                    <td className="p-4 font-semibold text-slate-700">{req.region}</td>
                    <td className="p-4 text-slate-600">{req.leader}</td>
                    <td className="p-4 text-slate-800 font-medium max-w-xs">{req.requestText}</td>
                    <td className="p-4 text-slate-400 text-xs">{req.date}</td>
                    <td className="p-4 text-center">
                      
                      {/* COLOR-CODED STATUS TAGS */}
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          req.status === "approved"
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : "bg-rose-100 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {req.status}
                      </span>

                    </td>
                    <td className="p-4 text-right">
                      {/* MANAGER ACTION BUTTONS */}
                      <div className="flex justify-end gap-2">
                        {req.status === "pending" ? (
                          <button
                            onClick={() => handleStatusChange(req.id, "approved")}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition"
                          >
                            Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(req.id, "pending")}
                            className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition"
                          >
                            Revert
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-slate-400">
                    No matching requests found for your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}