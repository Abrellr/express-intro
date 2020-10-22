const express = require('express')
const bodyParser = require('body-parser')
const noodlesRouter = require('./noodlesRouter')
const app = express()

app.use(bodyParser.json())
app.use('/api/noodles', noodlesRouter)

// Build the server
app.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});