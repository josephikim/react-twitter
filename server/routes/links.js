const express= require("express");
const router= express.Router({mergeParams: true});
const {createLink, getLink, deleteLink}= require("../controllers/links");

router
    .route("/")
    .get(getAllLinks);
router
    .route("/")
    .post(createLink);

router
    .route("/:Link_id")
    .get(getLink)
    .delete(deleteLink);


module.exports= router;