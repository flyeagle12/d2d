  const handleClick = (station, index, setRows) => {
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
                //setChanges([...changes, {station: station, equipment: '1', state: 'assign'}])
                
              } else if(Object.keys(updatedRows[station][index]).length === 3){
                updatedRows[station][index].color =  updatedRows[station][index].pastColor
                //setChanges([...changes, {station: station, equipment: '1', state: 'assign prevues color'}])
              }
            }
            else if (updatedRows[station][index].color !== 'gray'){ // 'color to gray'
              updatedRows[station][index] = {...updatedRows[station][index], pastColor: updatedRows[station][index].color}
              updatedRows[station][index].color = 'gray'
              //setChanges([...changes, {station: station, equipment: '1', state: 'unassign'}])
            }
          
          break;
        case '2':
          const threeObj = updatedRows[station].find(button => button.label === '3');
            if(threeObj.color === 'gray'){  // 'check if no 3'
              if(updatedRows[station][index].color !== 'gray'){  // 'color -> gray'
                updatedRows[station][index] = {...updatedRows[station][index], pastColor: updatedRows[station][index].color}
                updatedRows[station][index].color = 'gray'
                //setChanges([...changes, {station: station, equipment: '2', state: 'unassign'}])
              }
              else if(updatedRows[station][index].color === 'gray'){ 
                if(Object.keys(updatedRows[station][index]).length === 2){ // 'gray -> white'
                  updatedRows[station][index].color = 'white'
                  //setChanges([...changes, {station: station, equipment: '2', state: 'assign'}])
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
              //setChanges([...changes, {station: station, equipment: '3', state: 'unassign'}])
            }
            else if(updatedRows[station][index].color === 'gray'){ 
              if(Object.keys(updatedRows[station][index]).length === 2){ // 'gray -> white'
                updatedRows[station][index].color = 'white'
                //setChanges([...changes, {station: station, equipment: '3', state: 'assign'}])
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

export default handleClick;