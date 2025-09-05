// Demo authentication system for Netlify deployment
// This provides a fallback when the database is not available

export interface DemoUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'participant' | 'organizer' | 'recruiter' | 'sponsor';
  createdAt: number;
  updatedAt: number;
}

export interface DemoAuthResponse {
  success: boolean;
  user?: DemoUser;
  token?: string;
  message: string;
  error?: string;
}

// Demo users for testing
const DEMO_USERS: DemoUser[] = [
  {
    id: 'demo-participant-1',
    email: 'participant@demo.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'participant',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'demo-organizer-1',
    email: 'organizer@demo.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'organizer',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'demo-recruiter-1',
    email: 'recruiter@demo.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'recruiter',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'demo-sponsor-1',
    email: 'sponsor@demo.com',
    firstName: 'Sarah',
    lastName: 'Wilson',
    role: 'sponsor',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

// Simple token generation for demo
function generateDemoToken(userId: string): string {
  return `demo-token-${userId}-${Date.now()}`;
}

// Demo signup
export async function demoSignup(userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'participant' | 'organizer' | 'recruiter' | 'sponsor';
}): Promise<DemoAuthResponse> {
  // Check if user already exists
  const existingUser = DEMO_USERS.find(user => user.email === userData.email);
  if (existingUser) {
    return {
      success: false,
      error: 'Email already exists',
      message: 'A user with this email already exists'
    };
  }

  // Create new demo user
  const newUser: DemoUser = {
    id: `demo-${userData.role}-${Date.now()}`,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    role: userData.role,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  DEMO_USERS.push(newUser);

  const token = generateDemoToken(newUser.id);

  return {
    success: true,
    user: newUser,
    token,
    message: 'Demo user created successfully'
  };
}

// Demo signin
export async function demoSignin(email: string, password: string, role: string): Promise<DemoAuthResponse> {
  // Find user by email
  const user = DEMO_USERS.find(u => u.email === email);
  
  if (!user) {
    return {
      success: false,
      error: 'Invalid email or password',
      message: 'No user found with this email'
    };
  }

  // Check role match
  if (user.role !== role) {
    return {
      success: false,
      error: 'Invalid role for this account',
      message: 'This account is not associated with the selected role'
    };
  }

  // In demo mode, any password works
  const token = generateDemoToken(user.id);

  return {
    success: true,
    user,
    token,
    message: 'Demo sign in successful'
  };
}

// Demo token verification
export async function demoVerifyToken(token: string): Promise<DemoAuthResponse> {
  // Simple token validation for demo
  if (!token || !token.startsWith('demo-token-')) {
    return {
      success: false,
      error: 'Invalid token',
      message: 'Invalid or expired token'
    };
  }

  // Extract user ID from token
  const parts = token.split('-');
  if (parts.length < 3) {
    return {
      success: false,
      error: 'Invalid token format',
      message: 'Invalid token format'
    };
  }

  const userId = parts.slice(2, -1).join('-'); // Everything between 'demo-token-' and timestamp
  const user = DEMO_USERS.find(u => u.id === userId);

  if (!user) {
    return {
      success: false,
      error: 'User not found',
      message: 'User associated with this token not found'
    };
  }

  return {
    success: true,
    user,
    message: 'Token is valid'
  };
}

// Demo logout (no-op in demo mode)
export async function demoLogout(token: string): Promise<DemoAuthResponse> {
  return {
    success: true,
    message: 'Demo logout successful'
  };
}
