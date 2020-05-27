const mongoose = require('mongoose');


const postSchema = new  mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    // include the array of all ids of all comment in the post
    comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'// C captial
        }
    ]
},{
  timestamps: true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;