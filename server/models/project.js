const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  waka_id: { type: String, required: true },
  created_at: { type: String },
  project_name: { type: String, required: true },
  digital: { type: String },
  percent: { type: String },
  text: { type: String },
  last_heartbeat_at: { type: String },
  best_day: { date: { type: String }, text: { type: String } },
  languages: [{ 
    name: { type: String }, digital: { type: String }, percent: { type: String }, text: { type: String } 
  }]
});


//Export model
module.exports = mongoose.model('Project', ProjectSchema);