const addOneButton = (station, setRows) => {
    setRows((prevRows) => {
      const updatedRows = { ...prevRows };
      updatedRows[station].unshift({ label: '1', color: 'white' })
      return updatedRows
    })
}

const cancelOneButton = (station, index, setRows) => {
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

export { addOneButton, cancelOneButton};