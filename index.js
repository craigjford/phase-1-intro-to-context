
function createEmployeeRecord(empArr) {
    
    const timeInEvents = [];
    const timeOutEvents = [];

    return {
        firstName: empArr[0],
        familyName: empArr[1],
        title: empArr[2],
        payPerHour: empArr[3],
        timeInEvents: timeInEvents,
        timeOutEvents: timeOutEvents
    }
}

function createEmployeeRecords(secArr) { 
   
   const employeeArr = [];
   secArr.forEach((element) => {
       employeeArr.push(createEmployeeRecord(element));
   })
   return employeeArr;
}


function createTimeInEvent(empObj, timeStampIn) {
    const inObj = {
        type: "TimeIn",
        hour: parseInt(timeStampIn.slice(11)),
        date: timeStampIn.slice(0, 10),
    }
   empObj.timeInEvents.push(inObj);
   return empObj;
}

function createTimeOutEvent(empObj, timeStampOut) {
    const outObj = {
        type: "TimeOut",
        hour: parseInt(timeStampOut.slice(11)),
        date: timeStampOut.slice(0, 10),
    } 
    empObj.timeOutEvents.push(outObj);
    return empObj;    
}

function hoursWorkedOnDate(empObj, workDate) {
    const timeInArr = empObj.timeInEvents;
    const resultsIn = timeInArr.find(object => {return object.date === workDate});
    const timeOutArr = empObj.timeOutEvents;
    const resultsOut = timeOutArr.find(object => {return object.date === workDate});

    let inHours = '';
    if (resultsIn.hour < 1000) {
        inHours = parseInt(resultsIn.hour.toString().slice(0,1));
    } else {
        inHours = parseInt(resultsIn.hour.toString().slice(0,2));
    }

    let outHours = '';
    if (resultsOut.hour < 1000) {
        outHours = parseInt(resultsOut.hour.toString().slice(0,1));
    } else {
        outHours = parseInt(resultsOut.hour.toString().slice(0,2));
    }

    const inMinutes = parseInt(resultsIn.hour.toString().slice(2));
    const outMinutes = parseInt(resultsOut.hour.toString().slice(2));

    const totInMinutes = (inHours * 60) + inMinutes;
    const totOutMinutes = (outHours * 60) + outMinutes;

    const totalMinutes = totOutMinutes - totInMinutes;
    return Math.floor(totalMinutes / 60);
}

function wagesEarnedOnDate(empObj, workDate) {
    const hourWork = hoursWorkedOnDate(empObj, workDate);
    const hourRate = empObj.payPerHour * 100;
    return Math.floor((hourWork * hourRate) / 100);
}

function allWagesFor(empObj) {
    let hoursTot = 0
    let hoursDay = 0
    let workDates = [];

    let dateArr = empObj.timeInEvents;

    for (let i = 0; i < dateArr.length; i++) {
        workDates.push(dateArr[i].date);
        hoursDay = hoursWorkedOnDate(empObj, dateArr[i].date) 
        hoursTot += hoursDay    
    }
    
    return hoursTot * empObj.payPerHour;
}

function calculatePayroll(empArray) {

    let allEmpPay = 0;

    for (let i = 0; i < empArray.length; i++) {
        let employeePay = allWagesFor(empArray[i]);
        allEmpPay = allEmpPay + employeePay;
    }

    return allEmpPay;
}




