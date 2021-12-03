// compare two days
function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
}

function getDates(){
    var classinput = document.getElementById("classInput").value
    var invalidDatesInput = document.getElementById("invalidDatesInput").value
    var startdate = document.getElementById("startDate").valueAsDate
    return returnDates(classinput, invalidDatesInput, startdate)
}

function returnDates(classinput, invalidDatesInput, STARTDATE){
    
    var invalidDays = [];
    let content = invalidDatesInput.split("\n");
    for(let x = 0; x < content.length; x++){
        x = content[x]
        x = x.split(",")
        let date = new Date(Number(x[0]),Number(x[1]) - 1,Number(x[2]))
        invalidDays.push(date)
    }

    var days = Object();
    let cont = classinput.split("\n")
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
    return coursedays
}