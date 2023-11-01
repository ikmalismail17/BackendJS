import express from "express"
import cors from 'cors'
import dataRoute from "./routes/data.js"
import reqRoute from "./routes/uiRequest.js"
// const corsOptions = {
//   origin: "http://localhost:5173",
//   optionsSuccessStatus: 200, 
// };

const app = express()
const port = 3000

app.use(cors());
app.use('/', dataRoute);
app.use('/', reqRoute);

app.get('/', (req, res) => {
  res.send("hello world!!");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})