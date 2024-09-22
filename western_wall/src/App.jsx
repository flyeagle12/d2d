import React, { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableRow, Button, Paper, Tooltip, IconButton, Divider } from '@mui/material';
import processData from './functions/process';
import handleClick from './functions/handleClick';
import { addOneButton, cancelOneButton } from './functions/add_cancel';

const App = ({ data }) => {
  // Initialize table rows for 'a', 'b', 'c', 'd' with default gray buttons
  const [rows, setRows] = useState({
    a: [{ label: '1', color: 'gray' }, { label: '2', color: 'gray' }, { label: '3', color: 'gray' }],
    b: [{ label: '1', color: 'gray' }, { label: '2', color: 'gray' }, { label: '3', color: 'gray' }],
    c: [{ label: '1', color: 'gray' }, { label: '2', color: 'gray' }, { label: '3', color: 'gray' }],
    d: [{ label: '1', color: 'gray' }, { label: '2', color: 'gray' }, { label: '3', color: 'gray' }],
  });

  const [stations, setStations] = useState(['a','b','c','d'])
  const [changes, setChanges] = useState([])

  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (!hasRunOnce.current) {
      // Process data only once
      processData(data, rows, setRows);
      hasRunOnce.current = true;
    }
  }, [data]);

const handleSend = () => {
  console.log(changes)
  // axios(changes)
}

  return (
  <>
    <Paper>
      {
        stations.map((station) => {
          return (
            <TableRow key={station}>
              <TableCell>{station}</TableCell>
              {
                rows[station].map((button, index) => {
                  return (
                    <TableCell key={index}>
                      {button.label === '1' && button.color !== 'gray' ? (
                        // Wrap button with Tooltip if label is '1'
                        <Tooltip 
                        title={
                          <div>
                            <IconButton
                              size="small"
                              onClick={() => addOneButton(station, setRows)}
                            >
                              Add
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => cancelOneButton(station, index, setRows)}
                            >
                              cancel
                            </IconButton>
                          </div>
                        }
                      >
                          <Button 
                            onClick={() => handleClick(station, index, setRows)} 
                            sx={{ bgcolor: button.color, color: 'black' }}
                          >
                            {button.label}
                          </Button>
                        </Tooltip>
                      ) : (
                        // Button without Tooltip
                        <Button 
                          onClick={() => handleClick(station, index, setRows)} 
                          sx={{ bgcolor: button.color, color: 'black' }}
                        >
                          {button.label}
                        </Button>
                      )}
                    </TableCell>
                  );
                })
              }
            </TableRow>
          );
        })
      }
      <Button onClick={() => handleSend()}>send</Button>
    </Paper>
  </>
);
};

export default App;
