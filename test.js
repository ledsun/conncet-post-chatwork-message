import connect from 'connect'
import postChatwork from './src'
import http from "http"
import request from 'superagent'
import assert from 'power-assert'
import postChatworkMessage from 'post-chatwork-message'

describe('conncet-post-chatwork-message', () => {
  let server

  beforeEach((done) => {
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

    server = http.createServer(app).listen(3000, () => {
      // Flush messages before test.
      postChatworkMessage
        .getRecents(process.env.CHATWORK_TOKEN, process.env.CHATWORK_ROOM_ID)
        .then(() => done())
    })
  })

  afterEach(() => {
    server && server.close()
  })

  it("should post one message", (done) => {
    request
      .post('http://localhost:3000')
      .end((err, res) => {
        assert.equal(err, null)

        // Get messages after previous request by the ChatWork API.
        postChatworkMessage
          .getRecents(process.env.CHATWORK_TOKEN, process.env.CHATWORK_ROOM_ID)
          .then((res) => {
            assert.equal(res.body.length, 1)
            assert.equal(res.body[0].body, 'test message')
            done()
          })
      })
  })
})
