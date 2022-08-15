import React from "react";
import { Link } from "react-router-dom";
import { NavBar, Menu, Logo } from "./Nav.styles";
import Image from "./images/logo.png";
import { useAuthContext } from "contexts/AuthContext";
import { HitmanTypes } from "global.d";

function NavItemsAutheticated() {
  const { authState } = useAuthContext();
  const { hitman_type } = authState;

  const showManagementLinks = [HitmanTypes.BOSS, HitmanTypes.MANAGER].includes(
    hitman_type as HitmanTypes
  );

  return (
    <>
      <Link to="/hits">Home</Link>
      <Link to="/hits">Targets</Link>

      {showManagementLinks && (
        <>
          <Link to="/hitmen">Hitmen</Link>
          <Link to="/hits/create">Assign Target</Link>
        </>
      )}

      <Link to="/logout">Logout</Link>
    </>
  );
}

function NavItemsGuest() {
  return (
    <>
      <Link to="/login">Login</Link>
      <Link to="/register">Sign Up</Link>
    </>
  );
}

function Nav() {
  const { isAuthenticated } = useAuthContext();

  return (
    <NavBar>
      <Logo src={Image} />
      <Menu>
        {isAuthenticated ? <NavItemsAutheticated /> : <NavItemsGuest />}
      </Menu>
    </NavBar>
  );
}

export { Nav };
