var test = require('tap').test;
var CronExpression = require('../lib/expression');

test('It works on DST start', function(t) {
  try {
    var options = {
      currentDate: '2016-03-27 02:00:01',
      tz: 'Europe/Athens'
    };

    var interval = CronExpression.parse('0 * * * *', options);
    t.ok(interval, 'Interval parsed');

    var date = interval.next();
    console.log('test:' + date.toString());
    t.equal(date.getHours(), 4, 'Due to DST start in Athens, 3 is skipped');
  
    date = interval.next();
    console.log('test:' + date.toString());
    t.equal(date.getHours(), 5, '5 AM on the 27th');

    var interval = CronExpression.parse('0 3 * * *', options);
    t.ok(interval, 'Interval parsed');

    var date = interval.next();
    console.log('test:' + date.toString());
    t.equal(date.getHours(), 4, 'Due to DST start in Athens, 3 is skipped');
    date = interval.next();
    console.log('test:' + date.toString());
    t.equal(date.getHours(), 3, '3 on the 28th');

    var interval = CronExpression.parse('*/20 3 * * *', options);
    t.ok(interval, 'Interval parsed');

    var date = interval.next();
    console.log('test:' + date.toString());
    t.equal(date.getHours(), 4, 'Due to DST start in Athens, 3 is skipped');
    date = interval.next();
    console.log('test:' + date.toString());
    t.equal(date.getHours(), 4, '4:20');
    date = interval.next();
    console.log('test:' + date.toString());
    t.equal(date.getHours(), 4, '4:40');
    date = interval.next();
    console.log('test:' + date.toString());
    t.equal(date.getHours(), 3, '3:00 on the 28th');
    

  } catch (err) {
    t.ifError(err, 'Interval parse error');
  }

  t.end();
});

test('It works on DST end', function(t) {
  try {
    var options = {
      currentDate: '2016-10-30 02:00:01',
      tz: 'Europe/Athens'
    };

    var interval = CronExpression.parse('0 * * * *', options);
    t.ok(interval, 'Interval parsed');

    var date = interval.next();
    t.equal(date.getHours(), 3, '3 AM');
    date = interval.next();
    t.equal(date.getHours(), 3, 'Due to DST end in Athens (4-->3)');
    date = interval.next();
    t.equal(date.getHours(), 4, '4 AM');

    var interval = CronExpression.parse('0 3 * * *', options);
    t.ok(interval, 'Interval parsed');

    var date = interval.next();
    t.equal(date.getHours(), 3, '3 AM');
    date = interval.next();
    t.equal(date.getHours(), 3, '3 AM');
    t.equal(date.getDate(), 31, '31st');

    var interval = CronExpression.parse('*/20 3 * * *', options);
    t.ok(interval, 'Interval parsed');

    var date = interval.next();
    t.equal(date.getMinutes(), 0, '0');
    t.equal(date.getHours(), 3, '3 AM');
    t.equal(date.getDate(), 30, '30th');
    date = interval.next();
    t.equal(date.getMinutes(), 20, '20');
    t.equal(date.getHours(), 3, '3 AM');
    t.equal(date.getDate(), 30, '30th');
    date = interval.next();
    t.equal(date.getMinutes(), 40, '40');
    t.equal(date.getHours(), 3, '3 AM');
    t.equal(date.getDate(), 30, '30th');
    date = interval.next();
    t.equal(date.getMinutes(), 0, '0');
    t.equal(date.getHours(), 3, '3 AM');
    t.equal(date.getDate(), 31, '31st');
   } catch (err) {
    t.ifError(err, 'Interval parse error');
  }

  t.end();
});
