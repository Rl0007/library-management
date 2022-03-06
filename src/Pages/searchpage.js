import React, { useState ,useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Booktable } from '../Components/bookcomponents/booktable'

export const Addsearch = () => {
  const[book,setbook]= useState([''])
  const location = useLocation();
  const {word} = location.state;
  console.log(word)
  const fetchfunction=()=>{
fetch(`/search/${word}`)
    .then(response => {
        if (response.ok)
        return response.json()
    }).then(data => setbook(data))
  }
  
  useEffect(()=>fetchfunction(),[word]
 
   )
      
    
    const[bookrefresh,setbookrefresh]=useState([''])

    // const refreshBook=(e)=>{
    //   e.preventDefault();
    //    fetch(`/showbook`)
    // .then(response => response.json()).then(data => console.log(data))
    // .then(()=> console.log(book))
    // const newbook =[ {
    //   id : 23,
    //   title : 'hello',
    //   author : 'this is author',
    //   publisher : 'this is u'
    // }]
    // setit();
    
    // }
 

    return (
      <div className="container">
    <h1><u>Search result </u>: '{word}'</h1>
    <Booktable bookdata={book} setbookdata={setbook} refresh = {fetchfunction}/>
    </div>
  )
    }
