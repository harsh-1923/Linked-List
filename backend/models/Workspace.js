const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkspaceSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    category: {
        type: String,
        required: true,
        default: "general"
    },

    timestamp: {
        type: Date,
        default: Date.now,
    }
});

const Workspace = mongoose.model('workspace', WorkspaceSchema);

module.exports = Workspace;