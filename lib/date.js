'use strict';

var moment = require('moment-timezone');

CronDate.prototype.addYear = function() {
  this.date.year(this.date.year() + 1);
};

CronDate.prototype.addMonth = function() {
  this.date.date(1);
  this.date.hour(0);
  this.date.minute(0);
  this.date.second(0);
  this.date.month(this.date.month() + 1);
};

CronDate.prototype.addDay = function() {
  this.date.hour(0);
  this.date.minute(0);
  this.date.second(0);
  this.date.dayOfYear(this.date.dayOfYear() + 1);
};

CronDate.prototype.addHour = function() {
  this.date.minute(0);
  this.date.second(0);
  this.date.hour(this.date.hour() + 1);
};

CronDate.prototype.addMinute = function() {
  this.date.second(0);
  this.date.minute(this.date.minute() + 1);
};

CronDate.prototype.addSecond = function() {
  this.date.second(this.date.second() + 1);
};

CronDate.prototype.getDate = function() {
  return this.date.date();
};

CronDate.prototype.getFullYear = function() {
  return this.date.year();
};

CronDate.prototype.getDay = function() {
  return this.date.day();
};

CronDate.prototype.getMonth = function() {
  return this.date.month();
};

CronDate.prototype.getHours = function() {
  return this.date.hours();
};

CronDate.prototype.getMinutes = function() {
  return this.date.minute();
};

CronDate.prototype.getSeconds = function() {
  return this.date.second();
};

CronDate.prototype.getTime = function() {
  return this.date.valueOf();
};

CronDate.prototype.getUTCDate = function() {
  return this.date.utc().date();
};

CronDate.prototype.getUTCFullYear = function() {
  return this.date.utc().year();
};

CronDate.prototype.getUTCDay = function() {
  return this.date.utc().day();
};

CronDate.prototype.getUTCMonth = function() {
  return this.date.utc().month();
};

CronDate.prototype.getUTCHours = function() {
  return this.date.utc().hours();
};

CronDate.prototype.getUTCMinutes = function() {
  return this.date.utc().minute();
};

CronDate.prototype.getUTCSeconds = function() {
  return this.date.utc().second();
};

CronDate.prototype.setDate = function(d) {
  return this.date.date(d);
};

CronDate.prototype.setFullYear = function(y) {
  return this.date.year(y);
};

CronDate.prototype.setDay = function(d) {
  return this.date.day(d);
};

CronDate.prototype.setMonth = function(m) {
  return this.date.month(m);
};

CronDate.prototype.setHours = function(h) {
  return this.date.hour(h);
};

CronDate.prototype.setMinutes = function(m) {
  return this.date.minute(m);
};

CronDate.prototype.setSeconds = function(s) {
  return this.date.second(s);
};

CronDate.prototype.getTime = function() {
  return this.date.valueOf();
};



function CronDate (timestamp, tz) {
  if (timestamp instanceof CronDate) {
    timestamp = timestamp.date;
  } else if (typeof timestamp === 'string') {
    timestamp = new Date(timestamp);
  }

  if (!tz) {
    tz = moment.tz.guess();
  }

  this.date = moment.tz(timestamp, tz);
}

module.exports = CronDate;
