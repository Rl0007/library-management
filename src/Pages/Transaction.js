import React, { useState ,useEffect} from 'react'
import { Addtransactionform } from '../Components/transactioncomponents/Addtransactionform'
import { Transactiontable } from '../Components/transactioncomponents/transactiontable'

export const Addtransaction = () => {
  const[transaction,settransaction]= useState([''])
  
  const fetchfunction=()=>{
fetch(`/showtransaction`)
    .then(response => {
        if (response.ok)
        return response.json()
    }).then(data => settransaction(data))
  }
  
  useEffect(()=>fetchfunction(),[]
 
   )
      
    
    // const[transactionrefresh,settransactionrefresh]=useState([''])

    // const refreshTransaction=(e)=>{
    //   e.preventDefault();
    //    fetch(`/showtransaction`)
    // .then(response => response.json()).then(data => console.log(data))
    // .then(()=> console.log(transaction))
    // const newtransaction =[ {
    //   id : 23,
    //   title : 'hello',
    //   author : 'this is author',
    //   publisher : 'this is u'
    // }]
    // setit();
    
    // }
 

    return (
      <div className="container">
    <h1><u>Add Transaction</u></h1>
    <Addtransactionform refresh = {fetchfunction}/>
    <Transactiontable transactiondata={transaction} settransactiondata={settransaction} refresh = {fetchfunction}/>
    </div>
  )
}
