var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  userID: {
    type: Schema.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Project', ProjectSchema);