import React, { useEffect, useState } from 'react'
import { Readrow } from './readrow'
import { Fragment } from 'react'
import { Editrow } from './editrow'
export const Membertable = (props) => {
   


  const[editmemberid,seteditmemberid] = useState(null);

  const handleEdit = (event, member)=>{
    event.preventDefault();
    seteditmemberid(member.id);

    const formValues = {
      id : member.id,
      name : member.name,
      email : member.email
    }
    seteditformdata(formValues)
  }
  const[editformdata,seteditformdata]= useState({
    id : "",
    name : "",
    email : "",

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
    fetch(`/editmember`,{method : "POST",
    body : JSON.stringify({
  id : editformdata.id,
      name : editformdata.name,
      email : editformdata.email,
    })
  }).then(response => response.json()).then(data =>console.log(data)).then(()=>props.refresh())
  
    
    seteditmemberid(null);
  }
  return (
      <div className="container">
        <form onSubmit={handleEditFormSubmit}>
   <table className="table table-hover table-bordered my-2">
  <thead>
    <tr>
      <th scope="col">Mem_id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
 {props.memberdata.map((member) =>
 
 
 <Fragment>
   {editmemberid === member.id ? <Editrow editformdata={editformdata} handleEditFormChange={handleEditFormChange} memberdata = {props.memberdata}/>:<Readrow member = {member}  handleEdit={handleEdit} refresh={props.refresh}/>}
  
  
  
   </Fragment> 
   )}
  </tbody>
</table>
</form>
  </div>
  )
}
