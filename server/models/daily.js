const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DailySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  waka_id: { type: String, required: true },
  date: { type: String, required: true },
  grand_total: { type: String },
  dependencies: [{ 
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
  }],
  projects: [{ 
    name: { type: String }, digital: { type: String }, percent: { type: String }, text: { type: String }, 
    entities: [{ 
      name: { type: String }, digital: { type: String }, text: { type: String }, percent: { type: String } 
    }], 
    languages: [{ 
      name: { type: String }, digital: { type: String }, text: { type: String }, percent: { type: String } 
    }] 
  }]

});


//Export model
module.exports = mongoose.model('Daily', DailySchema);