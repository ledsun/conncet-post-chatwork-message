This is middleware for [conncet](https://github.com/senchalabs/connect). This post message to [Chatwork](chatwork.com) according to a chatwork property of request.

# Usage

## Install
```
npm Install conncet-post-chatwork-message
```

## Initiate

Set API Token.
See [docment of the Chatwork](http://developer.chatwork.com/ja/authenticate.html) about detail of API Token.

```
postChatwork(YOUR_TOKEN)
```

## Set chatwork property to reqeust

```
req.chatwork = {
  roomId: YOUR_ROOM_ID,
  message: "test message"
}
```


# example
## source code
```js
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
```

## to run

Start a server.

```
cd expample
npm install
env CHATWORK_TOKEN=YOUR_TOKEN CHATWORK_ROOM_ID=YOUR_ROOM_ID npm start
```

Send a request

```
curl -X GET http://localhost:3000
```

# test
```
env CHATWORK_TOKEN=YOUR_TOKEN CHATWORK_ROOM_ID=YOUR_ROOM_ID npm test
```
