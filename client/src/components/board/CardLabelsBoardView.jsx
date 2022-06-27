const CardLabelsBoardCard = ({labels}) => {
  const colors = ["green", "yellow", "orange", "blue", "purple", "red"]
  return (
    colors.map(color => {
      const labelClass = `card-label ${color} colorblindable`
      if (labels.includes(color)) {
       return <div key={color} className={labelClass}></div>
      }
    })
  )
}

export default CardLabelsBoardCard;