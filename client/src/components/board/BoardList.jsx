import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import EditableListTitle from './EditableListTitle';
import CardsContainer from './CardsContainer';
import AddCardForm from './AddCardForm';

// TODO: edit position of list 

const BoardList = ({list, activeListId, setActiveListId }) => {
  if (!list) return null
  const listWrapperClass = activeListId === list._id ? "list-wrapper add-dropdown-active" : "list-wrapper"

  return (
    <>
    <div className={ listWrapperClass } >
      <div className="list-background">
        <div className="list">
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
    </div>
    </>
  );
};

export default BoardList;