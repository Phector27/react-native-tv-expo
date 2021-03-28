import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

export default function Account(props) {
  const [login, setLogin] = useState(false);

  // setLogin(userInfo ? setLogin(false) : setLogin(true))

  return login ? <UserLogged /> : <UserGuest />;
}
