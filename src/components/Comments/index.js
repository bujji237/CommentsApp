import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsCount: 0,
    name: '',
    comment: '',
    commentsList: [],
  }

  toggleLikeBtn = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState(prevState => ({
      commentsList: filteredCommentsList,
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  onChangeInputField = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onChangeTextAreaField = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  onCommentAdded = event => {
    event.preventDefault()
    const randomNumberToColor = Math.floor(Math.random() * 7)
    const colorBasedOnNumber =
      initialContainerBackgroundClassNames[randomNumberToColor]
    const {name, comment} = this.state
    if (name !== '' && comment !== '') {
      const newComment = {
        id: uuidv4(),
        name,
        comment,
        isLiked: false,
        bgColor: colorBasedOnNumber,
      }
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        name: '',
        comment: '',
        commentsCount: prevState.commentsCount + 1,
      }))
    }
  }

  render() {
    const {commentsCount, commentsList, name, comment} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Comments</h1>
        <div className="image-and-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comment-image"
          />
          <form onSubmit={this.onCommentAdded} className="submit-form">
            <p className="info">Say something about 4.0 Technologies</p>
            <input
              type="text"
              className="name-input-field"
              placeholder="Your Name"
              onChange={this.onChangeInputField}
              value={name}
            />
            <textarea
              type="textarea"
              className="comment-input-field"
              placeholder="Your Comment"
              onChange={this.onChangeTextAreaField}
              value={comment}
            >
              hai
            </textarea>
            <button type="submit" className="submit-btn">
              Add Comment
            </button>
          </form>
        </div>
        <div className="comments-container">
          <div className="comments-count-container">
            <p className="comment-count">{commentsCount}</p>
            <p className="comment-const-text">Comments</p>
          </div>
          <ul className="comments-list-container">
            {commentsList.map(eachComment => (
              <CommentItem
                commentDetails={eachComment}
                key={eachComment.id}
                toggleLikeBtn={this.toggleLikeBtn}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
