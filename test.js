const pholiday = require('./index')
const firstOfNoruz = pholiday().subtract(4, 'days')
console.log(firstOfNoruz.isHoliday())
console.log(firstOfNoruz.events())