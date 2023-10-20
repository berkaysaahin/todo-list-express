const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    todo: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        required: true
    },

    },
    { timestamps: true }
    )