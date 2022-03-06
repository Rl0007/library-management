import React from 'react'

export const Editrow = (props) => {
  function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}
  return (
    <tr key={props.editformdata.m_id}>
 {/* <td><input type="number" required = 'required' 
            name='m_id'value={props.editformdata.m_id} /></td>
        <td>
            <input type="number" required = 'required' placeholder='enter b_id..'
            name='b_id' value={props.editformdata.b_id} onChange={props.handleEditFormChange}/>
        </td> */}
<td> {props.editformdata.m_id}</td>
<td> {props.editformdata.b_id}</td>

{console.log(convert(props.editformdata.issuedate))}

        <td><input type="date" required = 'required' placeholder='enter issuedate..'
            name='issuedate'value={convert(props.editformdata.issuedate)} onChange={props.handleEditFormChange} /></td>
       
          <td>  <button type='submit' className='btn btn-outline-success btn-small mx-1'>save</button>
            <button  className='btn btn-outline-danger btn-small' onClick={props.handlecancel}>cancel</button>

          </td>

    </tr>
  )
}
