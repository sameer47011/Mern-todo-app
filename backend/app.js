const express = require('express');
const app = express();
const cors = require('cors')
require('./connect/connect')
const auth = require('./routes/auth')
const list = require('./routes/list')
app.use(express.json())
app.use(cors())

app.get('/',function(req,res){
  res.send("Hello everyone")
})
app.use('/api/v1',auth)
app.use('/api/v2',list)

app.listen(1000,()=>{
  console.log("server is started");
  
})