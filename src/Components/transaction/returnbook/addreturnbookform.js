import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import { Erroralert } from '../../erroralert';

export const Addreturn1bookform = ({refresh}) => {

 const[m_id,setm_id]= useState([''])
const [showalert, setshowalert] = useState(false);

 const[b_id,setb_id]= useState([''])
 const[returndate,setreturndate]= useState([''])
 const[showerroralert,setshowerroralert]=useState(false)
const erroralertvalue=(value)=>{setshowerroralert(value)}
 let errormessage = "No transaction found"

//  resolve date issue in returnbook funtion handle edit is ok check api for edit route check if added to database correctly
 const handlesubmit = (e)=>{
   e.preventDefault();
  //  console.log(m_id,b_id,returndate)
   fetch(`/addreturnbook`,{
     method : "POST",
     body : JSON.stringify({
       m_id : m_id,
       b_id : b_id,
       returndate : returndate,
     })
   }).then(response => response.json()).then((data) =>{
  
  if (data['704']==="book  returned"){
    setshowalert(true)
  }
  else if (data['705']==="no trasaction found"){
    setshowerroralert(true)
  }
  }).then(()=>refresh())
   setm_id('')
   setb_id('')
   setreturndate('')
   

 }
 if(showerroralert){
   return(<Erroralert errormessage={errormessage} erroralertvalue={erroralertvalue}/>)}
 if (showalert) {
    return (
      <Alert variant="success" onClose={() => setshowalert(false)} dismissible>
        <Alert.Heading>submit</Alert.Heading>
        <p>
Book returned successfully!!!        </p>
      </Alert>
    );
  }

  return (
  <div className="container"> 
   <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="return1bookid" className="form-label" >Member id</label>
    <input type="number" className="form-control" required='required' value={m_id} onChange={(e)=>setm_id(e.target.value)} id="Memberid" aria-describedby="emailHelp"/>
  </div>
 
  <div className="mb-3">
    <label htmlFor="b_id" className="form-label" >Book b_id</label>
    <input type="number" className="form-control" required='required'value={b_id} onChange={(e)=>{setb_id(e.target.value)}} id="b_id" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="returndate" className="form-label" >returndate</label>
    <input type="date" className="form-control" id="returndate" value = {returndate} required='required' onChange={(e)=>{setreturndate(e.target.value)}}/>
  </div>
 
 
  <button type="submit" className="btn btn-outline-dark">Submit</button>
</form>
</div>
  )

}
