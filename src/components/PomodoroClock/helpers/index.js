function parseTime(time) {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return `${mins > 9 ? mins : ('0' + mins)} : ${secs > 9 ? secs : ('0' + secs)}`;
}

module.exports = {
  parseTime,
}
