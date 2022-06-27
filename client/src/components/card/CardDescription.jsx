import { useState } from "react"
import { useDispatch } from "react-redux";
import { editCard } from "../../features/cards/cards";


const CardDescription = ({card}) => {
  const dispatch = useDispatch()
  const [ editDescriptionVisible, setEditDescriptionVisible ] = useState(false)
  const [ cardDescription, setCardDescription ] = useState(card.description || "")

  const handleEditDescriptionVis = () => {
    setEditDescriptionVisible(true)
  }
  const handleCancelEditDescription = () => {
    setEditDescriptionVisible(false)
    setCardDescription(card.description || "")
  }
  
  const handleSaveDescription = () => {
    const updatedCard = {
      card: { description: cardDescription }
    }
    dispatch(editCard({ cardId: card._id, updatedCard, callback: () => setEditDescriptionVisible(false) }))
  }

  const textAreaVal = cardDescription === "" ? (card.description || "") : cardDescription
  return (
    <form className="description">
      <p>Description</p>
      { editDescriptionVisible ? 
        (
          <><textarea className="textarea-toggle" rows="1"
            onChange={(e) => setCardDescription(e.target.value) }
            value= { textAreaVal }
          ></textarea>
          <div><div className="button" value="Save"
          onClick={ handleSaveDescription }>Save</div>
          <i className="x-icon icon" onClick={ handleCancelEditDescription }></i></div></>
        ) : 
        ( <><span id="description-edit" className="link"
          onClick={ handleEditDescriptionVis }>
          Edit
        </span><p className="textarea-overlay">
            { textAreaVal }
          </p>
        </> 
        )
      }
      <p id="description-edit-options" className="hidden">
        You have unsaved edits on this field.{" "}
        <span className="link">View edits</span> -{" "}
        <span className="link">Discard</span>
      </p>
    </form>
  )
}

export default CardDescription;