const express= require("express");
const router= express.Router({mergeParams: true});
const {isLoggedIn, isCorrectUser} = require("../middleware/auth");
const {getAllTweets}= require("../controllers/tweets");

const authRoutes= require("./auth"),
    tweetRoutes= require("./tweets"),
    linksRoutes= require("./links");

router.use("/api/auth", authRoutes);

router.use(
    "/api/users/:id/tweets",
    isLoggedIn,
    isCorrectUser,
    tweetRoutes
);

router.use(
    "/api/users/:id/links",
    isLoggedIn,
    isCorrectUser,
    linksRoutes
);

router.use(
    "/api/tweets",
    isLoggedIn,
    getAllTweets
);




module.exports= router;

