import connect from 'connect'
import postChatwork from 'conncet-post-chatwork-message'

let app = connect()
  .use((req, res, next) => {
    req.chatwork = {
      roomId: process.env.CHATWORK_ROOM_ID,
      message: "test message"
    }
    next()
  })
  .use(postChatwork(process.env.CHATWORK_TOKEN))
  .use((req, res) => res.end('OK'))
  .use((err, req, res, next) => {
    console.error(err.stack)
    res.statusCode = 500
    res.end('Something broke!')
  })
  .listen(process.env.PORT || 3000);
