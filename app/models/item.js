var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  priority: {
    type: Number,
    default: 1
  },
  status:{
    type: Number,
    default: 1
  },
  storyPoints: {
    type: Number,
    default: 0
  },
  isBacklog: {
    type: Boolean,
    default: true
  },
  projectID: {
    type: Schema.ObjectId,
    required: true
  },
  sprintID: {
    type: Schema.ObjectId
  }
});

module.exports = mongoose.model('Item', ItemSchema);