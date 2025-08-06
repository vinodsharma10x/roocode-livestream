const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['debugging', 'feature-implementation', 'code-optimization', 'collaborative-work', 'custom'],
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  situationPrompt: {
    type: String,
    required: true,
    trim: true
  },
  taskPrompt: {
    type: String,
    required: true,
    trim: true
  },
  actionPrompt: {
    type: String,
    required: true,
    trim: true
  },
  resultPrompt: {
    type: String,
    required: true,
    trim: true
  },
  exampleSituation: {
    type: String,
    trim: true
  },
  exampleTask: {
    type: String,
    trim: true
  },
  exampleAction: {
    type: String,
    trim: true
  },
  exampleResult: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  isDefault: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
templateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Template', templateSchema);