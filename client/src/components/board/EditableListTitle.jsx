import { useDispatch } from "react-redux";
import { useState } from 'react'
import { editList } from '../../features/lists/lists';

const EditableListTitle = ({list}) => {
  const [listTitle, setListTitle ] = useState(list.title)
  const [editableTitle, setEditableTitle] = useState(false)
  const dispatch = useDispatch()
  
  const handleTitleEdit = () => setEditableTitle(true);
  
  const handleTitleChange = (e) => {
    e.stopPropagation() // prevent event bubble to handleTitleEdit
    console.log('handleTitleChange triggered')

    if ((e.type === "keydown" && e.code === "Enter") || (e.type === 'blur')) {
      // submit new title
      setListTitle(e.target.value)
      setEditableTitle(false)
      dispatch(editList({
        list: {...list, title: listTitle}
      }))
    } else {
      setListTitle(e.target.value)
    }
  }

  return (
    <div onClick={ handleTitleEdit } >
      { editableTitle ? 
      (<input type="text" value={ listTitle } onChange={handleTitleChange } onBlur={ handleTitleChange } onKeyDown={handleTitleChange} /> )
      : (<p className="list-title">{listTitle }</p> )
      }
    </div>
  )
}

export default EditableListTitle;