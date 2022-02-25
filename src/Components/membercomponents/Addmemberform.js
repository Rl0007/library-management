import React, { useState } from 'react'

export const Addmemberform = ({refresh}) => {

 const[id,setid]= useState([' '])

 const[name,setname]= useState([' '])
 const[email,setemail]= useState([' '])
 

 
 const handlesubmit = (e)=>{
   e.preventDefault();
   console.log(id,name,email)
   fetch(`/member`,{
     method : "POST",
     body : JSON.stringify({
       id : id,
       name : name,
       email : email,
     })
   }).then(response => response.json()).then(data =>console.log(data))
   setid('')
   setname('')
   setemail('')
   refresh()

 }

  return (
  <div className="container"> 
   <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="memberid" className="form-label" >Member id</label>
    <input type="number" className="form-control"  value={id} onChange={(e)=>setid(e.target.value)} id="Memberid" aria-describedby="emailHelp"/>
  </div>
 
  <div className="mb-3">
    <label htmlFor="name" className="form-label" >Member name</label>
    <input type="text" className="form-control" value={name} onChange={(e)=>{setname(e.target.value)}} id="name" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label" >email</label>
    <input type="email" className="form-control" id="email" value = {email}  onChange={(e)=>{setemail(e.target.value)}}/>
  </div>
 
 
  <button type="submit" className="btn btn-outline-dark">Submit</button>
</form>
</div>
  )

}
