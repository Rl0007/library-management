import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert';


export const Submitalert = ({alertvalue}) => {
const [showalert, setshowalert] = useState(false);
  useEffect(()=>{
    setshowalert(alertvalue)
  },[alertvalue])
  if (showalert){
    return (
    <Alert variant="success" onClose={() => setshowalert(false)} dismissible>
        <Alert.Heading>Submit</Alert.Heading>
        <p>
        Added successfully !!!!
        </p>
      </Alert>
  );}
        return(null);
}

