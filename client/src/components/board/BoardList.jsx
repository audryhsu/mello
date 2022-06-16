import React from 'react'
import BoardCard from './BoardCard';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCards } from '../../features/cards/cards';
import { useEffect } from 'react';


const BoardList = ({list}) => {
  const dispatch = useDispatch()
  const cards = useSelector((state) => state.cards)
  
  useEffect(() => {
    let boardId = list.boardId
    let listId = list._id
    dispatch(fetchCards({boardId, listId}))
  }, [dispatch])

  if (!list || !cards) return null
  return (
    <>
    <div className="list-wrapper">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            <p className="list-title">{list.title}</p>
          </div>
          <div className="add-dropdown add-top">
            <div className="card">
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {cards.map(card => {
              return (
                <BoardCard key={card._id} cardInfo={card}></BoardCard>
              )
            })}
          </div>
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
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