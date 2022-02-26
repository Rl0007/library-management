import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

// onchange for bookname andon click implrment krna hai
export const Addbookfromapi = () => {
    const history = useNavigate()
    const[noofbooks,setnoofbooks]= useState([' '])
    const[bookname,setbookname]= useState([' '])

     const handleformsubmit = (e)=>{
   e.preventDefault();
   console.log(noofbooks,bookname)
   fetch(`/addbookfromapi`,{
     method : "POST",
     body : JSON.stringify({
       noofbooks : noofbooks,
       bookname : bookname
     
     })
   }).then(response => response.json()).then(data =>console.log(data))
   setnoofbooks('')
   setbookname('')
   history('/')
 

 }
  return (
<>
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Add books</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleformsubmit}>
                        <div className="mb-3">
                            <label htmlFor="noofbooks" className="form-label">no of books</label>
                            <input type="number" className="form-control" value={noofbooks} onChange={(e)=>setnoofbooks(e.target.value)} name='totalnoofbooks' id="noofbooks" aria-describedby="emailHelp"/>
                        
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" step="any" value={bookname} onChange={(e)=>setbookname(e.target.value)} className="form-control" name='bookname' id="name"/>
                        </div> */}
                
                        <button type="submit" className="btn btn-outline-warning">Add</button>
                </form>
            </div>
            <div className="modal-footer">
                {/* <!-- <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> --> */}
                
            </div>
        </div>
    </div>
</div>


    <div><button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Addbookfromapi
                </button></div>

    </>
  )
}
