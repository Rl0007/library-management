import React, { useEffect, useState } from 'react'
import { Readrow } from './readrow'
import { Fragment } from 'react'
import { Editrow } from './editrow'
export const Issuebooktable = (props) => {
   


  const[editissuebookm_id,seteditissuebookm_id] = useState(null);
  const[editissuebookb_id,seteditissuebookb_id] = useState(null);


  const handleEdit = (event, issuebook)=>{
    event.preventDefault();
    seteditissuebookm_id(issuebook.m_id);
    seteditissuebookb_id(issuebook.b_id);
    console.log('inside handleedit')

    const formValues = {
      m_id : issuebook.m_id,
      b_id : issuebook.b_id,
      issuedate : issuebook.issuedate
    }
    seteditformdata(formValues)
  }
  const handlecancel =()=>
   {
     seteditissuebookb_id(null)
     seteditissuebookm_id(null)
   }
  const[editformdata,seteditformdata]= useState({
    m_id : "",
    b_id : "",
    issuedate : "",

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
    fetch(`/editissuebook`,{method : "POST",
    body : JSON.stringify({
  m_id : editformdata.m_id,
      b_id : editformdata.b_id,
      issuedate : editformdata.issuedate,
    })
  }).then(response => response.json()).then(data =>console.log(data)).then(()=>props.refresh())
  
    
    seteditissuebookm_id(null);
    seteditissuebookb_id(null);

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
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
 {props.issuebookdata.map((issuebook) =>
 
 
 <Fragment>
   {(editissuebookm_id === issuebook.m_id) && (editissuebookb_id=== issuebook.b_id)? <Editrow editformdata={editformdata} handlecancel={handlecancel} handleEditFormChange={handleEditFormChange} issuebookdata = {props.issuebookdata}/>:<Readrow issuebook = {issuebook}  handleEdit={handleEdit} refresh={props.refresh}/>}
  
  
  
   </Fragment> 
   )}
  </tbody>
</table>
</form>
  </div>
  )
}
