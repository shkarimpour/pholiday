const persian = require('./events/persian')
const lunar = require('./events/lunar')
const solar = require('./events/solar')
const momentJalaali = require('moment-jalaali')
momentJalaali.locale('fa')
momentJalaali.loadPersian()
const momentHijri = require('moment-hijri')
const _allsolar = persian.concat(solar)
const _lunar2solar = lunar
const _allevents = _lunar2solar.concat(_allsolar)

function persianToEnglish (number) {
    return number.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (c) {
        return c.charCodeAt(0) & 0xf;
    });
}

function PHoliday(arg1, arg2, arg3, arg4){
    const _self = momentJalaali(arg1, arg2, arg3, arg4)
    _self.events = function(){
        const _todayNumber = _self.jDayOfYear()
        const _todayHijri = momentHijri(_self)
        const _todayHijriFormatted = persianToEnglish(_todayHijri.format('iM/iD'))

        const events = _allevents.filter(function(item){
            return (item.fday && item.fday == _todayHijriFormatted) || (!item.fday && item.day == _todayNumber)
        }).map(function(item){
            return {
                isHoliday: item.holiday,
                event: item.title
            }
        })
        return _self.isoWeekday() == 5 ? events.concat([{
          isHoliday: true,
          isFriday: true,
          event: 'جمعه'
        }]) : events
    }

    _self.isHoliday = function(){
        return _self.events().find(function(item){
            return item.isHoliday
        }) != null
    }
    return _self
}

module.exports = PHoliday
