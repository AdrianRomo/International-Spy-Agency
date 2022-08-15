import React from "react";
import { Switch, Route } from "react-router-dom";

import { Login } from "views/login";
import { Logout } from "views/logout";
import { Register } from "views/register";
import { Hitmen } from "views/hitmen";
import { Hits } from "views/hits";
import { CreateHit } from "views/create-hit";
import { DetailHit } from "views/detail-hit";
import { DetailHitman } from "views/detail-hitman";
import { AuthProvider } from "contexts/AuthContext";
import { Profile } from "./profile";

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/hits" exact component={Hits} />
        <Route path="/hits/create" exact component={CreateHit} />
        <Route path="/hits/:id" exact component={DetailHit} />
        <Route path="/hitmen" exact component={Hitmen} />
        <Route path="/hitmen/:id" exact component={DetailHitman} />
        <Route path="/home" component={Hits} />
        <Route path="/" component={Login} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
