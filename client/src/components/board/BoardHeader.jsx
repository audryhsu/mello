const BoardHeader = ({boardTitle}) => {
  return (
    <>
      <ul>
        <li id="title">{boardTitle}</li>
        <li className="star-icon icon"></li>
        <li className="private private-icon icon">Private</li>
      </ul>
      <div className="menu">
        <i className="more-icon sm-icon"></i>Show Menu
      </div>
      <div className="subscribed">
        <i className="sub-icon sm-icon"></i>Subscribed
      </div>
    </>
  )
}

export default BoardHeader;