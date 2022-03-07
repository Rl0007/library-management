import React, { useState ,useEffect} from 'react'
import { Membertable } from '../Components/membercomponents/membertable'

export const Addhighcust = () => {
  const[member,setmember]= useState([''])
  
  const fetchfunction=()=>{
fetch(`/highcust`)
    .then(response => {
        if (response.ok)
        return response.json()
    }).then(data => setmember(data))
  }
  
  useEffect(()=>fetchfunction(),[]
 
   )
      
    

 

    return (
      <div className="container">
    <h1><u>Highest paying customer</u></h1>
    <Membertable memberdata={member} setmemberdata={setmember} refresh = {fetchfunction}/>
    </div>
  )
}
