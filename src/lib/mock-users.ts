// Simple in-memory storage for mock users
// In a real app, this would be a database

interface MockUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'participant' | 'organizer' | 'recruiter' | 'sponsor';
  createdAt: number;
}

// In-memory storage for users
let mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'participant@demo.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'participant',
    createdAt: Date.now(),
  },
  {
    id: '2',
    email: 'organizer@demo.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'organizer',
    createdAt: Date.now(),
  },
  {
    id: '3',
    email: 'recruiter@demo.com',
    password: 'password123',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'recruiter',
    createdAt: Date.now(),
  },
  {
    id: '4',
    email: 'sponsor@demo.com',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Wilson',
    role: 'sponsor',
    createdAt: Date.now(),
  },
];

export const mockUserStorage = {
  // Find user by email and password
  findByCredentials(email: string, password: string): MockUser | null {
    return mockUsers.find(user => user.email === email && user.password === password) || null;
  },

  // Find user by email only
  findByEmail(email: string): MockUser | null {
    return mockUsers.find(user => user.email === email) || null;
  },

  // Create new user
  create(userData: Omit<MockUser, 'id' | 'createdAt'>): MockUser {
    const newUser: MockUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    mockUsers.push(newUser);
    return newUser;
  },

  // Find user by ID (for token verification)
  findById(id: string): MockUser | null {
    return mockUsers.find(user => user.id === id) || null;
  },

  // Get all users (for debugging)
  getAll(): MockUser[] {
    return [...mockUsers];
  },

  // Clear all users (for testing)
  clear(): void {
    mockUsers = [];
  }
};
