import React, {createContext, useContext, useState} from 'react';
import {TUserContext} from '../types/context/userProvider.types';

const UserContext = createContext<TUserContext>({
  user: undefined,
  setUser: () => {},
});

export default function UserProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserInfo = (): TUserContext => useContext(UserContext);
