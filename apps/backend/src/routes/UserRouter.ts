import express from "express";
import User from "shared/src/models/User";
import auth from "../middlewares/auth";

const router = express.Router();


// Store User
router.post("/user/store", async (req:any, res:any) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    console.log("Generated Token in api ", token);
    
    res.send({user, token});
    res.status(200);
    console.log("user created");
  } catch (err) {
    res.status(400).send(err);    
    console.log("Error creating user", err);
  }
});
// Get Authenticated User
router.get("/user/me", auth, async (req:any, res:any) => {
  res.send(req.user);
  res.status(200);
  console.log("Fetched user");
});
// Login User
router.post("/user/login" ,async (req:any,res:any)=>{
  try{
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user, token});
    res.status(200);
    console.log("user logged in");
  }
  catch(err){
    res.status(400).send("Error logging in user");
    console.log("Error logging in user");
  }
})
// Logout User
router.post("/user/logout", auth ,async (req:any,res:any)=>{
  try{
    const user = req.user;
    user.tokens = user.tokens.filter((token:any)=> token.token !== req.token);
    await user.save();
    res.status(200).send("Logged out sucessfully!");
    console.log("user logged out");
  }
  catch(err){
    res.status(500).send("Error logging out user");
    console.log("Error logging out user");
  }
})
// Logout all sessions of User
router.post("/user/logoutAll", auth ,async (req:any,res:any)=>{
  try{
    const user = req.user;
    user.tokens = [];
    await user.save();
    res.status(200).send("Logged out of all sessions sucessfully!");
    console.log("user logged out of all sessions");
  }
  catch(err){
    res.status(500).send("Error logging out user");
    console.log("Error logging out user");
  }
})

export default router;
