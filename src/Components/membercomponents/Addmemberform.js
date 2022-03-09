import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';

export const Addmemberform = ({refresh}) => {

 const[id,setid]= useState([''])
const [showalert, setshowalert] = useState(false);

 const[name,setname]= useState([''])
 const[email,setemail]= useState([''])
 

 
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
   }).then(response => response.json()).then(data =>console.log(data)).then(()=>refresh()).then(()=> setshowalert(true))
   setid('')
   setname('')
   setemail('')

 }
  if (showalert) {
    return (
      <Alert variant="success" onClose={() => setshowalert(false)} dismissible>
        <Alert.Heading>submit</Alert.Heading>
        <p>
Added successfully!!!        </p>
      </Alert>
    );
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
