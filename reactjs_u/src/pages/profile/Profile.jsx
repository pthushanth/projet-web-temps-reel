import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { getUserById, getUserByIdRoute, updateUserRoute } from "../../utils/ApiRoutes";
import { AuthContext } from "../../context/Auth";
import CustomAvatar from "../../components/avatar/CustomAvatar";
import { Link, useParams } from "react-router-dom";
import { Button, ListItem } from "@mui/material";

export default function Profile() {
  const userId = useParams().id;
  const {token} = useContext(AuthContext);
  const [user, setUser] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(userId);
    setIsLoading(true);
    const getUserById = async (userId) => {
        await axios.get(`${getUserByIdRoute}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
          setUser(res.data);
          console.log(res.data);
        })
      }
    getUserById(userId);
    setIsLoading(false);
  }, [userId, token]);


  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);


	const handleChangeProfilePhoto = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleUploadPhoto = async () => {
    console.log(selectedFile);
       // Create an object of formData
       const formData = new FormData();
    
       // Update the formData object
       formData.append(
         "profile_pic",
         selectedFile,
       );

      await axios.put(`${updateUserRoute}/${userId}`, {
        profile_pic:selectedFile
      }, {
        headers: {
          'content-type':'multipart/form-data',
          Authorization: `Bearer ${token}`,
          },
      }).then((res) => {
        setUser(res.data);
        setIsLoading(false);
      }
      ).catch((err) => {
        console.log(err);
      }
      );
      setIsFilePicked(false);
	};

  return (
    <>
     {!isLoading && user !== undefined && Object.keys(user).length > 0 &&  
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="../assets/post/3.jpeg"
                alt=""
              />
                {user.profile_pic ? <img className="profileUserImg" src={user.profile_pic} alt=""/> :<div className="profileUserImg"><CustomAvatar name={user.username} fullSize/></div>}
              
              <Button
                variant="contained"
                component="label"
                sx={{mb: 2}}
              >
               Update Profile Pic
                <input
                name="profile_pic"
                  type="file"
                  hidden
                  onChange={handleChangeProfilePhoto}
                />
              </Button>
              <Button onClick={handleUploadPhoto}>Update</Button>
              {/* <img
                className="profileUserImg"
                src="../assets/person/7.jpeg"
                alt=""
              /> */}
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.lastname} {user.firstname}</h4>
                {/* <span className="profileInfoDesc">Hello my friends!</span> */}
                <Button variant="contained" component={Link} to={`/profile/${user._id}`}>Send message</Button>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
      </div>
      }
    </>
  );
}