import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleLikeBtn, deleteComment} = props
  const {id, name, comment, isLiked, bgColor} = commentDetails
  const time = formatDistanceToNow(new Date())

  const onLikeBtnClickd = () => {
    toggleLikeBtn(id)
  }

  const onClickedDeleteIcon = () => {
    deleteComment(id)
  }

  const likeImageTextClassName = isLiked ? 'liked-text' : ''

  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li className="list-item-container">
      <div className="comment-item">
        <div className={`letter-icon ${bgColor}`}>
          <p className="letter">R</p>
        </div>
        <div className="comment-details">
          <div className="name-and-time-container">
            <p className="name">{name}</p>
            <p className="time">{time}</p>
          </div>
          <div className="comment-container">
            <p className="comment">{comment}</p>
          </div>
        </div>
      </div>
      <div className="like-and-delete-container">
        <div className="like-container">
          <button
            type="button"
            className="like-btn button"
            onClick={onLikeBtnClickd}
          >
            <img src={likeImageUrl} alt="like" className="like-image" />
          </button>
          <p className={`like-image-text ${likeImageTextClassName}`}>Like</p>
        </div>
        <button
          type="button"
          className="delete-btn button"
          onClick={onClickedDeleteIcon}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
