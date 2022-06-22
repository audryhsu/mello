import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { createList } from "../../features/lists/lists"

const AddList = () => {
  const dispatch = useDispatch()
  const boardId = useParams().id
  const [formVis, setFormVis] = useState(false)
  const [formValue, setFormValue] = useState("")
  const lists = useSelector(state => state.lists)

  const evalPosition = () => {
    const len = lists.length
    if (!len) return 65535
    const currentMax = lists[len-1].position
    return currentMax + 65536
  }

  const handleSelect = () => setFormVis(true);

  const handleSubmit = async () => {
    const list = {boardId, list: {title: formValue, position: evalPosition()}}
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