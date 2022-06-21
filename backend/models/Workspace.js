const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkspaceSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        req: true
    },
    category: {
        type: String,
        default: 'General'
    }
});

const Workspace = mongoose.model('workspace', WorkspaceSchema);
module.exports = Workspace;