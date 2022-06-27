import BoardList from './BoardList'
import AddList from "./AddList"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
import {ItemTypes} from '../../constants/ItemTypes'


const BoardLists = () => {
  const lists = useSelector(state => state.lists)
  const [activeListId, setActiveListId] = useState('')
  // TODO: drag and drop board lists

  // const [{ canDrop, isOver }, drop] = useDrop(
  //   () => ({
  //     accept: ItemTypes.LIST,
  //     drop: () => {
  //       // define drop result

  //     },
  //     // props to collect
  //     collect: (monitor) => {
  //       console.log('monitor item', monitor.getItem())
  //       console.log('monitor drop Result', monitor.getDropResult())

        
  //       // const listId = monitor.getItem()?._id
  //       // setDraggedListId(listId);

  //       return ({
  //         isOver: !!monitor.isOver(),
  //         canDrop: monitor.canDrop()
  //       })
  //     }
  //   }),
  //   []
  // )
  

  if (!lists) return null
  return (
    <div id="list-container" className="list-container"
      // ref={drop}
      // style={{
      //   position: 'relative',
      //   width: '100%',
      //   height: '100%',
      // }}
    >
      <div id="existing-lists" className="existing-lists">
        {lists.map(list => {
          return (
            <BoardList key={list._id} list={list} activeListId={activeListId} setActiveListId={setActiveListId}></BoardList>
            )
          })}
      </div>
      {/* {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
           {canDrop ? 'Release to drop' : 'Drag a box here'} */}
      <AddList/>
    </div>

  )
}

export default BoardLists;