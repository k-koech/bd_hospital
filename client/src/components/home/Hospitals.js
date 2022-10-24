
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import ReactLoading from 'react-loading'

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// ===================done
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((hospital) => (
              <tr key={hospital.id}>
                         <th scope="row"></th>
                         <td>{hospital.name}</td>
                         <td>{hospital.county}</td>
              </tr>      
   
        ))}
    </>
  );
}

export default function Hospitals({ itemsPerPage }) 
{
  const [hospitals, setHospitals] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);


  useEffect(()=>{
    fetch("http://127.0.0.1:9292/hospitals")
    .then((hospital_response)=> hospital_response.json() )
    .then((hospitals)=>{
      console.log("Hospitals ",hospitals)
      setHospitals(hospitals)
      setIsLoaded(true)
     console.log( hospitals.length )

    //  pagination
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(hospitals.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(hospitals.length / itemsPerPage));

    })
   },[itemOffset, itemsPerPage]);


  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % hospitals.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
    {
     isLoaded==false?
        <div className="loader d-flex justify-content-center align-items-center">
            <ReactLoading type="spin" color="red"  />
        </div>:
        <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">County</th>
            </tr>
          </thead>
          <tbody>
          {
            <Items currentItems={currentItems} />                                 
          }                      
          </tbody>
        </table>
      
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
      </>
      }
    </>
  );
}
