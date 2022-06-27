import { useSelector } from "react-redux";
import BoardCard from './BoardCard';


const CardsContainer = ({list}) => {
  const cards = useSelector((state) => state.cards)
  const listCards = cards.filter(card => card.listId === list._id)

  if (!listCards) return null
  return (
    <div id="cards-container" data-id="list-1-cards">
      {listCards.map(card => {
        return (
          <BoardCard key={card._id} cardInfo={card}></BoardCard>
        )
      })}
    </div>
  )
}

export default CardsContainer;