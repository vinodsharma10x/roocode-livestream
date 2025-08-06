import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import TemplateSelector from './components/TemplateSelector';
import EntryForm from './components/EntryForm';
import TemplateManager from './components/TemplateManager';
import apiService from './services/api';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  // Load templates from backend (in a real app, this would be after login)
  useEffect(() => {
    // Mock templates for demonstration
    const mockTemplates = [
      {
        _id: '1',
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
        _id: '2',
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
        _id: '3',
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
      }
    ];
    setTemplates(mockTemplates);
  }, []);

  const handleCreateEntry = () => {
    setCurrentView('template-selector');
  };

  const handleViewEntries = () => {
    setCurrentView('entries');
  };

  const handleViewTemplates = () => {
    setCurrentView('templates');
  };

  const handleManageTemplates = () => {
    setCurrentView('template-manager');
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setCurrentView('entry-form');
  };

  const handleUseBlank = () => {
    setSelectedTemplate(null);
    setCurrentView('entry-form');
  };

  const handleCancelEntry = () => {
    setCurrentView('dashboard');
    setSelectedTemplate(null);
  };

  const handleSubmitEntry = (entryData) => {
    console.log('Entry submitted:', entryData);
    // In a real app, this would call the API to save the entry
    // apiService.createEntry(entryData, authToken);
    setCurrentView('dashboard');
    setSelectedTemplate(null);
  };

  const handleSaveTemplate = (templateData) => {
    console.log('Template saved:', templateData);
    // In a real app, this would call the API to save the template
    // apiService.createTemplate(templateData, authToken);
    
    if (templateData._id) {
      // Update existing template
      setTemplates(prev => prev.map(t => 
        t._id === templateData._id ? { ...t, ...templateData } : t
      ));
    } else {
      // Create new template
      const newTemplate = {
        ...templateData,
        _id: Date.now().toString(),
        isDefault: false
      };
      setTemplates(prev => [...prev, newTemplate]);
    }
  };

  const handleDeleteTemplate = (templateId) => {
    console.log('Template deleted:', templateId);
    // In a real app, this would call the API to delete the template
    // apiService.deleteTemplate(templateId, authToken);
    setTemplates(prev => prev.filter(t => t._id !== templateId));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'template-selector':
        return (
          <TemplateSelector
            templates={templates}
            onSelectTemplate={handleSelectTemplate}
            onUseBlank={handleUseBlank}
          />
        );
      case 'entry-form':
        return (
          <EntryForm
            template={selectedTemplate}
            onSubmit={handleSubmitEntry}
            onCancel={handleCancelEntry}
          />
        );
      case 'template-manager':
        return (
          <TemplateManager
            templates={templates}
            onSaveTemplate={handleSaveTemplate}
            onDeleteTemplate={handleDeleteTemplate}
          />
        );
      case 'entries':
        return (
          <div className="entries-view">
            <h2>All Entries</h2>
            <p>This is where all journal entries would be displayed.</p>
            <button className="btn btn-secondary" onClick={() => setCurrentView('dashboard')}>
              Back to Dashboard
            </button>
          </div>
        );
      case 'templates':
        return (
          <div className="templates-view">
            <div className="templates-header">
              <h2>All Templates</h2>
              <button className="btn btn-primary" onClick={handleManageTemplates}>
                Manage Templates
              </button>
            </div>
            <p>This is where all templates would be displayed.</p>
            <button className="btn btn-secondary" onClick={() => setCurrentView('dashboard')}>
              Back to Dashboard
            </button>
          </div>
        );
      default:
        return (
          <Dashboard
            onCreateEntry={handleCreateEntry}
            onViewEntries={handleViewEntries}
            onViewTemplates={handleViewTemplates}
          />
        );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>STAR Programmer Journal</h1>
        {currentView !== 'dashboard' && (
          <button className="btn btn-secondary btn-small" onClick={() => setCurrentView('dashboard')}>
            ← Back to Dashboard
          </button>
        )}
      </header>
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;