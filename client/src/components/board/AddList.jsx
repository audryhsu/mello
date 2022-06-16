import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { createList } from "../../features/lists/lists"

const AddList = () => {
  const dispatch = useDispatch()
  const boardId = useParams().id
  const formHidden = "new-list"
  const lists = useSelector(state => state.lists)
  const [formVis, setFormVis] = useState(false)
  // const [inputClass, setInputClass] = useState("new-list")
  const [formValue, setFormValue] = useState("")

  const handleSelect = () => {
    setFormVis(true)
  }

  const handleSubmit = async (e) => {
    // dispatch?
    const list = {boardId, list: {title: formValue}}
    dispatch(createList({list, callback: closeForm}))
  }

  const closeForm = () => {
    setFormVis(false)
    setFormValue("")
  }

  const newListClass = formVis ? "new-list selected" : "new-list"
  return (
    <div id="new-list" className={newListClass} onClick={handleSelect}>
      <span>Add a list...</span>
      <input type="text" placeholder="Add a list..." value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
      <div>
        <input type="submit" className="button" value="Save" onClick={handleSubmit}/>
        <i className="x-icon icon" onClick={closeForm}></i>
      </div>
    </div>
  )
}

export default AddList

// ### 1.1.2. Create a list form
// When the create a list button tile is clicked,
// it should add the `selected` class to the `#new-list.new-list` element.
// This will display the form. When either the “Save” or “X” buttons are clicked,
// the `selected` class should be removed.