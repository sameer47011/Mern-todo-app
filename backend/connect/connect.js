const mongoose = require('mongoose');

const connect = async () => {
  try {
    // await mongoose.connect('mongodb+srv://jdrsaimansari:sameeransari@cluster1.x0kdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1').then(()=>{
    //   console.log("Connected to MongoDB");

    // })

    await mongoose.connect('mongodb+srv://jdrsaimansari:sameeransari@cluster1.x0kdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1').then(()=>{
      console.log("Connected to MongoDB");

    })
  } catch (error) {
    // console.error("Error connecting to MongoDB:", error.message);
  res.status(400).json({
    message:"Not Connected"
  })  
  }
};

connect();

