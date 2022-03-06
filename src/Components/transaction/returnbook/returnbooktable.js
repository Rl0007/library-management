import React, { useEffect, useState } from 'react'
import { Readrow } from './readrow'
import { Fragment } from 'react'
import { Editrow } from './editrow'
export const Return1booktable = (props) => {
   


  const[editreturn1bookm_id,seteditreturn1bookm_id] = useState(null);
  const[editreturn1bookb_id,seteditreturn1bookb_id] = useState(null);


  const handleEdit = (event, return1book)=>{
    event.preventDefault();
    seteditreturn1bookm_id(return1book.m_id);
    seteditreturn1bookb_id(return1book.b_id);
    console.log('inside handleedit')

    const formValues = {
      m_id : return1book.m_id,
      b_id : return1book.b_id,
      returndate : return1book.returndate,
      status : return1book.status

    }
    seteditformdata(formValues)
  }
  const handlecancel =()=>
   {
     seteditreturn1bookb_id(null)
     seteditreturn1bookm_id(null)
   }
  const[editformdata,seteditformdata]= useState({
    m_id : "",
    b_id : "",
    issuedate:"",
    returndate : "",
    fees : "",
    status : "",


  })
  const handleEditFormChange =(e)=>{
    e.preventDefault();
    const fieldName = e.target.getAttribute('name');
    const filedValue = e.target.value;

    const newFormData = {...editformdata};
    newFormData[fieldName] = filedValue;

    seteditformdata(newFormData);
  }
  const handleEditFormSubmit = (e)=>{

    e.preventDefault();
    fetch(`/editreturnbook`,{method : "POST",
    body : JSON.stringify({
  m_id : editformdata.m_id,
      b_id : editformdata.b_id,
      returndate : editformdata.returndate,
      status : editformdata.status,

    })
  }).then(response => response.json()).then(data =>console.log(data)).then(()=>props.refresh())
  
    
    seteditreturn1bookm_id(null);
    seteditreturn1bookb_id(null);

  }
  return (
      <div className="container">
        <form onSubmit={handleEditFormSubmit}>
   <table className="table table-hover table-bordered my-2">
  <thead>
    <tr>
      <th scope="col">Mem_m_id</th>
      <th scope="col">book id </th>
      <th scope="col">issue Date</th>
       <th scope="col">return Date</th>
       <th scope='col'>fees</th>
       <th scope='col'>status</th>

      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
 {props.return1bookdata.map((return1book) =>
 
 
 <Fragment>
   {(editreturn1bookm_id === return1book.m_id) && (editreturn1bookb_id=== return1book.b_id)? <Editrow editformdata={editformdata} handlecancel={handlecancel} handleEditFormChange={handleEditFormChange} return1bookdata = {props.return1bookdata}/>:<Readrow return1book = {return1book}  handleEdit={handleEdit} refresh={props.refresh}/>}
  
  
  
   </Fragment> 
   )}
  </tbody>
</table>
</form>
  </div>
  )
}
