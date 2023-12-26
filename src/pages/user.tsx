import { useEffect, useState } from "react";

import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";

const UserPage = () => {
  const [users, setUsers] = useState([]);

  const col = [
    { field: "user_id", headerName: "사용자아이디" },
    { field: "user_name", headerName: "사용자명" },
    { field: "user_password", headerName: "패스워드" },
    { field: "employee_number", headerName: "사번" },
    { field: "auth_id", headerName: "권한아이디" },
    { field: "use_yn", headerName: "사용여부" },
    { field: "create_date", headerName: "생성일시" },
    { field: "update_date", headerName: "수정일시" },
  ];

  const getUser = async () => {
    await axios.get("http://localhost:8080/api/users").then((res) => {
      console.log("res", res);
      if (res.status == 200) {
        setUsers(
          res.data.result.map((list: any, idx: number) => {
            return { ...list, id: idx + 1 };
          })
        );
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div style={{ height: 600, width: 800 }}>
      <DataGrid columns={col} rows={users} />
    </div>
  );
};

export default UserPage;
