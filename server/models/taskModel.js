const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['incomplete', 'complete', 'in-progress'],
        default: 'incomplete'
    },
    assigneeId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

exports.taskModel = model('task', taskSchema);