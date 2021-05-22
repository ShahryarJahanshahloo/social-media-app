const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("Invalid Email!!")
        }
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
        maxlength: 15,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
    },
    bio: {
        type: String,
        maxlength: 255,
        required: false,
        default: "",
    },
    
    // stores username
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    // stores tweet id
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }],

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_STRING)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new Error("incorrect email")
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw new Error("incorrect password")
    }
    return user
}

userSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.pre("findOneAndUpdate", async function (next) {
    const user = this
    user._update.password = await bcrypt.hash(user._update.password, 8)
    next()
})

userSchema.virtual("tweets", {
    ref: "Tweet",
    localField: "_id",
    foreignField: "owner"
})

userSchema.set('toObject', { virtuals: true })
userSchema.set('toJSON', { virtuals: true })

const User = mongoose.model('User', userSchema)

module.exports = User