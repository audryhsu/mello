import CardSingleLabel from "./CardSingleLabel";

const CardLabels = ({card}) => {
  const colors = ["green", "yellow", "orange", "blue", "purple", "red"]
  return (
    <li className="labels-section">
      <h3>Labels</h3>
      { colors.map(color => {
        const applied = card.labels.includes(color)
        if (applied) {
          return <CardSingleLabel key={color} color={color} />
        }
      })}
      {/* <div className="member-container">
        <div className="green label colorblindable"></div>
      </div>
      <div className="member-container">
        <div className="yellow label colorblindable"></div>
      </div>
      <div className="member-container">
        <div className="orange label colorblindable"></div>
      </div>
      <div className="member-container">
        <div className="blue label colorblindable"></div>
      </div>
      <div className="member-container">
        <div className="purple label colorblindable"></div>
      </div>
      <div className="member-container">
        <div className="red label colorblindable"></div>
      </div> */}
      <div className="member-container">
        <i className="plus-icon sm-icon"></i>
      </div>
    </li>
  )
}

export default CardLabels;