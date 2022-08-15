import { HitmanTypes } from "global.d";

type AuthState = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  email: string | undefined;
  hitman_type: HitmanTypes | undefined;
  id: number | undefined;
};

interface AuthContextProps {
  authState: AuthState;
  dispatchAuthState: (action: IAuthAction) => void;
}

enum AuthActions {
  DO_LOGOUT = "DO_LOGOUT",
  SET_AUTH = "SET_AUTH",
  SET_INITIAL_STATE = "SET_INITIAL_STATE",
  SET_PROFILE = "SET_PROFILE",
}

type IAuthAction =
  | { type: AuthActions.DO_LOGOUT }
  | {
      value: AuthState;
      type: AuthActions.SET_INITIAL_STATE;
    }
  | {
      value: Partial<AuthState>;
      type: AuthActions.SET_AUTH;
    }
  | {
      value: Partial<AuthState>;
      type: AuthActions.SET_PROFILE;
    };

export { AuthContextProps, AuthState, AuthActions, IAuthAction };
