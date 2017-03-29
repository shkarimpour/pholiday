# pholiday
A persian calendar holidays library for **javascript** based on [**moment-jalaali**](https://github.com/jalaali/moment-jalaali).

# installation
You can use this library in envs like nodejs, webpack and browserify.
```
$ npm install pholiday
```

Library is based on **moment-jalaali** so it has all methods [**moment**](https://momentjs.com/) and [**moment-jalaali**](https://github.com/jalaali/moment-jalaali) has.

# library specific methods

## .isHoliday()
Check the selected date is holiday in Iran or not.
```
const pholiday = require('pholiday')
pholiday().isHoliday()
pholiday('1391/12/29', 'jYYYY/jMM/jDD').isHoliday() -> true
pholiday('2013-8-25 16:40:00', 'YYYY-M-D HH:mm:ss').endOf('jMonth').isHoliday() -> false
```

## .events()
Get the selected dates events in Iran calendar.
```
const pholiday = require('pholiday')
pholiday().events()
pholiday('2013-8-25 16:40:00', 'YYYY-M-D HH:mm:ss').endOf('jMonth').events()
-> [ { isHoliday: false,
    event: 'گاهنبار پَتیَه‌شَهیم، جشن پایان تابستان' } ]
```