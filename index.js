const persian = require('./events/persian')
const lunar = require('./events/lunar')
const solar = require('./events/solar')
const momentJalaali = require('moment-jalaali')
const momentHijri = require('moment-hijri')
const _allsolar = persian.concat(solar)
const _lunar2solar = []
const _allevents = _lunar2solar.concat(_allsolar)

function PHoliday(arg1, arg2, arg3, arg4){
    const _self = momentJalaali(arg1, arg2, arg3, arg4)
    _self.events = function(){
        const _todayNumber = _self.jDayOfYear()
        return _allevents.filter(function(item){
            return item.day == _todayNumber
        })
    }
    
    _self.isHoliday = function(){
        return _self.events().find(function(item){
            return item.holiday
        }) != null
    }
    return _self
}

module.exports = PHoliday