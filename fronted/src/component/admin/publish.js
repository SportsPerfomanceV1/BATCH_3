import React, { useState, useEffect } from 'react';

const mockEventService = {
  getEvents: () => [
    { id: 'E001', name: 'Sprint Championship', date: '2024-07-15' },
    { id: 'E002', name: 'Long Jump Competition', date: '2024-07-20' },
    { id: 'E003', name: 'Swimming Nationals', date: '2024-08-05' }
  ],
  
  getAthletes: () => [
    { id: 'A001', name: 'John Doe', sport: 'Track', category: 'Senior' },
    { id: 'A002', name: 'Jane Smith', sport: 'Swimming', category: 'Senior' },
    { id: 'A003', name: 'Mike Johnson', sport: 'Track', category: 'Junior' }
  ]
};

const Publish = () => {

  const [userRole, setUserRole] = useState('admin'); 
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

  useEffect(() => {
    setEvents(mockEventService.getEvents());
    setAthletes(mockEventService.getAthletes());
    
    const storedResults = localStorage.getItem('eventResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
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
    <div style={styles.formContainer}>
      <h3>Upload Result</h3>
      <select 
        name="eventId"
        value={resultForm.eventId}
        onChange={handleInputChange}
        style={styles.input}
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
        style={styles.input}
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
        style={styles.input}
      />

      <select 
        name="performanceType"
        value={resultForm.performanceType}
        onChange={handleInputChange}
        style={styles.input}
      >
        <option value="time">Time</option>
        <option value="distance">Distance</option>
        <option value="points">Points</option>
      </select>

      <input 
        type="text"
        name="performanceUnits"
        placeholder="Units (e.g., seconds, meters)"
        value={resultForm.performanceUnits}
        onChange={handleInputChange}
        style={styles.input}
      />

      <input 
        type="text"
        name="rank"
        placeholder="Rank (Optional)"
        value={resultForm.rank}
        onChange={handleInputChange}
        style={styles.input}
      />

      <textarea 
        name="remarks"
        placeholder="Additional Remarks"
        value={resultForm.remarks}
        onChange={handleInputChange}
        style={styles.textarea}
      />

      <button onClick={handleAddResult} style={styles.submitButton}>
        Upload Result
      </button>
    </div>
  );

  const renderResultsTable = () => {
    const filteredAndSortedResults = sortResults(filterResults());

    return (
      <div style={styles.tableContainer}>
        <div style={styles.filterContainer}>
          <select 
            name="eventId"
            value={filters.eventId}
            onChange={handleFilterChange}
            style={styles.filterInput}
          >
            <option value="">All Events</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>

          <select 
            name="athleteId"
            value={filters.athleteId}
            onChange={handleFilterChange}
            style={styles.filterInput}
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
            style={styles.filterInput}
          />

          <input 
            type="number"
            name="maxScore"
            placeholder="Max Score"
            value={filters.maxScore}
            onChange={handleFilterChange}
            style={styles.filterInput}
          />
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              {['Event', 'Athlete', 'Score', 'Performance', 'Rank', 'Remarks'].map(header => (
                <th 
                  key={header} 
                  style={styles.tableHeader}
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
              const event = events.find(e => e.id === result.eventId);
              const athlete = athletes.find(a => a.id === result.athleteId);
              
              return (
                <tr key={result.id} style={styles.tableRow}>
                  <td>{event ? event.name : result.eventId}</td>
                  <td>{athlete ? athlete.name : result.athleteId}</td>
                  <td>{result.score}</td>
                  <td>{`${result.score} ${result.performanceUnits}`}</td>
                  <td>{result.rank || 'N/A'}</td>
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
    <div style={styles.container}>
      <h1>Advanced Event Results Management</h1>
      
      {userRole === 'admin' && renderResultForm()}
      
      {renderResultsTable()}

      <div style={styles.roleToggle}>
        <button 
          onClick={() => setUserRole('admin')}
          style={{
            ...styles.roleButton,
            backgroundColor: userRole === 'admin' ? '#007bff' : '#6c757d'
          }}
        >
          Admin View
        </button>
        <button 
          onClick={() => setUserRole('athlete')}
          style={{
            ...styles.roleButton,
            backgroundColor: userRole === 'athlete' ? '#007bff' : '#6c757d'
          }}
        >
          Athlete View
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4'
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minHeight: '100px'
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    cursor: 'pointer'
  },
  tableRow: {
    borderBottom: '1px solid #eee'
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  filterInput: {
    flex: '1',
    margin: '0 5px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  roleToggle: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  },
  roleButton: {
    margin: '0 10px',
    padding: '10px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Publish;