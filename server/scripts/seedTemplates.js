const mongoose = require('mongoose');
const Template = require('../models/Template');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/star-journal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Clear existing default templates
    await Template.deleteMany({ isDefault: true });
    console.log('Cleared existing default templates');
    
    // Create default templates
    const defaultTemplates = [
      {
        name: 'Debugging Session',
        type: 'debugging',
        description: 'Template for documenting debugging sessions and bug fixes',
        situationPrompt: 'Describe the context and problem you encountered. What was the bug or issue?',
        taskPrompt: 'What was your specific responsibility in resolving this issue?',
        actionPrompt: 'Detail the steps you took to identify and fix the problem. What debugging techniques did you use?',
        resultPrompt: 'What was the outcome? How did your solution impact the system or team?',
        exampleSituation: 'Users were reporting that the login page was occasionally freezing when entering credentials, causing timeouts after 30 seconds.',
        exampleTask: 'Investigate the login timeout issue and implement a fix to improve user experience.',
        exampleAction: 'Used browser dev tools to profile network requests and identified a race condition in the authentication service. Implemented proper async handling and added error boundaries.',
        exampleResult: 'Reduced login failures by 95% and improved average response time from 30 seconds to 2 seconds.',
        tags: ['debugging', 'performance', 'frontend', 'backend'],
        isDefault: true
      },
      {
        name: 'Feature Implementation',
        type: 'feature-implementation',
        description: 'Template for documenting new feature development',
        situationPrompt: 'What feature or functionality needed to be implemented? What was the business requirement?',
        taskPrompt: 'What was your role in the feature implementation?',
        actionPrompt: 'Describe your approach to designing and implementing the feature. What technologies or methodologies did you use?',
        resultPrompt: 'What was delivered? What impact did the feature have on users or the business?',
        exampleSituation: 'Product team requested a real-time notification system to improve user engagement and retention.',
        exampleTask: 'Design and implement a WebSocket-based notification system with push capabilities.',
        exampleAction: 'Designed event-driven architecture using Redis pub/sub, implemented WebSocket server with Socket.IO, created React components for notification UI.',
        exampleResult: 'Launched notification system that increased daily active users by 25% and reduced support tickets by 40%.',
        tags: ['feature', 'websocket', 'react', 'nodejs'],
        isDefault: true
      },
      {
        name: 'Code Optimization',
        type: 'code-optimization',
        description: 'Template for documenting performance improvements and code optimization',
        situationPrompt: 'What performance issue or code quality problem needed to be addressed?',
        taskPrompt: 'What was your responsibility in the optimization effort?',
        actionPrompt: 'What techniques did you use to identify and resolve the performance bottlenecks?',
        resultPrompt: 'What were the measurable improvements? How did the optimization impact the system?',
        exampleSituation: 'Database queries for the user dashboard were taking over 5 seconds to load, causing poor user experience.',
        exampleTask: 'Optimize database queries and improve dashboard loading performance.',
        exampleAction: 'Analyzed query execution plans, added database indexes, implemented query caching with Redis, refactored inefficient ORM queries.',
        exampleResult: 'Reduced dashboard load time from 5.2 seconds to 0.8 seconds, decreasing server CPU usage by 30%.',
        tags: ['optimization', 'database', 'performance', 'redis'],
        isDefault: true
      },
      {
        name: 'Collaborative Work',
        type: 'collaborative-work',
        description: 'Template for documenting teamwork, code reviews, and collaborative projects',
        situationPrompt: 'What collaborative effort or team project were you involved in?',
        taskPrompt: 'What was your specific role in the team effort?',
        actionPrompt: 'How did you contribute to the team success? What collaboration methods did you use?',
        resultPrompt: 'What was the team outcome? How did your contributions impact the project success?',
        exampleSituation: 'Joined a cross-functional team to migrate legacy system to microservices architecture.',
        exampleTask: 'Lead frontend migration efforts and coordinate with backend teams for API integration.',
        exampleAction: 'Conducted code reviews, mentored junior developers, established coding standards, facilitated daily standups and sprint planning.',
        exampleResult: 'Successfully migrated 3 major modules ahead of schedule, improved team velocity by 40%, reduced bug reports by 60%.',
        tags: ['collaboration', 'leadership', 'code-review', 'agile'],
        isDefault: true
      }
    ];
    
    // Insert default templates
    const insertedTemplates = await Template.insertMany(defaultTemplates);
    console.log(`Inserted ${insertedTemplates.length} default templates`);
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding templates:', error);
    mongoose.connection.close();
  }
});