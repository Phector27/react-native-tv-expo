import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

export default function Account() {
  const [login, setLogin] = useState(null);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     !user ? setLogin(false) : setLogin(true);
  //   });
  // }, []);

  if (login === !null) return <Loading isVisible={true} text="Loading..." />;

  return login ? <UserLogged /> : <UserGuest />;
}
