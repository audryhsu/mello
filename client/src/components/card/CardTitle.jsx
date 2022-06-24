import React from "react"

const CardTitle = ({title}) => {
  return (
    <>
      <i className="card-icon icon .close-modal"></i>
      <textarea className="list-title" style={{ height: "45px" }} value={title}>
      </textarea>
    </>
  )
}

export default CardTitle;