import BoardList from './BoardList'
import AddList from "./AddList"
import { useSelector } from 'react-redux'
import { useState } from 'react'

const BoardLists = () => {
  const lists = useSelector(state => state.lists)
  const [activeListId, setActiveListId] = useState('')

  if (!lists) return null
  return (
    <div id="list-container" className="list-container">
  <div id="existing-lists" className="existing-lists">
    {lists.map(list => {
      return (
        <BoardList key={list._id} list={list} activeListId={activeListId} setActiveListId={setActiveListId}></BoardList>
      )
    })}
  </div>
  <AddList></AddList>
</div>
  )
}

export default BoardLists;