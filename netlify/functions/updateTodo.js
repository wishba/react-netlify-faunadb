const { default: fetch } = require("node-fetch")

exports.handler = async (event, context) => {
  const { todoId, timeStamp, userId, title, completed } = JSON.parse(event.body)

  const query = `
    mutation UpdateTodo {
      updateTodo(
        id: "${todoId}"
        data: {
          timeStamp: "${timeStamp}"
          userId: "${userId}"
          title: "${title}"
          completed: ${completed}
        }
      ) {
        _id
        timeStamp
        userId
        title
        completed
      }
    }
  `

  const response = await fetch('https://graphql.fauna.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}` },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: 'Failed to update a todo item.',
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(await response.json()),
  }
}
