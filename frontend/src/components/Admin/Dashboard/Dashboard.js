import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { adminApi } from '../../../store/Api'
import './Dashboard.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom'





function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteUser, setDeleteUser] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const navigate=useNavigate()

  useEffect(() => {
    axios
      .get(`${adminApi}userdata`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setUserData(response.data.data);
        setFilteredData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteUser]);

  const handleChange = (event) => {
    setSearch(event.target.value);
    setDeleteUser(false);

    const updatedData = userData.filter((item) =>
      item.firstname.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredData(updatedData);
  };



const editUser=(userId,firstname,lastname,email,phone)=>{
  
    navigate('/admin/editUser',{state:{_id:userId,firstname,lastname,email,phone}})

}

const DeleteUser=(userId)=>{

  axios.get(`${adminApi}deleteuser/${userId}`,{withCredentials:true}).then(()=>{
            setDeleteUser(!deleteUser)
    }).catch(error=>console.log(error))
  
}


return (

    <div className="table-wrapper">


    <div className="table">
      <div className="search2">

      <h2 className='heading'>USER DATA</h2>

        <input
          className=""
          type="text"
          placeholder="Search here"
          onChange={handleChange}
          value={search}
        />
      </div>

      <Table className="mt-3 "  bordered >
        <thead style={{ color: "black" }}>
          <tr>
            <th>Sl.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Edit</th>
            <th>Delete </th>
          </tr>
        </thead>
        <tbody className="values " style={{ color: "black" }}>

          {
    
    filteredData.map((obj, index) => {
            return (
              <tr>
                <td style={{color:"black"}}>{index + 1}</td>
                <td>{obj.firstname} {obj.lastname}</td>
                <td>{obj.email}</td>
                <td>{obj.phone}</td>
                <td>
                  <Button className='edit-btn'
                    onClick={() => editUser(obj._id, obj.firstname,obj.lastname, obj.email,obj.phone)}
                    variant="primary"
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button className='delete-btn' onClick={() => DeleteUser(obj._id)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
          </div>
  );

        }


export default Dashboard
