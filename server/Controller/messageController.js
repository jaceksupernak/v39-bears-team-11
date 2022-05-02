// import the Message model
const Message = require('../models/message')

// controller to fetch user messages
const getMessageController = async (req, res, next) => {
  // get the user id from the request body
  const { user_id: id } = req.params

  // if there is no user id in the request,
  // throw client error
  if (!id) {
    const error = new Error({
      name: 'ValidationError',
      message: 'User_id field is required!',
      statusCode: 400,
    })
    next(error)
  }

  // if there is an id, then
  try {
    // query the database for a match
    const result = await Message.find({ sender: id, reciever: id })
    // if there is a match, send 200 status with result
    res.status(200).send(result)
  } catch (error) {
    // if there is an error, pass it to the error middleware
    next(error)
  }
}

// controller to send user messages
const postMessageController = async (req, res, next) => {
  // get the request payload
  const {
    userId, friendId, content, timestamp,
  } = req.body

  // check if there is no message,
  // and if so pass control to the error handling middleware
  if (![userId, friendId, content, timestamp].every(Boolean)) {
    const error = new Error({
      name: 'ValidationError',
      message: 'Message object cannot be empty!',
      statusCode: 400,
    })
    next(error)
  }

  // if there is a message in the request, then
  try {
    // create messageSchema object
    const message = {
      content,
      reciever: friendId,
      sender: userId,
      timestamp,
    }
    // create a new message based on messageSchema
    const newMessage = new Message(message)
    // save the message in the database
    const result = await newMessage.save()
    // send a resource created response together with the new message
    res.status(201).send(result)
  } catch (error) {
    // if the operation is unsuccessful,
    // pass the error to the error middlware
    next(error)
  }
}

module.exports = {
  getMessageController,
  postMessageController,
}
