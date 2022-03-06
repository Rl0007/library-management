import React from 'react'

export const Editrow = (props) => {
  function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}
props.editformdata.returndate = convert(props.editformdata.returndate)
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
<td> {props.editformdata.issuedate}</td>
{console.log(props.editformdata.returndate)}



        <td><input type="date" required = 'required' placeholder='enter returndate..'
            name='returndate'value={props.editformdata.returndate} onChange={props.handleEditFormChange} /></td>
        <td>{props.editformdata.fees}</td>
        <td><select className="form-select" aria-label="Default select example" name='status' onChange={props.handleEditFormChange} value={props.editformdata.status}>
             <option value="unpaid">unpaid</option>
               <option value="paid">paid</option>
                    </select></td>
       
          <td>  <button type='submit' className='btn btn-outline-success btn-small mx-1'>save</button>
            <button  className='btn btn-outline-danger btn-small' onClick={props.handlecancel}>cancel</button>

          </td>

    </tr>
  )
}
