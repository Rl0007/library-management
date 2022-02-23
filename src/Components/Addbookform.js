import React from 'react'

export const Addbookform = () => {
  return (
  <div className="container">  <form>
  <div class="mb-3">
    <label for="booktitle" class="form-label">Book title</label>
    <input type="text" class="form-control" id="booktitle" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="isbn" class="form-label">Book isbn</label>
    <input type="integer" class="form-control" id="isbn" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="author" class="form-label">Book author</label>
    <input type="text" class="form-control" id="author" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="publisher" class="form-label">Publisher</label>
    <input type="text" class="form-control" id="publisher"/>
  </div>
 
  <button type="submit" class="btn btn-outline-dark">Submit</button>
</form>
</div>
  )

}
