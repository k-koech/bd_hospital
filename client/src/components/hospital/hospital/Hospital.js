import { useState } from "react";
import {BiTrash, BiSearch} from "react-icons/bi"
import {FaRegEdit} from "react-icons/fa"

export default function Hospital({ hospital, handleDeleteHospital, onEditRequest }) 
{

   const deleteHospital = ()=>{
    fetch(`https://floating-lake-54098.herokuapp.com/hospital/${hospital.id}`, {
        method: "DELETE"
        })
        .then((r) => r.json())
        .then(() => {
            handleDeleteHospital(hospital.id);
        });    
   }

   const editHospital = (hospital_id) =>
   {
      const url = `https://floating-lake-54098.herokuapp.com/hospitals/${hospital_id}`;
      fetch(url)
      .then((hospital_response)=> hospital_response.json() )
      .then((hospital)=>{
        onEditRequest(hospital)
      }
      )
   }
    
    return (
        <tr key={hospital.id}>
                           <th scope="row">{hospital.id}</th>
                           <td>{hospital.name}</td>
                           <td>{hospital.county}</td>
                           <td>
                             <button onClick={() => editHospital(hospital.id)} className="btn btn-outline-success btn-sm"   data-toggle="modal" data-target="#updateHospitalModal">
                              <FaRegEdit/></button>
                           </td>
                           <td>
                             <button onClick={deleteHospital} className="btn btn-outline-danger btn-sm"><BiTrash  /></button>
                           </td>
                           <td>
                             <button onClick={() => editHospital(hospital.id)}  data-toggle="modal" data-target="#showHospitalBlood"  className="btn btn-outline-primary btn-sm">
                              <BiSearch/>View blood Available</button>
                           </td>
                           <td
      
          defaultPageSize={10}
          showPaginationBottom
       />
                          
           </tr> 
           

    );
  }