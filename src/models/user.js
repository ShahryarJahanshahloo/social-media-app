const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoosePaginate = require('mongoose-paginate-v2')

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
        type: String,
    }],
    followings: [{
        type: String,
    }],

    // stores post id
    bookmarks: [{
        type: String,
    }],
    likes: [{
        type: String,
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
    const token = jwt.sign({ _id: user._id.toString() }, "chetori joone del sare keyfi?")

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Unable to login")
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

userSchema.plugin(mongoosePaginate)

const User = mongoose.model('User', userSchema)

module.exports = User