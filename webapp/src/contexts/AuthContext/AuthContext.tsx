import { createContext, useReducer } from "react";
import * as storage from "utils/localStorage";
import { StorageKeys } from "global.d";

import { AuthReducer, initialState } from "./AuthReducer";
import { AuthContextProps } from "./AuthContext.d";

const AuthContext = createContext<AuthContextProps>({
  authState: initialState,
  dispatchAuthState: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const storageState = storage.getItem(StorageKeys.AUTH_STORAGE_KEY);

  const stateToStore = Object.keys(storageState).length
    ? storageState
    : initialState;

  const [authState, dispatchAuthState] = useReducer(AuthReducer, stateToStore);

  return (
    <AuthContext.Provider value={{ authState, dispatchAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
