
import './App.css'
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
  
  function App() {
    const [inputValue, setInputValue] = useState('');
    const [bricks, setBricks] = useState([]);
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = () => {
      if (inputValue.trim()) {
        setBricks((prevBricks) => [...prevBricks, inputValue.trim()]);
        setInputValue(''); // Clear input after submission
      }
    };
  
    return (
      <Box sx={{ padding: '20px' }}>
        {/* Input Field and Submit Button */}
        <Box sx={{ marginBottom: '20px' }}>
          <TextField
            label="Enter Text"
            value={inputValue}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ marginRight: '10px' }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Add Brick
          </Button>
        </Box>
  
 
      </Box>
    );
  }
  
export default App;

