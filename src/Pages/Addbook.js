import React, { useState ,useEffect} from 'react'
import { Addbookform } from '../Components//bookcomponents/Addbookform'
import { Booktable } from '../Components/bookcomponents/booktable'

export const Addbook = () => {
  const[book,setbook]= useState([''])
  
  const fetchfunction=()=>{
fetch(`/showbook`)
    .then(response => {
        if (response.ok)
        return response.json()
    }).then(data => setbook(data))
  }
  
  useEffect(()=>fetchfunction(),[]
 
   )
      
    
    const[bookrefresh,setbookrefresh]=useState([''])

    const refreshBook=(e)=>{
      e.preventDefault();
       fetch(`/showbook`)
    .then(response => response.json()).then(data => console.log(data))
    .then(()=> console.log(book))
    const newbook =[ {
      id : 23,
      title : 'hello',
      author : 'this is author',
      publisher : 'this is u'
    }]
    // setit();
    
    }
 

    return (
      <div className="container">
    <h1><u>Add Book</u></h1>
    <Addbookform refresh = {fetchfunction}/>
    <Booktable bookdata={book} setbookdata={setbook} refresh = {fetchfunction}/>
    </div>
  )
}
