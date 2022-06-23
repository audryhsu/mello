import CardSingleLabel from "./CardSingleLabel";

const CardLabels = ({card, setLabelsPopoverVis }) => {
  const colors = ["green", "yellow", "orange", "blue", "purple", "red"]
  const handleShowLabelsPopover = () => {
    setLabelsPopoverVis(true)
  }

  return (
    <li className="labels-section">
      <h3>Labels</h3>
      { colors.map(color => {
        const applied = card.labels.includes(color)
        if (applied) {
          return <CardSingleLabel key={color} color={color} />
        }
      })}

      <div className="member-container">
        <i className="plus-icon sm-icon" onClick={ handleShowLabelsPopover }></i>
      </div>
    </li>
  )
}

export default CardLabels;