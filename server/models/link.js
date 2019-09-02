const mongoose = require("mongoose");

const LinkSchema = mongoose.Schema({
        text: {
            type: String,
            required: true,
            maxLength: 500
        },
    }, {
        timestamps: true
    })
;

LinkSchema.pre("remove", async function (next) {
    try {
        // find user
        let user = await User.findById(this.user);
        // remove from user Links array
        user.Links.remove(this.id);
        // wait for user save
        await user.save();
        return next();
    }
    catch (err) {
        return next(err);
    }
});

const Link = mongoose.model("Link", LinkSchema);

module.exports = Link;