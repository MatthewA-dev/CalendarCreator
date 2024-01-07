# Calendar Creator
Simple calendar app written in React. This is meant to serve as a way for teachers to create a schedule for their lessons/ work periods, while accounting for holidays and weekends.

# Usage
It's available [here](https://matthewa-dev.github.io/CalendarCreator).

On the left text field, you enter a list of events, with each event on a new line. It should be listed in chronological order. Example
```
Chapter 1.1
Work period for 1.1
Chapter 1.2
Exam for Chapter 1
...
```

In the middle, you select the start of the school year/ semester

On the right, you enter each date as a list of dates, in year,month,day format. Example
```
2024,1,2
2024,2,5
2024,12,25
...
```
It will then generate the resulting calendar when you click the "Create" button, which you can download as a pdf.

# Features
- Simple app with basic interface
- Fast calendar creation, changes are simple and quick
- Resulting PDFs are also quick and easy to read

# Known issues
- Formatting for both inputs is not clear
- Bug when entering first day as holiday
