import {useEffect, useState} from 'react';
import "./Home.css";
import landing from './landing1.png';
import ReactLoading from 'react-loading'

export default function Home()
{
    const [blood_groups, setBloodGroups] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
        fetch("https://floating-lake-54098.herokuapp.com/bloodgroup")
        .then((response)=> response.json() )
        .then((bloodGroups)=>{
          console.log("bloodGroups ",bloodGroups)
          setBloodGroups(bloodGroups)
          setIsLoaded(true)
         console.log( bloodGroups.length )
        })
    },[]);

    return (
        <div className='home container-fluid'>
          <div >
            </div>
            <div className="row home-row">
                <div className="col-md-6 d-flex justify-content-center align-items-center my-auto">
                    <img src={landing} alt="image loading" />
                </div>
                <div className="col-md-6">
                    <h2 className="font-weight-bold">Get Blood on Emergency</h2>
                    <>
                      <button className="btn btn-outline-secondary btn-sm">Donate</button>
                      <button className="btn btn-outline-secondary btn-sm mx-3">Book</button>
                      <button className="btn btn-outline-secondary btn-sm">Save a life</button>
                    </>
                
                    <h4 className='mt-5'>Available Blood Groups 
                       {isLoaded==false?"":
                        <span className="badge badge-danger badge-pill mx-2">{blood_groups.length}</span>
                       }
                    </h4>
                    {                       
                        isLoaded==false?
                        <div className="loader d-flex justify-content-center align-items-center m-5 p-5">
                            <div> 
                            <ReactLoading type="spin" color="red"  />
                            </div>
                        </div>:
                        blood_groups.length==0?
                        <div className='text-warning text-center'>
                            No blood groups available!
                        </div>
                        :
                        <div className='card p-4'>
                        <div className='row bg-light mb-3 p-2'>
                            {blood_groups.map((blood_group)=>(                            
                                <div className='col-sm-6 '>{blood_group.blood_type}</div>
                            ))}
                        </div>
                        </div>
                      
                    } 
                           
                </div>
            </div>
        </div> 
    )
}