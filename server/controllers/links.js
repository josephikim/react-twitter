const db = require("../models");
const jwt = require("jsonwebtoken");

exports.createLink = async function (req, res, next) {
    try {
        let link = await db.Link.create({
            text: req.body.text
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.links.push(link.id);
        await foundUser.save();
        let newlink = await db.link.findById(link.id).populate("link", {
            imgURL: true,
            id: true
        })

        return res.status(200).json(newlink);
    }
    catch (err) {
        return next(err);
    }
};

exports.getLink = async function (req, res, next) {
    try {
        let link = await db.Link.findById(req.params.link_id);
        return res.status(200).json(link);
    }
    catch (err) {
        return next(err);
    }
};

exports.deleteLink = async function (req, res, next) {
    try {
        let foundlink = await db.Link.findById(req.params.link_id);
        await foundlink.remove();
        return res.status(200).json(foundlink);
    }
    catch (err) {
        return next(err);
    }
};

exports.getAllLinks = async function (req, res, next) {
    try {
        let links = await db.Link
            .find()
            .sort({createdAt: 'desc'})
            .populate("link", {
                text: true,
                imgURL: false
            });
        res.status(200).json(links)
    }
    catch (err) {
        next(err);
    }
};