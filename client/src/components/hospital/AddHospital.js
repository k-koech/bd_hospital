import { useState } from 'react';
import { FaHospitalAlt } from 'react-icons/fa';
import {MdBloodtype} from 'react-icons/md';

export default function AddHospital({handleAddHospital}) 
{
  const [ inputs, setInputs] = useState({});
  const [success, setSuccess] = useState()
  const [error, setError] = useState()

  const [showModal, setShowModal] = useState("none");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  
  function handleHospitalSubmit(e)
    {
      e.preventDefault();

      fetch("https://floating-lake-54098.herokuapp.com/hospital", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(inputs),
        })
      .then((r) => r.json())
      .then((newHospital) => 
      {
        handleAddHospital(newHospital)
        setSuccess(newHospital.success)
        setError(newHospital.error)   
        
      });
  
    }

  return (
    <>
      
        <button className="btn btn-outline-success btn-sm mb-3" data-toggle="modal" data-target="#addHospitalModal">
            <FaHospitalAlt /> Add Hospital
        </button>
      
        {/* <!-- Add Hospital Modal  */}
      <div className=''>
      <div className="modal fade" show={showModal} id="addHospitalModal" tabIndex="-1" aria-labelledby="addHospitalModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addHospitalModalLabel">Add Hospital</h5>
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
            <form className='p-4' onSubmit={handleHospitalSubmit}>
              <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" name="name" value={inputs.name || ""} onChange={handleChange} />
              </div>
              <div className="form-group">
                  <label>Code</label>
                  <input type="text" className="form-control" name="code" value={inputs.code || ""} onChange={handleChange} />
              </div>
              <div className="form-group">
                  <label>County</label>
                  <select className="form-control" name="county"  value={inputs.county || ""} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Nairobi</option>
                      <option>Uasin Gishu</option>
                      <option>Machakos</option>
                      <option>Kiambu</option>
                      <option>Mombasa</option>
                      <option>Kajiado</option>
                      <option>Elgeiyo Marakwet</option>
                  </select>
              </div>
              <div className='text-right'>
              <span className="d-inline-block" tabindex="0" data-toggle="tooltip" title={!inputs.county ||!inputs.name || !inputs.code?"fill all fields to enable the button":""}>
                   <button  type="submit" disabled={!inputs.county ||!inputs.name || !inputs.code} className="btn btn-secondary px-5" 
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