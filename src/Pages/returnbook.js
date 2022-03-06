import React, { useState ,useEffect} from 'react'
import { Addreturn1bookform } from '../Components/transaction/returnbook/addreturnbookform'
import { Return1booktable } from '../Components/transaction/returnbook/returnbooktable'

export const Addreturn1book = () => {
  const[return1book,setreturn1book]= useState([''])
  
  const fetchfunction=()=>{
fetch(`/showreturnbook`)
    .then(response => {
        if (response.ok)
        return response.json()
    }).then(data => setreturn1book(data))
  }
  
  useEffect(()=>fetchfunction(),[]
 
   )
      
    
    // const[return1bookrefresh,setreturn1bookrefresh]=useState([''])

    // const refreshReturn1book=(e)=>{
    //   e.preventDefault();
    //    fetch(`/showreturn1book`)
    // .then(response => response.json()).then(data => console.log(data))
    // .then(()=> console.log(return1book))
    // const newreturn1book =[ {
    //   id : 23,
    //   title : 'hello',
    //   author : 'this is author',
    //   publisher : 'this is u'
    // }]
    // // setit();
    
    // }
 

    return (
      <div className="container">
    <h1><u>Return book</u></h1>
    <Addreturn1bookform refresh = {fetchfunction}/>
    <Return1booktable return1bookdata={return1book} setreturn1bookdata={setreturn1book} refresh = {fetchfunction}/>
    </div>
  )
}
