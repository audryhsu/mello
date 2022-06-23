import { useState } from "react"

const CommentForm = () => {
  const [comment, setComment] = useState("")
  const handleSubmitComment = (e) => {
    e.preventDefault()
    return null
  }
  /*
  TODO: POST request to submit comment
  {
  "cardId": 9,
  "comment": {
    "text": "This is my comment"
  }
} */
  return (
    <li className="comment-section">
    <h2 className="comment-icon icon">Add Comment</h2>
    <div>
      <div className="member-container">
        <div className="card-member">TP</div>
      </div>
      <div className="comment">
        <label>
          <textarea
            required=""
            rows="1"
            placeholder="Write a comment..."
            value={comment}
            onChange={ (e) => setComment(e.target.value) }
            ></textarea>
          <div>
            <a className="light-button card-icon sm-icon"></a>
            <a className="light-button smiley-icon sm-icon"></a>
            <a className="light-button email-icon sm-icon"></a>
            <a className="light-button attachment-icon sm-icon"></a>
          </div>
          <div>
            <input
              type="submit"
              className="button not-implemented"
              value="Save"
              onSubmit={ handleSubmitComment }
              />
          </div>
        </label>
      </div>
    </div>
  </li>
  )
}

export default CommentForm;