import React from 'react'
import Alert from 'react-bootstrap/Alert';

export const Erroralert = (props) => {
  
    return (
      <Alert variant="danger" onClose={() => props.erroralertvalue(false)} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        <p>
        {props.errormessage}
        </p>
      </Alert>
    );
  
}
