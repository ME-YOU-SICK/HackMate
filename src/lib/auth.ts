// Database-driven authentication system

export type UserRole = "participant" | "organizer" | "recruiter" | "sponsor";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
  error?: string;
}

const STORAGE_KEY = "hackmate_auth_token";
const USER_KEY = "hackmate_auth_user";

export const auth = {
  // Sign up a new user
  async signup(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  }): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      
      if (result.success) {
        // Store user data locally for immediate access
        try {
          localStorage.setItem(USER_KEY, JSON.stringify(result.user));
        } catch {}
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again.',
      };
    }
  },

  // Sign in an existing user
  async signin(credentials: {
    email: string;
    password: string;
    role: UserRole;
  }): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();
      
      if (result.success && result.token) {
        // Store token and user data
        try {
          localStorage.setItem(STORAGE_KEY, result.token);
          localStorage.setItem(USER_KEY, JSON.stringify(result.user));
        } catch {}
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again.',
      };
    }
  },

  // Sign out the current user
  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call success
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(USER_KEY);
      } catch {}
    }
  },

  // Get current user from local storage
  getUser(): User | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  },

  // Get current token
  getToken(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  },

  // Verify current session with server
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

      const result = await response.json();
      
      if (result.success && result.user) {
        // Update stored user data
        try {
          localStorage.setItem(USER_KEY, JSON.stringify(result.user));
        } catch {}
        return result.user;
      } else {
        // Token is invalid, clear storage
        this.logout();
        return null;
      }
    } catch (error) {
      console.error('Session verification error:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser();
  },

  // Legacy method for backward compatibility
  login(user: User) {
    // This is now handled by signin method
    console.warn('auth.login() is deprecated. Use auth.signin() instead.');
  },
};


