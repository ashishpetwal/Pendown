const connectToMongo = require("./db");
const cors = require('cors');
connectToMongo();

const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors());

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  app.get('/', (req,res)=>{
    app.use(express.static(path.resolve(__dirname,'client','build')));
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })

}

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})