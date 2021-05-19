const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const postSchema = mongoose.Schema({
    body: {
        type: String,
        required: true,
        maxlength: 511,
    },
    username: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    created: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
})

postSchema.plugin(mongoosePaginate)

const Post = mongoose.model('Post', postSchema)

module.exports = Post