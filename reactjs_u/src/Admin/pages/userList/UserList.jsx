import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getAllUsersRoute } from "../../../utils/ApiRoutes";
import { AuthContext } from "../../../context/Auth";
import { List, ListItem } from "@mui/material";

export default function UserList() {
  const [data, setData] = useState(userRows);

  const { token, user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchDataJson() {
      let contacts = null;
      return await axios.get(getAllUsersRoute, {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          contacts = res.data;
          return contacts;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (user !== null) {
      fetchDataJson().then((data) => {
        setUsers(data);
        console.log(data);
      });
    }
  }, [user]);

  const handleDelete = (id) => {
    setData(users.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    
    <div className="userList" style={{height:400, width: '100%'}}>
      {/* {users.length > 0 &&       
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        />
      } */}

      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <img src={user.avatar} alt="" />
            <div className="userListUser">
              <h3>{user.username}</h3>
              <p>{user.email}</p>
            </div>
            <div className="userListAction">
              <Link to={"/admin/user/" + user.id}>
                <button className="userListEdit">Supprimer</button>
              </Link>
            </div>
          </ListItem>
        ))}
      </List>

      
    </div>
  );
}