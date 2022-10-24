import { useState } from 'react';


export default function AddBloodGroup() 
{
  const [blood_type, setName] = useState("");
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);


  function handlePostSubmit(e)
  {
    e.preventDefault();
     setSaving(true)
    fetch("https://floating-lake-54098.herokuapp.com/bloodgroup", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({blood_type})
      })
    .then((r) => r.json())
    .then((newPost) => {
    
      setError(newPost.error)
      setSuccess(newPost.success)
      setSaving(false)
    });

  }


  return (
    <>

<div className="modal right fade " id="addBloodGroupModal" tabIndex="-1" aria-labelledby="addBloodGroupModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="addBloodGroupModalLabel">Add Blood Group</h5>
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
      <form onSubmit={handlePostSubmit}>
        <div className="form-group">
            <label>Name</label>
            <input type="text" onChange={(e)=>setName(e.target.value)} className="form-control" />
        </div>
        <div className='text-right'>
              <button type="submit" className="btn btn-secondary px-5">
                {saving?<div><div className="spinner-border text-light" role="status"></div>
                         Saving
                        </div>:"Save"}
              </button>
        </div>
      </form>
      </div>
      
    </div>
  </div>
</div>
</>
  )

  
}