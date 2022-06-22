import React from "react";
import { Link } from "react-router-dom";
import CardLabelsBoardCard from "./CardLabelsBoardView";

const BoardCard = ({cardInfo}) => {
  
  return (
    <div className="card-background">
      <Link to={`/cards/${cardInfo._id}`}>
      <div className="card ">
        <i className="edit-toggle edit-icon sm-icon"></i>
        <div className="card-info">
          <CardLabelsBoardCard labels={cardInfo.labels}/>
          <p>
            {cardInfo.title}
          </p>
        </div>
        <div className="card-icons">
          {cardInfo.dueDate ? 
          (<i className="clock-icon sm-icon overdue-recent completed">
            {cardInfo.dueDate}
          </i>)
          : null }
          <i className="description-icon sm-icon"></i>
          <i className="comment-icon sm-icon"></i>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default BoardCard;
