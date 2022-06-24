import CardSingleLabel from "./CardSingleLabel";

const CardLabels = ({card, setPopover }) => {
  const colors = ["green", "yellow", "orange", "blue", "purple", "red"]

  const handleShowLabelsPopover = (e) => {
    console.log('target from cardLabels', e.target)

    setPopover({type: "labels", attachedTo: e.target, visible: true})
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