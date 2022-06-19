import React from 'react'
import BoardCard from './BoardCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { editList } from '../../features/lists/lists';
import { createCard } from '../../features/cards/cards';

// TODO: edit position of list 
// TODO: refactor component into more smaller components (e.g. list wrapper from list)

const BoardList = ({list }) => {
  const [listTitle, setListTitle ] = useState(list.title)
  const [editableTitle, setEditableTitle] = useState(false)
  const [showAddCard, setShowAddCard ] = useState(false)
  const [newCardTitle, setNewCardTitle ] = useState("")

  const dispatch = useDispatch()
  const cards = useSelector((state) => state.cards)
  const listCards = cards.filter(card => card.listId === list._id)

  const handleTitleEdit = () => setEditableTitle(true);

  const handleTitleChange = (e) => {
    e.stopPropagation() // prevent event bubble to handleTitleEdit
    console.log('handleTitleChange triggered')

    if ((e.type === "keydown" && e.code === "Enter") || (e.type === "click" && e.currentTarget!== e.target)) {
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
  
  const handleAddCard = (e) => {
    console.log('submitting new card')
    e.preventDefault();
    e.stopPropagation()
    const newCardPayload = {
      listId: list._id,
      card: {
        title: newCardTitle
      }
    }
    dispatch(createCard({newCardPayload, callback: closeAddCard}))
  }
  const closeAddCard = () => {
    setShowAddCard(false)
    setNewCardTitle("")
  }

  if (!list || !listCards) return null
  const listWrapperClass = showAddCard ? "list-wrapper add-dropdown-active" : "list-wrapper"
  const cardDropdownClass = showAddCard ? "add-dropdown add-bottom active-card" : "add-dropdown add-bottom"

  return (
    <>
    <div className={ listWrapperClass } onClick={ () => setShowAddCard(true) } onBlur={ ()=> setShowAddCard(false) }>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div onClick={ handleTitleEdit } >
            { editableTitle ? 
            (<input type="text" value={ listTitle } onChange={handleTitleChange } onBlur={ handleTitleChange } onKeyDown={handleTitleChange} /> )
            : (<p className="list-title">{listTitle }</p> )
            }
          </div>
          <div className="add-dropdown add-top" >
            <div className="card">
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {listCards.map(card => {
              return (
                <BoardCard key={card._id} cardInfo={card}></BoardCard>
              )
            })}
          </div>
          <div className={cardDropdownClass}>
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card" value={newCardTitle} onChange={ e => setNewCardTitle(e.target.value) }></textarea>
              <div className="members"></div>
            </div>
            <a className="button" onMouseDown={ handleAddCard }>Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BoardList;