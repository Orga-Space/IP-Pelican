
function getFormatedDate() {
  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let cTime = current.getHours() + ":" + current.getMinutes();
  let dateTime = cDate + ' ' + cTime;
  return dateTime
  }

const breakLineForLogs = (() => {
  let breakLine = "";
  for (let i = 0; i < 75; i++) {
    breakLine = breakLine + '-'
  }
  return breakLine
})()


module.exports = {
    getFormatedDate,
    breakLineForLogs
}