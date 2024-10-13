// const router = require('express').Router();
// const User = require('../models/user');
// const bcrypt = require('bcryptjs')
// // SIGN UP

// router.post("/register",async (req,res)=>{
//   try {
//     const {email,username,password}= req.body;
//     const hashpassword  = bcrypt.hashSync(password)
//     const user = new User({ email, username, password:hashpassword });

//     await user.save().then(()=>res.status(200).json({message:"Sign up SuccessFully"})
//     );

//   } catch (error) {
//     res.status(200).json({message:"User already exist"})
//   }
// })




// // SIGN IN 
// router.post("/sign-in", async(req,res)=>{
//   try {
//     const {email,password} = req.body;
//     const user = await User.findOne({email})
//     if (!user) {
//       res.status(400).json({message:"Please Sign Up First"});
//     }
//     const isPasswordCorrect = bcrypt.compareSync(
//       password,user.password
//     );
//     if(!isPasswordCorrect){
//       res.status(400).json({
//         message:"Passoword is not correct"
//       });
//     }
//     const {passwords,...others} = user._doc;
//     res.status(200).json({others})
//   } catch (error) {
//     res.status(400).json({
//       message:"User Already exists"
//     })
    
//   }
// })

// module.exports=router








const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Pehle check karein agar user pehle se exist karta hai
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    // Agar user exist nahi karta toh naya user create karen
    const hashpassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashpassword });

    await user.save();
    res.status(200).json({ message: "Sign up Successfully" });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// SIGN IN
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: "Please Sign Up First" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(200).json({ message: "Password is not correct" });
    }
    const { password: _, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
