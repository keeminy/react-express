import axios from "axios";
import { useEffect } from "react";

const UserPage = () => {
  const getUser = () => {
    axios.get("http://localhost:8080/api/users").then((res) => {
      console.log("res", res);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return <div> sss</div>;
};

export default UserPage;
