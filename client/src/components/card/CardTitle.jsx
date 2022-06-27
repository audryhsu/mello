import React from "react"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCard } from "../../features/cards/cards";

const CardTitle = ({card}) => {
  const [title, setTitle] = useState(card.title)
  const dispatch = useDispatch()

  const handleSaveTitle = () => {
    dispatch(editCard({
      cardId: card._id,
      updatedCard: {
        card: { title }
      }
    }))
  }

  return (
    <>
      <i className="card-icon icon .close-modal"></i>
      <textarea className="list-title" style={{ height: "45px" }}
      value={title}
      onChange={ (e) => setTitle(e.target.value) }
      onBlur={ handleSaveTitle }
      >
      </textarea>
    </>
  )
}

export default CardTitle;