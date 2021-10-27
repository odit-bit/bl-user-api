const express = require("express");

//import middleware
const auth = require("../middleware/auth");
const FindByID = require("../service/userRepo");

const router = express.Router();

router.get("/:id/:range", auth, async (req, res) => {
  //query url param..
  const { id, range } = req.params;

  //find User
  user = await FindByID(id, range);
  if (user.code) {
    return res.status(404).send({
      ok: false,
      error: user,
    });
  }
  res.send({
    ok: true,
    result: user,
  });
});

// Export the router
module.exports = router;
