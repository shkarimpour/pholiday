const pholiday = require('./index')
const date = pholiday('1396-12-27', 'jYYYY-jM-jD')
console.log(date.isHoliday())
console.log(date.events())
