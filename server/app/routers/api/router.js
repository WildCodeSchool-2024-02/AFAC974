const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const photosRouter = require("./photos/router");

router.use("/photos", photosRouter);

const artistsRouter = require("./artists/router");

router.use("/artists", artistsRouter);

const usersRouter = require("./users/router");

router.use("/users", usersRouter);

/* ************************************************************************* */

module.exports = router;
