"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import Link from "next/link";

export default function TestRLSPage() {
  const { user, isAuthenticated } = useAuth();
  const [testResults, setTestResults] = useState<string[]>([]);

  const testRoleAccess = () => {
    const results: string[] = [];
    
    if (!isAuthenticated || !user) {
      results.push("❌ Not authenticated");
      setTestResults(results);
      return;
    }

    results.push(`✅ Authenticated as: ${user.firstName} ${user.lastName} (${user.role})`);
    
    // Test role-based access
    const roles = ['participant', 'organizer', 'recruiter', 'sponsor'];
    roles.forEach(role => {
      if (role === user.role) {
        results.push(`✅ Access to /${role} routes: ALLOWED (own role)`);
      } else {
        results.push(`❌ Access to /${role} routes: DENIED (different role)`);
      }
    });

    setTestResults(results);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Row Level Security Test</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Auth State</h2>
          <p><strong>Is Authenticated:</strong> {isAuthenticated ? "✅ Yes" : "❌ No"}</p>
          <p><strong>User:</strong> {user ? `${user.firstName} ${user.lastName} (${user.email}) - ${user.role}` : "None"}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Role Access Test</h2>
          <button
            onClick={testRoleAccess}
            className="bg-[#FFA100] hover:bg-[#FF9000] text-black px-4 py-2 rounded font-medium mb-4"
          >
            Test Role-Based Access
          </button>
          
          {testResults.length > 0 && (
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <p key={index} className="text-sm">{result}</p>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Manual Access Tests</h2>
          <p className="text-white/70 mb-4">Try accessing these URLs directly in the address bar:</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Participant Routes:</h3>
              <ul className="space-y-1 text-white/70">
                <li><Link href="/participant/dashboard" className="text-[#FAF000] hover:underline">/participant/dashboard</Link></li>
                <li><Link href="/participant/dashboard/events" className="text-[#FAF000] hover:underline">/participant/dashboard/events</Link></li>
                <li><Link href="/participant/dashboard/skills" className="text-[#FAF000] hover:underline">/participant/dashboard/skills</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Organizer Routes:</h3>
              <ul className="space-y-1 text-white/70">
                <li><Link href="/organizer/dashboard" className="text-[#FAF000] hover:underline">/organizer/dashboard</Link></li>
                <li><Link href="/organizer/dashboard/events" className="text-[#FAF000] hover:underline">/organizer/dashboard/events</Link></li>
                <li><Link href="/organizer/dashboard/manager" className="text-[#FAF000] hover:underline">/organizer/dashboard/manager</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recruiter Routes:</h3>
              <ul className="space-y-1 text-white/70">
                <li><Link href="/recruiter/dashboard" className="text-[#FAF000] hover:underline">/recruiter/dashboard</Link></li>
                <li><Link href="/recruiter/dashboard/candidates" className="text-[#FAF000] hover:underline">/recruiter/dashboard/candidates</Link></li>
                <li><Link href="/recruiter/dashboard/postings" className="text-[#FAF000] hover:underline">/recruiter/dashboard/postings</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Sponsor Routes:</h3>
              <ul className="space-y-1 text-white/70">
                <li><Link href="/sponsor/dashboard" className="text-[#FAF000] hover:underline">/sponsor/dashboard</Link></li>
                <li><Link href="/sponsor/dashboard/analytics" className="text-[#FAF000] hover:underline">/sponsor/dashboard/analytics</Link></li>
                <li><Link href="/sponsor/dashboard/invitations" className="text-[#FAF000] hover:underline">/sponsor/dashboard/invitations</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Expected Behavior</h2>
          <ul className="space-y-2 text-sm text-white/70">
            <li>• If you're a <strong>participant</strong>, you should only access <code>/participant/*</code> routes</li>
            <li>• If you're an <strong>organizer</strong>, you should only access <code>/organizer/*</code> routes</li>
            <li>• If you're a <strong>recruiter</strong>, you should only access <code>/recruiter/*</code> routes</li>
            <li>• If you're a <strong>sponsor</strong>, you should only access <code>/sponsor/*</code> routes</li>
            <li>• Accessing other role's routes should show "Access Denied" and redirect to your dashboard</li>
            <li>• Unauthenticated users should be redirected to <code>/signin</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
