import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Person from '../components/closeFriend/Person.jsx';
import { AuthContext } from '../context/Auth';
import { getAllUsersRoute } from '../utils/ApiRoutes';

const People = () => {

  const { isLoading, token, user } = useContext(AuthContext);

  const [allUsers, setAllUsers] = useState([]);
  
    const getAllFriends = async () => {
        try {
          const res = await axios.get(getAllUsersRoute, {
            headers: {
              Authorization: `token ${token}`,
            },
          });
          console.log(res.data);
          setAllUsers(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        if (token) {
          getAllFriends();
        }
      }, []);

    return (
        <div>
            {allUsers.map((person) => (
                <Person key={person.username} person={person} />
                    ))}
        </div>
    );
}

export default People;
