import React from "react";

const useGetUserId = () => {
  return window.localStorage.getItem("userId");
};

export default useGetUserId;
