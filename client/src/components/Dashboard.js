import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ onCreateEntry, onViewEntries, onViewTemplates }) => {
  const [stats, setStats] = useState({
    totalEntries: 0,
    thisWeek: 0,
    thisMonth: 0,
    favoriteTags: []
  });

  // In a real app, this would fetch data from the backend
  useEffect(() => {
    // Mock data for demonstration
    setStats({
      totalEntries: 24,
      thisWeek: 3,
      thisMonth: 12,
      favoriteTags: [
        { tag: 'react', count: 15 },
        { tag: 'javascript', count: 18 },
        { tag: 'debugging', count: 12 },
        { tag: 'optimization', count: 8 },
        { tag: 'nodejs', count: 10 }
      ]
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>STAR Programmer Journal</h1>
        <p>Document your programming experiences and track your professional growth</p>
      </div>

      <div className="quick-actions">
        <button className="btn btn-primary btn-large" onClick={onCreateEntry}>
          <span className="btn-icon">📝</span>
          Create New Entry
        </button>
        <button className="btn btn-secondary btn-large" onClick={onViewEntries}>
          <span className="btn-icon">📚</span>
          View All Entries
        </button>
        <button className="btn btn-secondary btn-large" onClick={onViewTemplates}>
          <span className="btn-icon">📋</span>
          Browse Templates
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalEntries}</div>
            <div className="stat-label">Total Entries</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.thisWeek}</div>
            <div className="stat-label">This Week</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.thisMonth}</div>
            <div className="stat-label">This Month</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h2>Getting Started</h2>
          <div className="getting-started-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Your First Entry</h3>
                <p>Document a recent programming experience using the STAR format</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Use Templates</h3>
                <p>Choose from pre-built templates for common scenarios</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Add Tags</h3>
                <p>Tag your entries with technologies and skills for easy searching</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Track Progress</h3>
                <p>Visualize your skill development over time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h2>Popular Tags</h2>
          <div className="tags-cloud">
            {stats.favoriteTags.map((tagData, index) => (
              <span 
                key={tagData.tag}
                className="tag-cloud-item"
                style={{ fontSize: `${0.8 + (tagData.count / 20)}rem` }}
              >
                {tagData.tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-tips">
        <h3>💡 Pro Tips</h3>
        <ul>
          <li>Write entries regularly to build a comprehensive portfolio</li>
          <li>Be specific about actions taken and quantify results when possible</li>
          <li>Use relevant tags to make entries searchable later</li>
          <li>Review past entries before performance reviews or interviews</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;