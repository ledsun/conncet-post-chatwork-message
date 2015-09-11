import postChatworkMessage from 'post-chatwork-message'

/**
 * This is middleware for [conncet](https://github.com/senchalabs/connect). This post message to chatwork(chatwork.com) according to a chatwork property of request.
 * @param {string} chatworkApiToken - ChatWork API Token. See [docment of the Chatwork](http://developer.chatwork.com/ja/authenticate.html).
 * @return {function} post Chatwork Message middleware. req.chatwork is paramer object for this middleware.
 * - req.chatwork.roomId {string} - the roomId of ChatWork.
 * - req.chatwork.message {string} - a message to be sent.
 */
export default function(chatworkApiToken) {
  return function(req, res, next) {
    if (req.chatwork) {
      postChatworkMessage(chatworkApiToken, req.chatwork.roomId, req.chatwork.message)
        .catch((err) => next(err))
        .then(() => next())
    }
  }
}
