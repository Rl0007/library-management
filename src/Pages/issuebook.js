import React, { useState ,useEffect} from 'react'
import { Addissuebookform } from '../Components/transaction/issuebook/addissuebookform'
import { Issuebooktable } from '../Components/transaction/issuebook/issuebooktable'

export const Addissuebook = () => {
  const[issuebook,setissuebook]= useState([''])
  
  const fetchfunction=()=>{
fetch(`/showissuebook`)
    .then(response => {
        if (response.ok)
        return response.json()
    }).then(data => setissuebook(data))
  }
  
  useEffect(()=>fetchfunction(),[]
 
   )
      
    
    // const[issuebookrefresh,setissuebookrefresh]=useState([''])

    // const refreshIssuebook=(e)=>{
    //   e.preventDefault();
    //    fetch(`/showissuebook`)
    // .then(response => response.json()).then(data => console.log(data))
    // .then(()=> console.log(issuebook))
    // const newissuebook =[ {
    //   id : 23,
    //   title : 'hello',
    //   author : 'this is author',
    //   publisher : 'this is u'
    // }]
    // // setit();
    
    // }
 

    return (
      <div className="container">
    <h1><u>Issue book</u></h1>
    <Addissuebookform refresh = {fetchfunction}/>
    <Issuebooktable issuebookdata={issuebook} setissuebookdata={setissuebook} refresh = {fetchfunction}/>
    </div>
  )
}
