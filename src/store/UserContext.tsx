import React, { createContext, useEffect, useState } from 'react';

interface User {
  displayName: string;
}

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextProps {
  user: User | null;
  updateUser: (userData: User | null) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  updateUser: () => {
    throw new Error('updateUser 메소드가 구현되지 않았습니다.');
  },
});

export const UserProviderStore: React.FC<UserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 로그인 정보 복원
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (userData: User | null) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
