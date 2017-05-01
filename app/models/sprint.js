var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SprintSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  finishDate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  isFinished: {
    type: Boolean,
    default: false
  },
  projectID: {
    type: Schema.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Sprint', SprintSchema);