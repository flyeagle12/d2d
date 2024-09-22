import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableRow, Button, Paper, Tooltip, IconButton, Divider } from '@mui/material';
import {MyComponent} from './test'


const MyTable = ({ data }) => {
  // Initialize table rows for 'a', 'b', 'c', 'd' with default gray buttons
  const [rows, setRows] = useState({
    a: [{ label: '1', color: 'gray' }, { label: '2', color: 'gray' }, { label: '3', color: 'gray' }],
    b: [{ label: '1', color: 'gray' }, { label: '2', color: 'gray' }, { label: '3', color: 'gray' }],
    c: [{ label: '1', color: 'gray' }, { label: '2', color: 'gray' }, { label: '3', color: 'gray' }],
    d: [{ label: '1', color: 'gray' }, { label: '2', color: 'gray' }, { label: '3', color: 'gray' }],
  });

  const [stations, setStations] = useState(['a','b','c','d'])
  const [changes, setChanges] = useState([])

  // Function to process incoming data and update button colors based on the rules
  const processData = (data) => {
    const updatedRows = { ...rows };

    data.forEach(eq => {
      const { station: stationName, '1': oneState, '2': twoState, state: color } = eq
    
      if(oneState && !twoState){
        if (updatedRows[stationName].length === 3 && updatedRows[stationName][0].color === 'gray') {
          updatedRows[stationName][0].color = color
        }
        else if (updatedRows[stationName].length === 3 && updatedRows[stationName][0].color !== 'gray') {
          updatedRows[stationName].unshift({ label: '1', color: color })
        }
        else if(updatedRows[stationName].length > 3){
          updatedRows[stationName].unshift({ label: '1', color: color })
        }
      }
      if (twoState && !oneState) { // update 2
        const buttonToUpdate = updatedRows[stationName].find(button => button.label === '2');
        if (buttonToUpdate) {
          buttonToUpdate.color = color; // Change its color to 'blue'
        }
      }
      if (twoState && oneState) { // update 3
        const buttonToUpdate = updatedRows[stationName].find(button => button.label === '3');
        if (buttonToUpdate) {
          buttonToUpdate.color = color; // Change its color to 'blue'
        }
      }
    });
    setRows(updatedRows);
  };

  // Process the data after component mounts
  useEffect(() => {
    processData(data);
  }, []);

  // Function to handle button clicks
  const handleClick = (station, index) => {
    setRows((prevRows) => {
      const updatedRows = { ...prevRows };
      // let button = updatedRows[station][index];

      switch (updatedRows[station][index].label) {
        case '1':
          const twoObj = updatedRows[station].find(button => button.label === '2');
          //if(twoObj.color === 'gray'){  // no '2'
            if (updatedRows[station][index].color == 'gray') {   // turn to white 'never clicked'
              if(Object.keys(updatedRows[station][index]).length === 2){
                updatedRows[station][index].color = 'white'
                setChanges([...changes, {station: station, equipment: '1', state: 'assign'}])
                
              } else if(Object.keys(updatedRows[station][index]).length === 3){
                updatedRows[station][index].color =  updatedRows[station][index].pastColor
                setChanges([...changes, {station: station, equipment: '1', state: 'assign prevues color'}])
              }
            }
            else if (updatedRows[station][index].color !== 'gray'){ // 'color to gray'
              updatedRows[station][index] = {...updatedRows[station][index], pastColor: updatedRows[station][index].color}
              updatedRows[station][index].color = 'gray'
              setChanges([...changes, {station: station, equipment: '1', state: 'unassign'}])
            }
          
          break;
        case '2':
          const threeObj = updatedRows[station].find(button => button.label === '3');
            if(threeObj.color === 'gray'){  // 'check if no 3'
              if(updatedRows[station][index].color !== 'gray'){  // 'color -> gray'
                updatedRows[station][index] = {...updatedRows[station][index], pastColor: updatedRows[station][index].color}
                updatedRows[station][index].color = 'gray'
                setChanges([...changes, {station: station, equipment: '2', state: 'unassign'}])
              }
              else if(updatedRows[station][index].color === 'gray'){ 
                if(Object.keys(updatedRows[station][index]).length === 2){ // 'gray -> white'
                  updatedRows[station][index].color = 'white'
                  setChanges([...changes, {station: station, equipment: '2', state: 'assign'}])
                }
                else if(Object.keys(updatedRows[station][index]).length === 3){ // 'color -> gray -> color'
                  updatedRows[station][index].color =  updatedRows[station][index].pastColor
                }
              }
            }
          break;
        case '3':
          const isTwoColored = updatedRows[station].find(button => button.label === '2');
          if(isTwoColored.color === 'gray'){  // 'check if no 2'
            if(updatedRows[station][index].color !== 'gray'){  // 'color -> gray'
              updatedRows[station][index] = {...updatedRows[station][index], pastColor: updatedRows[station][index].color}
              updatedRows[station][index].color = 'gray'
              setChanges([...changes, {station: station, equipment: '3', state: 'unassign'}])
            }
            else if(updatedRows[station][index].color === 'gray'){ 
              if(Object.keys(updatedRows[station][index]).length === 2){ // 'gray -> white'
                updatedRows[station][index].color = 'white'
                setChanges([...changes, {station: station, equipment: '3', state: 'assign'}])
              }
              else if(Object.keys(updatedRows[station][index]).length === 3){ // 'color -> gray -> color'
                updatedRows[station][index].color =  updatedRows[station][index].pastColor
              }
            }
          }
          break;
        default:
          break;
      }
      return updatedRows;
    });
  };

const handleSend = () => {
  console.log(changes)
  // axios(changes)
}

const addOneButton = (station) => {
    setRows((prevRows) => {
      const updatedRows = { ...prevRows };
      updatedRows[station].unshift({ label: '1', color: 'white' })
      return updatedRows
    })

}

const cancelOneButton = (station, index) => {
  setRows((prevRows) => {
    const updatedRows = { ...prevRows };

    if (index >= 0 && index < updatedRows[station].length) {
      const labelCount = updatedRows[station].filter(item => item.label === '1').length;

    // Remove the object at the given index only if there are at least two objects with label '1'
      if (labelCount >= 2) {
        updatedRows[station].splice(index, 1);
      }
    }
    return updatedRows;
  })
  
  
};

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
                              onClick={() => addOneButton(station)}
                            >
                              Add
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => cancelOneButton(station, index)}
                            >
                              cancel
                            </IconButton>
                          </div>
                        }
                      >
                          <Button 
                            onClick={() => handleClick(station, index)} 
                            sx={{ bgcolor: button.color, color: 'black' }}
                          >
                            {button.label}
                          </Button>
                        </Tooltip>
                      ) : (
                        // Button without Tooltip
                        <Button 
                          onClick={() => handleClick(station, index)} 
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
    <MyComponent />
  </>
);
};

// Example data passed to the component
const exampleData = [
  { station: 'a', '1': true, '2': false, state: 'green' },
  { station: 'b', '1': true, '2': true, state: 'green' },
  { station: 'a', '1': true, '2': false, state: 'red' },
  { station: 'c', '1': false, '2': true, state: 'blue' },
];

const App = () => {
  return <MyTable data={exampleData} />;
};

export default App;
