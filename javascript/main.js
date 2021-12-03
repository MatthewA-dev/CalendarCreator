const fs = require("fs");

let args = process.argv.slice(2);

let cont = fs.readFileSync(args[0]).toString().split("\r\n");
let STARTDATE = new Date(2021, 8, 2);

var days = Object();

for (let x = 0; x < cont.length; x++) {
  let line = cont[x];
  let daynum = Number(line.split(",", 1)[0]);
  let linecont = line.slice(line.indexOf(",") + 1);
  days[daynum] = linecont;
}

var lastday = 0;

var coursedays = [];

for (var daynum in days) {
  if (lastday == 0) {
    coursedays.push({
      date: JSON.parse(JSON.stringify(STARTDATE)),
      cont: days[daynum],
    });
    lastday = daynum;
    continue;
  }
  while (true) {
    STARTDATE.setDate(STARTDATE.getDate() + (daynum - lastday));
    if (STARTDATE.getDay() == 0 || STARTDATE.getDay() == 6) {
      continue;
    }
    break;
  }
  coursedays.push({
    date: JSON.parse(JSON.stringify(STARTDATE)),
    cont: days[daynum],
  });
  lastday = daynum;
}

console.log(coursedays);
