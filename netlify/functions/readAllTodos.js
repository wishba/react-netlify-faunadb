const { default: fetch } = require("node-fetch")

exports.handler = async (event, context) => {
  const { userId } = JSON.parse(event.body)

  const query = `
    query FindAllTodosById {
      allTodosById (
        userId: "${userId}"
      ) {
        data {
          _id
          timeStamp
          userId
          title
          completed
        }
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
      body: 'Failed to read all todo items.',
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(await response.json()),
  }
}
