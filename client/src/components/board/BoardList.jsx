import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import EditableListTitle from './EditableListTitle';
import CardsContainer from './CardsContainer';
import AddCardForm from './AddCardForm';
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'
import {ItemTypes} from '../../constants/ItemTypes'

// TODO: edit position of list 

const BoardList = ({list, activeListId, setActiveListId }) => {
  const { _id, position } = list
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: ItemTypes.LIST,
  //   item: { _id, position },
  //   collect: (monitor) => {
  //     // console.log('from boardlist: ', monitor.getItem());
  //     console.log('drop Result', monitor.getDropResult());
  //     return ({
  //         isDragging: !!monitor.isDragging()
  //     })
  //   }
  // }))

  
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


  if (!list) return null
  const listWrapperClass = activeListId === list._id ? "list-wrapper add-dropdown-active" : "list-wrapper"

  return (
    <>
    <div className={ listWrapperClass } 
    
      // ref={drop}
      // style={{
      //   position: 'relative',
      //   width: '100%',
      //   height: '100%',
      // }}
    >
      <div className="list-background">
        <div className="list"
          // ref={drag}
          // style={{
          //   opacity: isDragging ? 0.5 : 1,
          //   fontSize: 25,
          //   fontWeight: 'bold',
          //   cursor: 'move',
          // }}
        >
          <a className="more-icon sm-icon" href=""></a>
          <EditableListTitle list={list}/>
          <div className="add-dropdown add-top" >
            <div className="card">
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <CardsContainer list={list}/>
          <AddCardForm listId={list._id} activeListId={activeListId} setActiveListId={setActiveListId}/>
          <div className="add-card-toggle" data-position="bottom" onClick={ () => setActiveListId(list._id) }>
            Add a card...
          </div>
        </div>
      </div>
      {/* /* {isOver && (
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
      )} */}
    {/* {canDrop ? 'Release to drop' : 'Drag a box here'} */}
    </div>
    </>
  );
};

export default BoardList;