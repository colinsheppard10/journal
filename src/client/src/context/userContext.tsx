import React, { useState } from "react";

export enum LoginStatus {
  LOADING='LOADING',
  LOGGED_IN='LOGGED_IN',
  LOGGED_OUT='LOGGED_OUT'
}

interface UserContext {
  loginStatus: LoginStatus ;
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  locale: string | undefined;
  picture: string | undefined;
  updateUserContext: (update: any) => void;
}

export let defaultUserContext: UserContext = {
  loginStatus: LoginStatus.LOADING,
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  locale: undefined,
  picture: undefined,
  updateUserContext: (a) => {}
};

export const UserContext = React.createContext<UserContext>(defaultUserContext);
export const UserContextWrapper = ({ children }: any) => {
  let initialUserContext: UserContext = {
    ...defaultUserContext,
    updateUserContext: (update: any) => {
      console.log(`in updateUserContext ${update.loginStatus}`)
      setUserContext((currentUserContext) => {
        let newContext = { ...currentUserContext, ...update };
        return newContext;
      });
    },
  };
  const [userContext, setUserContext] = useState(initialUserContext);

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};
