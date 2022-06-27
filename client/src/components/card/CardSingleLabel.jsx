const CardSingleLabel = ({color}) => {

  const labelColorClass = `${color} label colorblindable`
  return (
    <div className="member-container">
      <div className={labelColorClass}></div>
    </div>
  )
}

export default CardSingleLabel;