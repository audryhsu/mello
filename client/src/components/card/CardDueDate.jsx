import { useDispatch } from "react-redux";
import { editCard } from "../../features/cards/cards";

const CardDueDate = ({ card }) => {
  const dispatch = useDispatch()
  
  let isPastDue = false;
  if (card.dueDate) {
    const dueDateObj = new Date(card.dueDate)
    isPastDue = (new Date() - dueDateObj) > 0;
  }
  
  let dueDateDisplayClass = isPastDue ? `overdue` : ""
  dueDateDisplayClass = card.completed ? `${dueDateDisplayClass} completed` : dueDateDisplayClass;

  const handleToggleComplete = (e) => {
    e.preventDefault();
    dispatch(editCard({
      cardId: card._id,
      updatedCard: {
        card: { completed: !card.completed}
      }
    }))

  }
  return (
    <li className="due-date-section">
      <h3>Due Date</h3>
      <div id="dueDateDisplay" className={ dueDateDisplayClass }>
        <input
          id="dueDateCheckbox"
          type="checkbox"
          className="checkbox"
          checked={card.completed}
          onChange={ handleToggleComplete }
          value={card.dueDate}
          />
        {card.dueDate} 
        { isPastDue ? 
          (<span>( past due)</span>) : null
        }
      </div>
    </li>
  )
}

export default CardDueDate;