// Simple frontend-only auth helper using localStorage

export type UserRole = "participant" | "organizer" | "recruiter" | "sponsor";

export interface MockUser {
  firstName?: string;
  lastName?: string;
  email: string;
  role: UserRole;
}

const STORAGE_KEY = "hackmate_auth_user";

export const auth = {
  login(user: MockUser) {
    if (!user?.email || !user?.role) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {}
  },

  logout() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  },

  getUser(): MockUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as MockUser) : null;
    } catch {
      return null;
    }
  },
};


