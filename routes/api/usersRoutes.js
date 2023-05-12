const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/usersController");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// New routes for adding and removing friends
router.route("/:userId/friends/:friendId").put(addFriend).delete(removeFriend);

module.exports = router;
