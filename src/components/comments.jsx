import React, { useState } from "react"
import { format, parseISO } from "date-fns"

import styles from "./comments.module.scss"

const Comments = (data) => {

  const validateEmail = (email) => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }

  //state variables for form input errors
  const [commentTextOrRatingError, setCommentTextOrRatingError] = useState(false)
  const [commentNameFieldError, setCommentNameFieldError] = useState(false)
  const [commentHandleFieldError, setCommentHandleFieldError] = useState(false)
  const [replyTextError, setReplyTextError] = useState(false)
  const [replyNameFieldError, setReplyNameFieldError] = useState(false)
  const [replyHandleFieldError, setReplyHandleFieldError] = useState(false)

  //state variables for form input
  const [form, setForm] = useState()
  const [rating, setRating] = useState()
  const [comment, setComment] = useState({ "replies": [] })
  const [reply, setReply] = useState({})

  const handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    comment[name] = val.trim()
    setComment(comment)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (comment.name && comment.name !== "" && comment.handle && comment.handle !== "" && validateEmail(comment.handle) && (rating || (comment.text && comment.text !== ""))) {
      e.target.reset()

      if (rating) {
        data.handleRatingsUpdate({ name: comment.name, handle: comment.handle, date: new Date().toISOString(), ratingValue: rating })
        setRating()
      }

      if (comment.text && comment.text !== "") {
        comment.date = new Date().toISOString()
        data.handleCommentsUpdate(comment)
        setComment({ "replies": [] })
      }

      //reset state variables
      setCommentNameFieldError(false)
      setCommentHandleFieldError(false)
      setCommentTextOrRatingError(false)
    }
    //handle errors
    else {
      console.log("Validation error")
      if (!comment.name || comment.name === "")
        setCommentNameFieldError(true)
      else
        setCommentNameFieldError(false)

      if (!comment.handle || comment.handle === "" || !validateEmail(comment.handle))
        setCommentHandleFieldError(true)
      else
        setCommentHandleFieldError(false)

      if (rating || !comment.text || comment.text !== "")
        setCommentTextOrRatingError(true)
      else
        setCommentTextOrRatingError(false)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    setForm(parseInt(e.target.id))
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setForm()
  }

  const handleReplyChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    reply[name] = val.trim()
    setReply(reply)
  }

  const handleReplySubmit = (e) => {
    e.preventDefault();

    if (reply.name && reply.name !== "" && reply.handle && reply.handle !== "" && validateEmail(reply.handle) && reply.text && reply.text !== "") {
      reply.date = new Date().toISOString()
      data.handleRepliesUpdate(e.target.id, reply)

      //reset state variables
      setReply({})
      setForm()
      setReplyNameFieldError(false)
      setReplyHandleFieldError(false)
      setReplyTextError(false)
    }
    //handle errors
    else {
      console.log("Validation error")
      if (!reply.name || reply.name === "")
        setReplyNameFieldError(true)
      else
        setReplyNameFieldError(false)

      if (!reply.handle || reply.handle === "" || !validateEmail(reply.handle))
        setReplyHandleFieldError(true)
      else
        setReplyHandleFieldError(false)

      if (!reply.text || reply.text !== "")
        setReplyTextError(true)
      else
        setReplyTextError(false)
    }
  }

  const handleStarClick = (e) => {
    setRating(parseInt(e.target.id))
  }

  var count = 0;

  return (
    <section id="comments" className={styles.commentsSection}>
      <h2>Comments {data.comments && "(" + data.comments.length + ")"}</h2>
      <div className={styles.formContainer}>
        {commentNameFieldError && <p className={styles.errorMessage}>Please provide a name</p>}
        {commentHandleFieldError && <p className={styles.errorMessage}>Please provide a valid email</p>}
        {commentTextOrRatingError && <p className={styles.errorMessage}>Please submit a comment and/or a rating</p>}
        <p>Rate this recipe!</p>
        <div className={styles.starsContainer}>
          <span role="presentation" className={rating >= 5 ? styles.filled : ""} id="5" onClick={handleStarClick}>☆</span>
          <span role="presentation" className={rating >= 4 ? styles.filled : ""} id="4" onClick={handleStarClick}>☆</span>
          <span role="presentation" className={rating >= 3 ? styles.filled : ""} id="3" onClick={handleStarClick}>☆</span>
          <span role="presentation" className={rating >= 2 ? styles.filled : ""} id="2" onClick={handleStarClick}>☆</span>
          <span role="presentation" className={rating >= 1 ? styles.filled : ""} id="1" onClick={handleStarClick}>☆</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className="clip" htmlFor="name">Your Name*</label>
          <input onChange={handleChange} className={commentNameFieldError ? styles.formInputError : styles.formInput} type="text" name="name" id="name" placeholder="Your Name*" />
          <label className="clip" htmlFor="handle">Your Email*</label>
          <input onChange={handleChange} className={commentHandleFieldError ? styles.formInputError : styles.formInput} type="email" name="handle" id="handle" placeholder="Your Email*" />
          <label className="clip" htmlFor="text">Your Message</label>
          <textarea onChange={handleChange} className={styles.formInput} type="text" name="text" id="text" placeholder="Your Message" rows="5" />
          <input className={styles.formSubmit} type="submit" name="submit" id="submit" value="Submit" />

        </form>
      </div>
      {
        data.comments
          &&
          data.comments.length === 0
          ?
          <p>No comments yet</p>
          :
          data.comments.map(comment =>
            <div className={styles.comment}>
              <div className={styles.mainComment}>
                <div className={styles.commentHead}>
                  <strong>{comment.name}</strong>
                  <p>{format(parseISO(comment.date), "MMMM do, yyyy")}</p>
                </div>
                <p>{comment.text}</p>
                <a href="/#" id={count++} onClick={handleClick}>Reply</a>
              </div>
              <div className={styles.commentReplies}>
                {
                  comment.replies
                  &&
                  comment.replies.map(reply =>
                    <div className={styles.reply}>
                      <div className={styles.commentHead}>
                        <strong>{reply.name}</strong>
                        <p>{format(parseISO(reply.date), "MMMM do, yyyy")}</p>
                      </div>
                      <p>{reply.text}</p>
                    </div>
                  )
                }
              </div>
              {
                form === (count - 1)
                &&
                <div className={styles.formContainer}>
                  {replyNameFieldError && <p className={styles.errorMessage}>Please provide a name</p>}
                  {replyHandleFieldError && <p className={styles.errorMessage}>Please provide a valid email</p>}
                  {replyTextError && <p className={styles.errorMessage}>Please submit a reply</p>}
                  <a href="/#" onClick={handleCancel}>Cancel reply</a>
                  <form id={form} className={styles.form} onSubmit={handleReplySubmit}>
                    <label className="clip" htmlFor="name">Your Name</label>
                    <input onChange={handleReplyChange} className={replyNameFieldError ? styles.formInputError : styles.formInput} type="text" name="name" id="name" placeholder="Your Name*" />
                    <label className="clip" htmlFor="handle">Your Email</label>
                    <input onChange={handleReplyChange} className={replyHandleFieldError ? styles.formInputError : styles.formInput} type="email" name="handle" id="handle" placeholder="Your Email*" />
                    <label className="clip" htmlFor="text">Your Message</label>
                    <textarea onChange={handleReplyChange} className={replyTextError ? styles.formInputError : styles.formInput} type="text" name="text" id="text" placeholder="Your Message*" rows="5" />
                    <input className={styles.formSubmit} type="submit" name="submit" id="submit" value="Reply" />
                  </form>
                </div>
              }
            </div>
          )
      }
    </section>
  )
}

export default Comments
