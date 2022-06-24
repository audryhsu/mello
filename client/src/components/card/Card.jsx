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
          <i className="card-icon icon .close-modal"></i>
          <textarea className="list-title" style={{ height: "45px" }} value={card.title}>
          </textarea>
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
            <CommentForm />
            <li className="activity-section">
              <h2 className="activity-icon icon">Activity</h2>
              <ul className="horiz-list">
                <li className="not-implemented">Show Details</li>
              </ul>
              <ul className="modal-activity-list">
                <li>
                  <div className="member-container">
                    <div className="card-member">TP</div>
                  </div>
                  <h3>Taylor Peat</h3>
                  <div className="comment static-comment">
                    <span>The activities are not functional.</span>
                  </div>
                  <small>
                    22 minutes ago - <span className="link">Edit</span> -{" "}
                    <span className="link">Delete</span>
                  </small>
                  <div className="comment">
                    <label>
                      <textarea required="" rows="1">
                        The activities have not been implemented yet.
                      </textarea>
                      <div>
                        <a className="light-button card-icon sm-icon"></a>
                        <a className="light-button smiley-icon sm-icon"></a>
                        <a className="light-button email-icon sm-icon"></a>
                      </div>
                      <div>
                        <p>You haven&apos;t typed anything!</p>
                        <input
                          type="submit"
                          className="button not-implemented"
                          value="Save"
                          onChange={() => null}
                          />
                        <i className="x-icon icon"></i>
                      </div>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="member-container">
                    <div className="card-member small-size">VR</div>
                  </div>
                  <p>
                    <span className="member-name">Victor Reyes</span> changed the
                    background of this board <small>yesterday at 4:53 PM</small>
                  </p>
                </li>
                <li className="activity-comment">
                  <div className="member-container">
                    <div className="card-member">VR</div>
                  </div>
                  <h3>Victor Reyes</h3>
                  <div className="comment static-comment">
                    <span>Example of a comment.</span>
                  </div>
                  <small>
                    22 minutes ago - <span className="link">Edit</span> -{" "}
                    <span className="link">Delete</span>
                  </small>
                  <div className="comment">
                    <label>
                      <textarea required="" rows="1">
                        Example of a comment.
                      </textarea>
                      <div>
                        <a className="light-button card-icon sm-icon"></a>
                        <a className="light-button smiley-icon sm-icon"></a>
                        <a className="light-button email-icon sm-icon"></a>
                      </div>
                      <div>
                        <p>You haven&apos;t typed anything!</p>
                        <input
                          type="submit"
                          className="button not-implemented"
                          value="Save"
                          onChange={() => null}
                          />
                        <i className="x-icon icon"></i>
                      </div>
                    </label>
                  </div>
                </li>
              </ul>
            </li>
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
