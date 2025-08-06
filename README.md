# STAR Programmer Journal

A professional journal web application specifically designed for programmers to document their work experiences in the STAR format (Situation, Task, Action, Result).

## Features

- **STAR Format Documentation**: Guided interface for logging programming experiences using the Situation, Task, Action, Result framework
- **Customizable Templates**: Pre-built templates for debugging, feature implementation, code optimization, and collaborative work
- **Intelligent Suggestions**: Context-aware suggestions based on technical terminology and programming workflows
- **Tagging System**: Tag entries by programming languages, frameworks, and technologies
- **Search Functionality**: Easily retrieve past entries for performance reviews or portfolio building
- **Data Visualization**: Track skill development over time with interactive charts
- **Export Options**: Export entries in multiple formats suitable for resumes, portfolios, or performance reviews
- **Reminders**: Consistent documentation prompts to ensure important accomplishments are captured
- **Data Security**: Secure authentication and encryption for sensitive information

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **Deployment**: Docker-ready configuration

## Project Structure

```
star-programmer-journal/
├── client/                 # React frontend
│   ├── public/             # Static assets
│   └── src/                # React components and logic
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── services/       # API service calls
│       └── utils/          # Utility functions
├── server/                 # Node.js/Express backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── controllers/        # Route controllers
└── docs/                   # Documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/star-programmer-journal.git
   cd star-programmer-journal
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory (see `.env.example` for required variables)

5. Start the development servers:
   ```bash
   # From the root directory
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/star-journal
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Journal Entries
- `GET /api/entries` - Get all entries
- `GET /api/entries/:id` - Get a specific entry
- `POST /api/entries` - Create a new entry
- `PUT /api/entries/:id` - Update an entry
- `DELETE /api/entries/:id` - Delete an entry

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/default` - Get default templates
- `GET /api/templates/:id` - Get a specific template
- `POST /api/templates` - Create a new template
- `PUT /api/templates/:id` - Update a template
- `DELETE /api/templates/:id` - Delete a template

### Tags
- `GET /api/tags` - Get all unique tags
- `GET /api/tags/:tag` - Get entries by tag
- `GET /api/tags/stats/popular` - Get popular tags statistics

### Search
- `GET /api/search` - Search entries by keyword, tag, type, or date range
- `GET /api/search/suggestions` - Get search suggestions

## Development

### Frontend Development

The frontend is built with React and follows a component-based architecture. Key components include:

- EntryForm: STAR format entry creation form
- TemplateSelector: Template selection interface
- TagManager: Tag management and assignment
- SearchBar: Search functionality
- Dashboard: Overview of entries and statistics
- ExportManager: Export functionality

### Backend Development

The backend uses Express.js with MongoDB for data storage. Key features include:

- RESTful API design
- JWT-based authentication
- Data validation and sanitization
- Error handling middleware
- Database indexing for performance

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the STAR method used in behavioral interviews
- Designed specifically for software developers and programmers
- Built with modern web technologies for optimal performance