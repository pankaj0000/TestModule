import {Dispatch, SetStateAction} from 'react';

export type TUserContext = {
  user: TUser | undefined;
  setUser: Dispatch<SetStateAction<TUser>>;
};

type TUser = {
  email: string;
  uid: string;
};
