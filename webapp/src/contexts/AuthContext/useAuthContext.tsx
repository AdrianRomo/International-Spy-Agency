import { Hitman } from "global";
import { useCallback, useContext, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import { AuthActions, AuthState } from "./AuthContext.d";

const useIsAuthenticated = ({ accessToken }: AuthState) => {
  return useMemo(() => {
    return accessToken !== undefined;
  }, [accessToken]);
};

const useIsValidAuthObject = ({ accessToken, hitman_type }: AuthState) => {
  return useMemo(() => {
    return accessToken !== undefined && hitman_type !== undefined;
  }, [accessToken, hitman_type]);
};

function useAuthContext() {
  const { authState, dispatchAuthState } = useContext(AuthContext);
  const isAuthenticated = useIsAuthenticated(authState);
  const isValidAuthObject = useIsValidAuthObject(authState);

  const doLogout = useCallback(() => {
    dispatchAuthState({
      type: AuthActions.DO_LOGOUT,
    });
  }, [dispatchAuthState]);

  const setAuth = useCallback(
    (accessToken: string, refreshToken: string) => {
      dispatchAuthState({
        type: AuthActions.SET_AUTH,
        value: { accessToken, refreshToken },
      });
    },
    [dispatchAuthState]
  );

  const setProfile = useCallback(
    ({ id, email, hitman_type }: Partial<Hitman>) => {
      dispatchAuthState({
        type: AuthActions.SET_PROFILE,
        value: { id, email, hitman_type },
      });
    },
    [dispatchAuthState]
  );

  return {
    authState,
    doLogout,
    isAuthenticated,
    isValidAuthObject,
    setAuth,
    setProfile,
  };
}

export { useAuthContext };
