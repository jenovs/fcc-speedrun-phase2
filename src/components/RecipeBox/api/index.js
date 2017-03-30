function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getData(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data.map((item, ind) => {
      const arr = item.split('\t');
      arr[0] = ind;
      return arr.join('\t');
    });
  } catch (e) {
    return;
  }
}

module.exports = {
  getData,
  saveData,
}
