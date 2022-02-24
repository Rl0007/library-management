import React, { useState ,useEffect} from 'react'
import { Addbookform } from '../Components/Addbookform'
import { Booktable } from '../Components/booktable'

export const Addbook = () => {
  const[book,setbook]= useState([''])
   useEffect(()=>
    fetch(`/showbook`)
    .then(response => {
        if (response.ok)
        return response.json()
    }).then(data => setbook(data)),[])
  return (
    <div><h1><u>Add Book</u></h1>
    <Addbookform />
    <Booktable bookdata={book}/>
    </div>
  )
}
