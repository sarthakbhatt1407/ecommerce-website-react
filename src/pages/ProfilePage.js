import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state) => state.userEmail);
  useEffect(() => {
    if (!email.length > 0) {
      history.push("/");
    }
    const localStr = JSON.parse(localStorage.getItem("state"));
    if (localStr) {
      dispatch({ type: "reload", item: { ...localStr } });
    }
  }, []);
  const logOut = () => {
    dispatch({ type: "logout" });
    history.push("/");
  };
  return (
    <div>
      <button onClick={logOut}>LogOut</button>
    </div>
  );
};

export default ProfilePage;
