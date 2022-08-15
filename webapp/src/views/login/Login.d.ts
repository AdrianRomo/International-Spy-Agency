interface LoginSuccessReponse {
  data: {
    access: string;
    refresh: string;
  };
}

export { LoginFormValues, LoginSuccessReponse };
