import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import { Erroralert } from '../erroralert';

export const Addmemberform = ({refresh}) => {

 const[id,setid]= useState([''])
const [showalert, setshowalert] = useState(false);

 const[name,setname]= useState([''])
 const[email,setemail]= useState([''])
 const[showerroralert,setshowerroralert]=useState(false)
const erroralertvalue=(value)=>{setshowerroralert(value)
}
let errormessage = 'Member id or gmail taken'
 
 const handlesubmit = (e)=>{
   e.preventDefault();
  //  console.log(id,name,email)
   fetch(`/member`,{
     method : "POST",
     body : JSON.stringify({
       id : id,
       name : name,
       email : email,
     })
   }).then(response => response.json()).then((data) =>{
    if (data['303'] ===  "member id or gmail taken"){
      setshowerroralert(true)
    }
    if(data['304']==="member added"){
      setshowalert(true)
    }
    
    }).then(()=>refresh())
   setid('')
   setname('')
   setemail('')

 }
 if(showerroralert){
   return(<Erroralert errormessage={errormessage} erroralertvalue={erroralertvalue}/>)
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
    <input type="number" required='required' className="form-control"  value={id} onChange={(e)=>setid(e.target.value)} id="Memberid" aria-describedby="emailHelp"/>
  </div>
 
  <div className="mb-3">
    <label htmlFor="name" className="form-label" >Member name</label>
    <input type="text" className="form-control" required='required'value={name} onChange={(e)=>{setname(e.target.value)}} id="name" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label" >email</label>
    <input type="email" className="form-control"required='required' id="email" value = {email}  onChange={(e)=>{setemail(e.target.value)}}/>
  </div>
 
 
  <button type="submit" className="btn btn-outline-dark">Submit</button>
</form>
</div>
  )

}
