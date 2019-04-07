/* /api/users/{x} */

const express = require("express");
const passport = require("passport");
const AuthHelper = require("../../../util/helper/auth");
const router = express.Router();
const UserModel = require("../../../models/User");

/**
 * @route POST /api/register
 * @desc: register a new user
 * @access Private
 */
router.post("/register", async (req, res, next) => {
  passport.authenticate("register", async (err, user, info) => {
    if (err) {
      next(err);
    }
    if (!user) {
      res.status(400).send({
        success: false,
        ...info
      });
    } else {
      const { verified, password, ...safeUser } = user;
      res.json({
        success: true,
        message: "Signup successful",
        safeUser
      });
    }
  })(req, res, next);
});

/**
 * @route POST /api/login
 * @desc: login a user
 * @access Private
 */
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err) {
      next(err);
    }
    if (!user) {
      res.status(403).send({
        success: false,
        ...info
      });
    } else {
      const jwt = await AuthHelper.generateToken(user);
      res.json({
        success: true,
        message: "Login successful",
        token: jwt
      });
    }
  })(req, res, next);
});

/**
 * @route POST /api/users/profile
 * @desc: get user profile details
 * @access Private
 */

router.get("/profile", async (req, res) => {
  UserModel.retrieveWithId(req)
    .then(user => res.json(user))
    .catch(err => res.status(500).json("Failed to retrieve profile details"));
});

/**
 * @route POST /api/users/profile/update
 * @desc: Update user details
 * @access Private
 */

router.post(
  "/profile/update",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { first_name, last_name, email, id, password } = req.body;
    UserModel.updateUser(first_name, last_name, email, id, password)
      .then(user => res.json(user))
      .catch(err => res.status(500).json("Update error"));
  }
);


module.exports = router;
