"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export default function TestAuthPage() {
  const { user, isAuthenticated, isLoading, signin, signup, logout } = useAuth();
  const [testEmail, setTestEmail] = useState("participant@example.com");
  const [testPassword, setTestPassword] = useState("password123");
  const [testRole, setTestRole] = useState("participant");
  const [message, setMessage] = useState("");

  const handleTestSignin = async () => {
    setMessage("Testing signin...");
    try {
      const result = await signin({
        email: testEmail,
        password: testPassword,
        role: testRole as any,
      });
      
      if (result.success) {
        setMessage("✅ Signin successful!");
      } else {
        setMessage(`❌ Signin failed: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Signin error: ${error}`);
    }
  };

  const handleTestLogout = async () => {
    setMessage("Testing logout...");
    try {
      await logout();
      setMessage("✅ Logout successful!");
    } catch (error) {
      setMessage(`❌ Logout error: ${error}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FAF000]/20 border-t-[#FAF000] rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Authentication Test Page</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Auth State</h2>
          <p><strong>Is Authenticated:</strong> {isAuthenticated ? "✅ Yes" : "❌ No"}</p>
          <p><strong>User:</strong> {user ? `${user.firstName} ${user.lastName} (${user.email}) - ${user.role}` : "None"}</p>
          <p><strong>Loading:</strong> {isLoading ? "Yes" : "No"}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Credentials</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email:</label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password:</label>
              <input
                type="password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role:</label>
              <select
                value={testRole}
                onChange={(e) => setTestRole(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
              >
                <option value="participant">Participant</option>
                <option value="organizer">Organizer</option>
                <option value="recruiter">Recruiter</option>
                <option value="sponsor">Sponsor</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="space-x-4">
            <button
              onClick={handleTestSignin}
              className="bg-[#FFA100] hover:bg-[#FF9000] text-black px-4 py-2 rounded font-medium"
            >
              Test Signin
            </button>
            <button
              onClick={handleTestLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium"
            >
              Test Logout
            </button>
          </div>
        </div>

        {message && (
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test Result</h2>
            <p className="text-lg">{message}</p>
          </div>
        )}

        <div className="bg-gray-900 p-6 rounded-lg mt-6">
          <h2 className="text-xl font-semibold mb-4">Sample Accounts</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Participant:</strong> participant@example.com / password123</p>
            <p><strong>Organizer:</strong> organizer@example.com / password123</p>
            <p><strong>Recruiter:</strong> recruiter@example.com / password123</p>
            <p><strong>Sponsor:</strong> sponsor@example.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
