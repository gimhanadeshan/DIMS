import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    if (email === 'admin@gmail.com' && password === 'admin123') {
      setUser({
        id: '1',
        email: 'admin@gmail.com',
        role: 'admin',
        name: 'Admin User'
      });
      return true;
    } else if (email === 'user@gmail.com' && password === 'user123') {
      setUser({
        id: '2',
        email: 'user@gmail.com',
        role: 'user',
        name: 'Regular User'
      });
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock signup - in real app, this would call an API
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      email,
      role: 'user',
      name
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};