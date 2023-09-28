// Your code here
function createEmployeeRecord(employee) {
    let employeeRecord = {};
    employeeRecord.firstName = employee[0];
    employeeRecord.familyName = employee[1];
    employeeRecord.title = employee[2];
    employeeRecord.payPerHour = employee[3];
    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];
    return employeeRecord
}

function createEmployeeRecords(arrayOfArrays) {
    let employeeRecords = [];
    arrayOfArrays.map(array => {
        employeeRecords.push(createEmployeeRecord(array))
    })
    return employeeRecords
}

function createTimeInEvent(employeeRecord, dateTime) {
    let timeArray = dateTime.split(' ');
    let date = timeArray[0];
    let time = parseInt(timeArray[1], 10);
    let newTimeIn = {
        type: 'TimeIn',
        date: date,
        hour: time,
    }
    employeeRecord.timeInEvents.push(newTimeIn);
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTime) {
    let timeArray = dateTime.split(' ');
    let date = timeArray[0];
    let time = parseInt(timeArray[1], 10);
    let newTimeOut = {
        type: 'TimeOut',
        date: date,
        hour: time,
    }
    employeeRecord.timeOutEvents.push(newTimeOut);
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord) {
    let hoursWorked = (employeeRecord.timeOutEvents[0].hour - employeeRecord.timeInEvents[0].hour) / 100;
    console.log(hoursWorked)
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord) {
    let payRate = parseInt(employeeRecord.payPerHour, 10);
    let wages = hoursWorkedOnDate(employeeRecord) * payRate;
    return wages;
}

function allWagesFor(employeeRecord) {
    let daysWorked = employeeRecord.timeInEvents.length;
    let payRate = parseInt(employeeRecord.payPerHour, 10);
    let wagesArray = [];
    for (let i = 0; i < daysWorked; i++) {
        let hoursWorked = (employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour) / 100;
        let oneDayWages = hoursWorked * payRate;
        wagesArray.push(oneDayWages);
    }
    let allWages = wagesArray.reduce((acc, curr) => acc + curr, 0)
    return allWages;
}

function calculatePayroll(employeeRecords) {
    let payrollArray = [];
    employeeRecords.forEach(employeeData => {
        payrollArray.push(allWagesFor(employeeData))
    })
    let payroll = payrollArray.reduce((acc, cur) => acc + cur, 0);
    return payroll
}

