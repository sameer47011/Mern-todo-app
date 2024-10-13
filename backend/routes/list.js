// const router = require("express").Router();
// const User = require("../models/user")
// const List = require('../models/list');

// // create
// router.post("/addTask",async(req,res)=>{
//  try {
//   const {title,body,email} = req.body;
//   const existingUser = await User.findOne({email});
//   if(existingUser){
//     const list = new List({title,body,user:existingUser});
//     await list.save().then(()=>res.status(200).json({list}))
//     existingUser.list.push(list);
//     existingUser.save();

//   }
//  } catch (error) {
//   console.log(error);
  
//  }
// });

// // Update Task

// router.put('/updateTask/:id',async(req,res)=>{
//   try {
//     const {title,body,email} =req.body;
//     const existingUser = await User.findOne({email})
//     if (existingUser) {
//       const list = await List.findByIdAndUpdate(req.params.id,{title,body})
//       list.save().then(()=>res.status(200).json({message:"Task Updated successfully"}))
      
//     }
//   } catch (error) {
//    console.log(error);
    
//   }
// });



// // Delete Task 

// router.delete("/deletedTask/:id",async(req,res)=>{
//   try {
//     const {email} = req.body;
//     const existingUser = await User.findOne({email});
//     if (existingUser) {
//       await List.findByIdAndDelete(req.params.id)
//       .then(()=>res.status(200).json({message:"Deleted Task Successfully"}));
//     } else {
//       res.status(404).json({message: "User not found"});
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({message: "Server error"});
//   }
// });

// module.exports = router














const router = require("express").Router();
const User = require("../models/user");
const List = require('../models/list');

// Create Task (Add Task)
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id)

    if (existingUser) {
      const list = new List({
        title,
        body,
        user: existingUser._id,  // Storing the user ID in the task
      });
      await list.save();
      existingUser.list.push(list);
      await existingUser.save();  // Save updated user with new task in list

      res.status(200).json({ message: "Task added successfully", list });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update Task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        { title, body },
        { new: true }
      );

      if (updatedList) {
        res.status(200).json({ message: "Task updated successfully", updatedList });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Task
router.delete("/deletedTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}});

    if (existingUser) {
      const deletedList = await List.findByIdAndDelete(req.params.id);

      if (deletedList) {
        res.status(200).json({ message: "Task deleted successfully" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


// GET TASK 

router.get('/getTasks/:id',async (req,res)=>{
  const list = await List.find({user:req.params.id}).sort({createdAt:-1});
if (list.length!==0) {
  res.status(200).json({list:list})

  
}else{
  res.status(200).json({message:"No Task Added"})

}
  
})
module.exports = router;
