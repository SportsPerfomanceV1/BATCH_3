import React, { useState, useEffect } from 'react';
import './publish.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const Publish = () => {
  const [events, setEvents] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [results, setResults] = useState([]);

  const [resultForm, setResultForm] = useState({
    eventId: '',
    athleteId: '',
    score: '',
    remarks: '',
  });

  const [filters, setFilters] = useState({
    eventId: '',
    athleteId: '',
    minScore: '',
    maxScore: ''
  });

  const [sortConfig, setSortConfig] = useState({
    key: 'score',
    direction: 'descending'
  });

  const [activeTab, setActiveTab] = useState('view');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const authHeader = getAuthHeader();
        const response = await axios.get('http://localhost:8080/event/result/getAll', authHeader);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResultForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddResult = () => {
    if (!resultForm.eventId || !resultForm.athleteId || !resultForm.score) {
      alert('Please fill in all required fields');
      return;
    }

    const newResult = {
      ...resultForm,
      id: `R${Date.now()}`, // Unique ID
      timestamp: new Date().toISOString()
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    localStorage.setItem('eventResults', JSON.stringify(updatedResults));

    setResultForm({
      eventId: '',
      athleteId: '',
      score: '',
      remarks: '',
    });
  };

  const sortResults = (resultsToSort) => {
    return [...resultsToSort].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  const filterResults = () => {
    return results.filter(result => 
      (!filters.eventId || result.eventId === filters.eventId) &&
      (!filters.athleteId || result.athleteId === filters.athleteId) &&
      (!filters.minScore || parseFloat(result.score) >= parseFloat(filters.minScore)) &&
      (!filters.maxScore || parseFloat(result.score) <= parseFloat(filters.maxScore))
    );
  };

  const renderResultForm = () => (
    <div className="form-container">
      <h3>Upload Result</h3>
      <select 
        name="eventId"
        value={resultForm.eventId}
        onChange={handleInputChange}
        className="input"
      >
        <option value="">Select Event</option>
        {events.map(event => (
          <option key={event.id} value={event.id}>
            {event.name} ({event.date})
          </option>
        ))}
      </select>

      <select 
        name="athleteId"
        value={resultForm.athleteId}
        onChange={handleInputChange}
        className="input"
      >
        <option value="">Select Athlete</option>
        {athletes.map(athlete => (
          <option key={athlete.id} value={athlete.id}>
            {athlete.name} - {athlete.sport} ({athlete.category})
          </option>
        ))}
      </select>

      <input 
        type="text"
        name="score"
        placeholder="Performance Score"
        value={resultForm.score}
        onChange={handleInputChange}
        className="input"
      />

      <textarea 
        name="remarks"
        placeholder="Additional Remarks"
        value={resultForm.remarks}
        onChange={handleInputChange}
        className="textarea"
      />

      <button onClick={handleAddResult} className="submit-button">
        Upload Result
      </button>
    </div>
  );

  const renderResultsTable = () => {
    const filteredAndSortedResults = sortResults(filterResults());
  
    return (
      <div className="table-container">
        <div className="filter-container">
          <select 
            name="eventId"
            value={filters.eventId}
            onChange={handleFilterChange}
            className="filter-input"
          >
            <option value="">All Events</option>
            {events.map(event => (
              <option key={event.eventId} value={event.eventId}>
                {event.eventTitle}
              </option>
            ))}
          </select>
  
          <select 
            name="athleteId"
            value={filters.athleteId}
            onChange={handleFilterChange}
            className="filter-input"
          >
            <option value="">All Athletes</option>
            {athletes.map(athlete => (
              <option key={athlete.id} value={athlete.id}>
                {athlete.name}
              </option>
            ))}
          </select>
  
          <input 
            type="number"
            name="minScore"
            placeholder="Min Score"
            value={filters.minScore}
            onChange={handleFilterChange}
            className="filter-input"
          />
  
          <input 
            type="number"
            name="maxScore"
            placeholder="Max Score"
            value={filters.maxScore}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
  
        <table className="table">
          <thead>
            <tr>
              {['Event', 'Athlete', 'Score', 'Remarks'].map(header => (
                <th 
                  key={header} 
                  className="table-header"
                  onClick={() => setSortConfig({
                    key: header.toLowerCase(),
                    direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
                  })}
                >
                  {header} 
                  {sortConfig.key === header.toLowerCase() && 
                    (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedResults.map(result => {
              const event = events.find(e => e.eventId === result.event.eventId);
              const athlete = athletes.find(a => a.id === result.athleteId);
              
              return (
                <tr key={result.resultId} className="table-row">
                  <td>{event ? event.eventTitle : result.event.eventTitle}</td>
                  <td>{athlete ? athlete.name : result.athleteId}</td>
                  <td>{result.score}</td>
                  <td>{result.remarks || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  

  return (
    <div className="container">
      <header className="navbar1">
        <h1 className="logo1">Athletics</h1>
        <nav>
          <ul className="navbar-links1">
            <li><Link to="/news">News</Link></li>
            <li><Link to="/event">Events</Link></li>
            <li><Link to="/coaches">Coaches</Link></li>
            <li><Link to="/athelete">Athletes</Link></li>
            <li><Link to="/AdminDashboard">Profile</Link></li>
            <li><Link to="/home">Logout</Link></li>
          </ul>
        </nav>
      </header>
      <h1>Event Results Management</h1>
      
      <div className="tab-container">
        <button 
          onClick={() => setActiveTab('view')}
          className={`tab-button ${activeTab === 'view' ? 'active' : 'inactive'}`}
        >
          View Results
        </button>
        <button 
          onClick={() => setActiveTab('publish')}
          className={`tab-button ${activeTab === 'publish' ? 'active' : 'inactive'}`}
        >
          Publish Result
        </button>
      </div>

      {activeTab === 'view' && renderResultsTable()}
      {activeTab === 'publish' && renderResultForm()}
    </div>
  );
};

export default Publish;
