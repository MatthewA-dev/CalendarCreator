import "./App.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setClassInput, setInvalidInput, setStartDate } from "./input";

function Input(props) {
  const dispatch = useDispatch();
  let cInput = useSelector((state) => state.input.classInput);
  let iInput = useSelector((state) => state.input.invalidDateInput);
  let sInput = useSelector((state) => state.input.startDate);
  return (
    <div className="input">
      <textarea name="" id="classInput" cols="30" rows="10" onChange={(event) => dispatch(setClassInput(event.target.value))}></textarea>
      <button id="createCalendar" onClick={() => props.update(cInput, iInput, sInput)}>
        Create
      </button>
      <input type="date" name="" id="startDate" onChange={(event) => dispatch(setStartDate(event.target.value))}></input>
      <textarea name="" id="invalidDatesInput" cols="30" rows="10" onChange={(event) => dispatch(setInvalidInput(event.target.value))}></textarea>
    </div>
  );
}
function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

function returnDays(classinput, invalidDatesInput, start) {
  //let begin = useSelector((state) => state.input.startDate).split("-");
  // get starting date
  var STARTDATE = new Date(start);
  STARTDATE = new Date(STARTDATE.getTime() + STARTDATE.getTimezoneOffset() * 60000);
  // get holidays
  //var content = useSelector((state) => state.input.invalidDateInput);
  var content = invalidDatesInput.split("\n");
  var invalidDays = [];

  for (let x = 0; x < content.length; x++) {
    x = content[x];
    x = x.split(",");
    let date = new Date(Number(x[0]), Number(x[1]) - 1, Number(x[2]));
    invalidDays.push(date);
  }

  //let cont = useSelector((state) => state.input.classInput);
  // get days
  let cont = classinput.split("\n");
  var days = Object();
  // read days
  for (let x = 0; x < cont.length; x++) {
    let line = cont[x];
    let daynum = Number(line.split(",", 1)[0]);
    if (isNaN(daynum)) {
      daynum = Number(Object.keys(days)[Object.keys(days).length - 1]) + 1;
      if (isNaN(daynum)) {
        daynum = 1;
      }
    }
    let linecont = line.slice(line.indexOf(",") + 1);
    days[daynum] = linecont;
  }

  // previous day's number
  var lastday = 0;
  // Final list of valid days
  var coursedays = [];
  // place days ignoring sunday, saturday and holidays
  for (var daynum in days) {
    if (lastday === 0) {
      coursedays.push({
        date: new Date(STARTDATE.getTime()),
        cont: days[daynum],
      });
      lastday = daynum;
      continue;
    }
    while (true) {
      STARTDATE.setDate(STARTDATE.getDate() + (daynum - lastday));
      if (STARTDATE.getDay() === 0 || STARTDATE.getDay() === 6) {
        continue;
      }
      let next = false;
      for (let day = 0; day < invalidDays.length; day++) {
        if (sameDay(STARTDATE, invalidDays[day])) {
          next = true;
        }
      }
      if (!next) {
        break;
      }
    }
    coursedays.push({
      date: new Date(STARTDATE.getTime()),
      cont: days[daynum],
    });
    lastday = daynum;
  }
  return coursedays;
}

function Calendar(props) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // Don't render anything if the input is empty
  if (props.start === "" || props.class === "") {
    return <div></div>;
  }
  try {
    var coursedays = returnDays(props.class, props.invalid, props.start);
    // Generate Calendars for months
    var months = [];
    var STARTDATE = new Date(props.start);
    // ignore timezones
    STARTDATE = new Date(STARTDATE.getTime() + STARTDATE.getTimezoneOffset() * 60000);
    var monthCount = monthDiff(coursedays[0].date, coursedays[coursedays.length - 1].date) + 1;
    for (var monthNum = 0; monthNum < monthCount; monthNum++) {
      var currentday = new Date(STARTDATE.getFullYear(), STARTDATE.getMonth(), 1);
      var beginningMonth = currentday.getMonth();
      // require unique keys for each week
      var index = 0;
      var allWeeks = [];
      while (true) {
        var week = [];
        // build one week
        for (var daynum = 0; daynum < 7; daynum++) {
          // Append blank days at currentday of month
          if (currentday.getDate() === 1) {
            for (var x = 0; x < currentday.getDay(); x++) {
              week.push(<td className="day" key={x}></td>);
            }
            daynum = currentday.getDay();
          }
          // If we are on a day with content, append content to calendar
          var daycont = "";
          try {
            if (sameDay(coursedays[0].date, currentday)) {
              daycont = coursedays.shift();
              daycont = daycont.cont;
            }
          } catch (err) {
            // if error, no more days exist in course days
          }
          // Build day
          var day = (
            <td className="day" key={daynum}>
              <p className="daynum">{currentday.getDate()}</p>
              {daycont}
            </td>
          );
          currentday.setDate(currentday.getDate() + 1);
          week.push(day);
          if (currentday.getMonth() !== beginningMonth) {
            break;
          }
        }
        allWeeks.push(<tr key={index}>{week}</tr>);
        index++;
        // Stop making calendar if next week is in next month
        if (currentday.getMonth() !== beginningMonth) {
          break;
        }
      }
      var month = (
        <table className="month" key={monthNum}>
          <tbody>
            <tr className="title">
              <th style={{ textAlign: "center" }} colSpan="7">
                {monthNames[STARTDATE.getMonth()]} {STARTDATE.getFullYear()}
              </th>
            </tr>
            <tr>
              <th style={{ textAlign: "center" }}>Sunday</th>
              <th style={{ textAlign: "center" }}>Monday</th>
              <th style={{ textAlign: "center" }}>Tuesday</th>
              <th style={{ textAlign: "center" }}>Wednesday</th>
              <th style={{ textAlign: "center" }}>Thursday</th>
              <th style={{ textAlign: "center" }}>Friday</th>
              <th style={{ textAlign: "center" }}>Saturday</th>
            </tr>
            {allWeeks}
          </tbody>
        </table>
      );
      STARTDATE.setMonth(STARTDATE.getMonth() + 1);
      months.push(month);
    }
    return <div>{months}</div>;
  } catch (err) {
    throw err;
    return <div>Invalid Input</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { class: "", invalid: "", start: "" };
  }
  updateState(classInput, invalid, start) {
    this.setState((state) => {
      return { class: classInput };
    });
    this.setState((state) => {
      return { invalid: invalid };
    });
    this.setState((state) => {
      return { start: start };
    });
  }
  render() {
    return (
      <div className="app">
        <Input update={this.updateState.bind(this)} />
        <Calendar class={this.state.class} invalid={this.state.invalid} start={this.state.start} />
      </div>
    );
  }
}

export default App;
