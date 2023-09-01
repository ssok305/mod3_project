import { useEffect, useState } from "react";

function UserProf() {
  const [user, setUser] = useState([]);
  async function getUser() {
    try {
      const response = await axios.get(`api/users/${id}`);
      console.log(response);
      setUser(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <img src={`https://api.multiavatar.com/${user._id}.png`} alt="" />
      <h1>name:{user.name}</h1>
      <p>email:{user.email}</p>
      <button>Edit</button>
    </div>
  );
}

export default UserProf;
