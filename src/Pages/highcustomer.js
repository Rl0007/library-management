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
      
    
    // const[memberrefresh,setmemberrefresh]=useState([''])

    // const refreshMember=(e)=>{
    //   e.preventDefault();
    //    fetch(`/showmember`)
    // .then(response => response.json()).then(data => console.log(data))
    // .then(()=> console.log(member))
    // const newmember =[ {
    //   id : 23,
    //   title : 'hello',
    //   author : 'this is author',
    //   publisher : 'this is u'
    // }]
    // // setit();
    
    // }
 

    return (
      <div className="container">
    <h1><u>Highest paying customer</u></h1>
    <Membertable memberdata={member} setmemberdata={setmember} refresh = {fetchfunction}/>
    </div>
  )
}
