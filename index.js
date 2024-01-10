import express from "express"
import cors from 'cors'
import reqRoute from "./routes/uiRequest.js"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(cors());
app.use('/', reqRoute);

app.get('/', (req, res) => {
  res.send("hello world!!");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})