import React, { useState ,useEffect} from 'react'
import { Addmemberform } from '../Components/membercomponents/Addmemberform'
import { Membertable } from '../Components/membercomponents/membertable'

export const Addmember = () => {
  const[member,setmember]= useState([''])
  
  const fetchfunction=()=>{
fetch(`/showmember`)
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
    <h1><u>Add Member</u></h1>
    <Addmemberform refresh = {fetchfunction}/>
    <Membertable memberdata={member} setmemberdata={setmember} refresh = {fetchfunction}/>
    </div>
  )
}
