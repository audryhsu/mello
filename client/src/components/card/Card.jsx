import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { fetchCard } from "../../features/cards/cards";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardDescription from "./CardDescription";
import CardLabels from "./CardLabels";
import CardSidebar from "./CardSidebar";
import LabelsPopover from "./LabelsPopover";
import CommentForm from "./CommentForm";
import DueDatePopover from "./DueDatePopover"
import Popover from "../shared/Popover";
import CardDueDate from "./CardDueDate"
import CardTitle from "./CardTitle";
import CardAcitivity from "./CardActivity";

const Card = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const cards = useSelector((state) => state.cards)
  const [popover, setPopover] = useState({type: '', attachedTo: "", visible: false})
  let card = cards.find(card => card._id === id)
  
  const popoverChildren = () => {
  const { visible, type } = popover

  if (visible && type) {
    if (type === "due-date") {
      return (<DueDatePopover dueDate={card.dueDate} setPopover={setPopover} />)
    } else  if (type === "labels") {
      return (<LabelsPopover labels={card.labels} setPopover={setPopover} />)
    }
  }
  
}

  useEffect(() => {
    dispatch(fetchCard({id}))
  },[id, dispatch])

  if (!card) return null 

  return (
    <>
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={`/boards/${card.boardId}`} >
          <i className="x-icon icon close-modal" ></i>
        </Link>
        <header>
          <CardTitle card={card}/>          
          <p>
            in list <a className="link">Stuff to try (this is a list)</a>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <CardLabels card={card} setPopover={ setPopover }/>
                { card.dueDate ? (<CardDueDate card={card} />) : null }
              </ul>
              <CardDescription card={card}/>
            </li>
            <CommentForm card={card} />
            <CardAcitivity card={card} />
          </ul>
        </section>
        <CardSidebar setPopover={setPopover}/>        
      </div>
    </div>
      <Popover {...popover}>{popoverChildren()}</Popover>
    </>
  );
};

export default Card;
