const getRandomNumber = function() {
    return Math.floor(Math.random() * 4);
  }

const getRandomArray = function(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(getRandomNumber())
    }
    return arr;
  };

module.exports = {
  getRandomArray,
  getRandomNumber
}
