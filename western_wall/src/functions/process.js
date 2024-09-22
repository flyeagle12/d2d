const processData = (data, rows, setRows) => {
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

export default processData;