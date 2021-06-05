const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  start_date: { type: Date },
  since_start: { type: String },
  total_time: { type: String },
  daily_average: { type: String },
  last_heartbeat_at: { type: String },
  last_editor_used: { type: String },
  last_project: { type: String },
  photo: { type: String },
  auth: { type: String },
  best_day: { date: {type: String }, text: { type: String } },
  dependencies: [{ 
    name: { type: String }, digital: { type: String }, percent: { type: String }, text: { type: String } 
  }],
  projects: [{ 
    name: { type: String }, digital: { type: String }, percent: { type: String }, text: { type: String } 
  }],
  editors: [{
    name: { type: String }, digital: { type: String }, percent: { type: String }, text: { type: String } 
  }],
  languages: [{
    name: { type: String }, digital: { type: String }, percent: { type: String }, text: { type: String } 
  }],
  machines: [{
    name: { type: String }, digital: { type: String }, percent: { type: String }, text: { type: String } 
  }],
  operating_systems: [{
    name: { type: String }, digital: { type: String }, percent: { type: String }, text: { type: String } 
  }]
});


//Export model
module.exports = mongoose.model('User', UserSchema);