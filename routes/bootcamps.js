const express = require("express");
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controller/bootcamps");

router.route("/").get(getBootcamps).post(createBootcamp);
router.get('/test',(req,res)=> {
  res.json({test:'testing data'})
})

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
