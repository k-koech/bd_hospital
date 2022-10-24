import { useState, useEffect } from 'react';
import { FaHospitalAlt } from 'react-icons/fa';
import {MdBloodtype} from 'react-icons/md';

export default function AddBloodAvailable({handleAddHospital, hospitals}) 
{
  const [ inputs, setInputs] = useState({});
  const [success, setSuccess] = useState()
  const [error, setError] = useState()

  const [blood_groups, setBloodGroups] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  
  function handleBloodSubmit(e)
    {
      e.preventDefault();

      fetch("https://floating-lake-54098.herokuapp.com/bloodavailable", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(inputs),
        })
      .then((r) => r.json())
      .then((newBlood) => 
      {
        handleAddHospital(newBlood)
        setSuccess(newBlood.success)
        setError(newBlood.error)  
        console.log("new",newBlood) 
        
      });
  
    }

    useEffect(()=>{
      const url = "https://floating-lake-54098.herokuapp.com/bloodgroup";
      fetch(url)
      .then((blood_response)=> blood_response.json() )
      .then((blood_group)=>{
      setBloodGroups(blood_group)
        console.log("xxxx",blood_group)
      })
     },[]);
  

  return (
    <>
      <button className="btn btn-outline-success btn-sm mb-3 mx-4" data-toggle="modal" data-target="#addBloodAvailableModal">
          <FaHospitalAlt /> Add Blood to hospital
      </button>
        {/* <!-- Add Blood Modal  */}
      <div className=''>
      <div className="modal fade" id="addBloodAvailableModal" tabIndex="-1" aria-labelledby="addBloodAvailableModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addBloodAvailableModalLabel">Add Blood</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            {
                error?
                <div className='text-danger p-2'>{error}</div>:  
                success?
                <div className='text-success p-2'>{success}</div>:""  
            }
            <form className='p-4' onSubmit={handleBloodSubmit}>
              <div className="form-group">
                  <label>Hospital</label>
                  <select className="form-control"  name="hospital_id" value={inputs.hospital_id || ""} onChange={handleChange} >
                     
                      <option value="">Select</option> 
                      {
                        hospitals.map((hospital) => (
                          <option value={hospital.id}>{hospital.name}</option>
                        ))
                      }
                      
                  </select>
              </div>
              <div className="form-group">
                  <label>Amount</label>
                  <input type="text" className="form-control" name="amount" value={inputs.amount || ""} onChange={handleChange} />
              </div>
              <div className="form-group">
                  <label>Blood Group</label>
                  <select className="form-control"  name="blood_group_id" value={inputs.blood_group_id || ""} onChange={handleChange} >
                      <option value="">Select</option> 
                      {
                        blood_groups &&
                        blood_groups.map((blood_group) => (
                          <option value={blood_group.id}>{blood_group.blood_type}</option>
                        ))
                      } 
                  </select>
              </div>
              <div className='text-right'>
              <span className="d-inline-block" tabindex="0" data-toggle="tooltip" title={!inputs.county ||!inputs.name || !inputs.code?"fill all fields to enable the button":""}>
                   <button  type="submit" disabled={!inputs.blood_group_id ||!inputs.amount || !inputs.hospital_id} className="btn btn-secondary px-5" 
                   >Save</button>
              </span>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )

  
}