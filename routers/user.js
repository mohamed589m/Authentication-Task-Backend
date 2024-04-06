const express = require("express");
const User = require("../models/user");

const router = express.Router();

//post method
router.post("/users", (req, res) => {
  console.log(req.body);

  const user = new User(req.body);

  user
    .save()
    .then((user) => res.status(200).send(user))
    .catch((e) => res.status(400).send(e));
});
/* ************************************************************** */
//get method
router.get("/users", (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => res.status(500).send(e));
});
/* ************************************************************** */
//get method by Id
router.get("/users/:id", (req, res) => {
  console.log(req.params);
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("Unable to find user");
      }
      res.status(200).send(user);
    })
    .catch((e) => res.status(500).send(e));
});
/* ************************************************************** */
//patch method
router.patch("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send("Unable to find user");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
/* ************************************************************** */
//delete method
router.delete("/users/:id",async(req,res)=>{
  try{
  const _id=req.params.id;
  const user=await User.findByIdAndDelete(_id);
  if(!user){
    return res.status(404).send("Unable to find user");
  }
  res.status(200).send(user);
  }
  catch(error){
    res.status(500).send(error);
  }
})

module.exports = router;
