
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import ReactLoading from 'react-loading'
import Hospital from './hospital/Hospital';
import AddHospital from './AddHospital';
import AddBloodAvailable from './AddBloodAvailable';


export default function Hospitals({ itemsPerPage=13 }) 
{
  const [hospitals, setHospitals] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [success, setSuccess] = useState()

  const [editHospital, setEditHospital] = useState();
  const [editSucess, setEditSuccess] = useState(false);

  
  const [lastDeletedHospital, setLastDeletedHospital] = useState("");
  const [lastAddedHospital, setLastAddedHospital] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    county: "",
    code: "",
    id: "",
  });

  const [hospitalBloodData, setHospitalBloodData] = useState();
  const [bloodAvailableData, setHospitalBloodAvailableData] = useState()

  function handleChange(e) {
    console.log(formData);
    let name = e.target.name;
    let value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleEditSubmit(e)
  {
    e.preventDefault();
   
    fetch(`http://127.0.0.1:9292/hospital/${formData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        name: formData.name, 
        code: formData.code,
        county: formData.county      
      })
      })
    .then((r) => r.json())
    .then((newPost) => {
      // onUpdatePost(newPost)
      if(newPost.success)
      {
        setSuccess(newPost.success)
        setEditSuccess(true)
      }
      console.log(newPost.suscess)
    });

  }

  

  function handleDeleteHospital(deletedHospitalId) 
  {
    setLastDeletedHospital(deletedHospitalId);  
  }

  function handleAddHospital(addedHospitalId) 
  {
    setLastAddedHospital(addedHospitalId);  
  }

  function onEditRequest(hospital)
  { 
     setEditHospital(hospital)  

     setHospitalBloodData(hospital)
     setHospitalBloodAvailableData(hospital.blood_available)

     console.log("zeed", hospital.blood_available)
     setFormData({
      id:hospital.id,
      name:hospital.name,
      code:hospital.code,
      county:hospital.county
     })

  }

  useEffect(()=>{
    const url = "https://floating-lake-54098.herokuapp.com/hospitals";
    fetch(url)
    .then((hospital_response)=> hospital_response.json() )
    .then((hospitals)=>{
      setHospitals(hospitals)
      console.log(hospitals)
      setIsLoaded(true)
    //  pagination
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(hospitals.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(hospitals.length / itemsPerPage));

    })
   },[itemOffset, itemsPerPage,lastDeletedHospital,editSucess, lastAddedHospital]);


  // Invoke when user click to request another page.
  const handlePageClick = (event) => 
  {
    const newOffset = (event.selected * itemsPerPage) % hospitals.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

 

  return (
    <>
    <div className="mt-3">
     <h4>Available Hospitals <span className="badge badge-primary badge-pill"></span>{hospitals.length}</h4>
       <div className='d-flex flex-row-reverse'>
        <AddHospital handleAddHospital={handleAddHospital}/>
        <AddBloodAvailable hospitals={hospitals}  handleAddHospital={handleAddHospital}/>
       </div>
    </div>
    {
      
     isLoaded==false?
        <div className="loader d-flex justify-content-center align-items-center m-5 p-5">
           <div> 
            <p>Processing ...</p>
            <ReactLoading type="spin" color="red"  />
            </div>
        </div>:
        <>
       
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">County</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
          {
              currentItems &&
              currentItems.map((hospital) => (
                  <Hospital onClick={(event_id) => setFormData({ ...formData, event_id })}
                  onEditRequest={onEditRequest} key={hospital.id} currentItems={currentItems} hospital={hospital}
                   handleDeleteHospital={handleDeleteHospital} />     
              ))
          }
                              
          </tbody>
        </table>
      <div className='d-flex justify-content-center text-center'>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>


        {/* Modal */}
        <div className="modal fade" id="updateHospitalModal" tabIndex="-1" aria-labelledby="updateHospitalModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateHospitalModalLabel">Edit Hospital  </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              { success?<div className='text-success'>{success}</div>:""}
            <form onSubmit={handleEditSubmit} >
              <div className="form-group">
                  <label>Name</label>
                  <input type="text" onChange={handleChange} name="name" value={formData.name}  className="form-control" />
              </div>
              <div className="form-group">
                  <label>Code</label>
                  <input type="text" value={formData.code} name="code" onChange={handleChange}  className="form-control" />
              </div>
              <div className="form-group">
                  <label>County</label>
                  <select value={formData.county} name="county" onChange={handleChange} className="form-control" >
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
              <div className="text-right">
                  <button type="submit" className="btn btn-success px-5">Save</button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>

     {/* end of modal */}


     {/* Modal blood */}
     <div className="modal fade " id="showHospitalBlood" tabIndex="-1" aria-labelledby="showHospitalBloodLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="showHospitalBloodLabel"><span className='btn btn-success'>{hospitalBloodData && hospitalBloodData.name}</span> Hospital  </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

            <div class="card">
              <div class="card-header text-right">
                Hospital code <span className="mx-3 btn text-success">{hospitalBloodData && hospitalBloodData.code} </span> 
                <span className='btn text-success'>{hospitalBloodData && hospitalBloodData.county} County</span> 
              </div>
              <div class="card-body container-fluid">
                { bloodAvailableData && bloodAvailableData.length!=0?
                <table class="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Blood Amount</th>
                    <th scope="col">Book</th>
                  </tr>
                </thead>
                <tbody>
                {
                  hospitalBloodData &&
                  hospitalBloodData.blood_available.map((blood_available) => (
                    <tr>
                      <th scope="row"></th>
                      <td>{blood_available.blood_group.blood_type}</td>
                      <td>{blood_available.amount} Litres</td>
                      <td>
                        <button className='btn btn-sm btn-outline-success'>Book Blood</button>
                      </td>
                    </tr>                  
                  ))
                }
                </tbody>
                </table>
                :<div className='alert alert-warning'>
                  No blood available in this hospital!!
                  </div>
                 }
                
              </div>
            </div>
    
            </div>
          </div>
        </div>
      </div>

     {/* end of modal */}


      </>
      }
    </>
  );
}
