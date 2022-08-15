import * as storage from "utils/localStorage";
import { StorageKeys } from "global.d";

import { AuthState, AuthActions, IAuthAction } from "./AuthContext.d";

const initialState: AuthState = {
  accessToken: undefined,
  refreshToken: undefined,
  email: "",
  hitman_type: undefined,
  id: undefined,
};

function AuthReducer(state: AuthState, action: IAuthAction) {
  switch (action.type) {
    case AuthActions.SET_INITIAL_STATE: {
      const authState: AuthState = action.value;

      return authState;
    }
    case AuthActions.SET_AUTH: {
      const { refreshToken, accessToken, email } = action.value;
      const objToStore: AuthState = {
        ...state,
        refreshToken,
        accessToken,
        email,
      };
      storage.setItem(StorageKeys.AUTH_STORAGE_KEY, objToStore);

      return objToStore;
    }
    case AuthActions.SET_PROFILE: {
      const { hitman_type, id, email } = action.value;
      const objToStore: AuthState = {
        ...state,
        hitman_type,
        email,
        id,
      };
      storage.setItem(StorageKeys.AUTH_STORAGE_KEY, objToStore);

      return objToStore;
    }
    case AuthActions.DO_LOGOUT: {
      storage.removeItem(StorageKeys.AUTH_STORAGE_KEY);

      return initialState;
    }
  }
}

export { initialState, AuthReducer };
