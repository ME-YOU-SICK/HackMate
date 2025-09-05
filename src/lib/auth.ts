// Simple localStorage-based authentication (no database)
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'participant' | 'organizer' | 'recruiter' | 'sponsor';
}

interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// Mock users for demo purposes
const mockUsers = [
  {
    id: '1',
    email: 'participant@demo.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'participant' as const,
  },
  {
    id: '2',
    email: 'organizer@demo.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'organizer' as const,
  },
  {
    id: '3',
    email: 'recruiter@demo.com',
    password: 'password123',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'recruiter' as const,
  },
  {
    id: '4',
    email: 'sponsor@demo.com',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Wilson',
    role: 'sponsor' as const,
  },
];

// Simple JWT-like token generation
function generateToken(userId: string): string {
  const payload = {
    userId,
    iat: Date.now(),
    exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

// Verify token
function verifyToken(token: string): { userId: string; valid: boolean } {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    
    if (payload.exp && Date.now() > payload.exp) {
      return { userId: '', valid: false };
    }
    
    return { userId: payload.userId, valid: true };
  } catch {
    return { userId: '', valid: false };
  }
}

export const auth = {
  // Sign in with email, password, and role
  async signin(credentials: { email: string; password: string; role: string }): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success && data.user && data.token) {
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return { success: true, user: data.user, token: data.token };
      } else {
        return { success: false, error: data.error || 'Sign in failed' };
      }
    } catch (error) {
      console.error('Signin error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  // Sign up new user
  async signup(userData: { email: string; password: string; firstName: string; lastName: string; role: string }): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success && data.user && data.token) {
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return { success: true, user: data.user, token: data.token };
      } else {
        return { success: false, error: data.error || 'Sign up failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      const token = this.getToken();
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },

  // Get current user from localStorage
  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      
      const user = JSON.parse(userStr);
      const token = this.getToken();
      
      if (!token) return null;
      
      // Verify token is still valid
      const { valid } = verifyToken(token);
      if (!valid) {
        this.logout();
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  },

  // Get token from localStorage
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  },

  // Verify session with server
  async verifySession(): Promise<User | null> {
    try {
      const token = this.getToken();
      if (!token) return null;

      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.user) {
        // Update localStorage with fresh user data
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
      } else {
        // Session is invalid, clear localStorage
        this.logout();
        return null;
      }
    } catch (error) {
      console.error('Verify session error:', error);
      this.logout();
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getUser();
  },
};