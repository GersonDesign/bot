// Call Recast.AI SDK, through /converse route
request.converseText(text, { conversationToken: senderId })
.then(result => {
  /*
  * YOUR OWN CODE
  * Here, you can add your own process.
  * Ex: You can call any external API
  * Or: Update your mongo DB
  * etc...
  */
  if (result.action) {
    console.log('The conversation action is: ', result.action.slug)
  }

  // If there is not any message return by Recast.AI for this current conversation
  if (!result.replies.length) {
    message.addReply({ type: 'text', content: 'I don't have the reply to this yet :)' })
  } else {
    // Add each reply received from API to replies stack
    result.replies.forEach(replyContent => message.addReply({ type: 'text', content: replyContent }))
  }

  // Send all replies
  message.reply()
  .then(() => {
    // Do some code after sending messages
  })