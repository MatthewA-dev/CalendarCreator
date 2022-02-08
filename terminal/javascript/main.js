const fs = require("fs");
// filter args we dont care about
let args = process.argv.slice(2);

// comare two days
function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

// Read class parts
let cont = fs.readFileSync(args[0]).toString().split("\r\n");
// read first date
let begin = args[2].split(",")
let STARTDATE = new Date(Number(begin[0]),Number(begin[1]) - 1,Number(begin[2]));

// Read illegal dates
let content = fs.readFileSync(args[1]).toString().split("\r\n");
var invalidDays = [];

for(let x = 0; x < content.length; x++){
  x = content[x]
  x = x.split(",")
  let date = new Date(Number(x[0]),Number(x[1]) - 1,Number(x[2]))
  invalidDays.push(date)
}

var days = Object();
// read days 
for (let x = 0; x < cont.length; x++) {
  let line = cont[x];
  let daynum = Number(line.split(",", 1)[0]);
  let linecont = line.slice(line.indexOf(",") + 1);
  days[daynum] = linecont;
}

var lastday = 0;

var coursedays = [];
// place days ignoring sunday, saturday and holidays
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
    let next = false
    for (let day = 0; day < invalidDays.length; day++){
      if(sameDay(STARTDATE, invalidDays[day])){
        next = true
      }
    }
    if(!next){
      break;
    }
  }
  coursedays.push({
    date: JSON.parse(JSON.stringify(STARTDATE)),
    cont: days[daynum],
  });
  lastday = daynum;
}

console.log(coursedays);
