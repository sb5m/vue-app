// taskChecker.js

export function checkTasks(logs) {
  console.log('Checking logs:', logs);

  const currentTime = new Date().getTime();

  const updatedLogs = logs.map(log => {
    if (log.isTask) {
      const [datePart, timePart] = log.timestamp.split(', ');
      const [day, month, year] = datePart.split('/').map(Number);
      const [hour, minute, second] = timePart.split(':').map(Number);

      // Month in JavaScript Date is 0-based, so subtract 1 from the month
      const logTime = new Date(year, month - 1, day, hour, minute, second).getTime();

      console.log(`Current time: ${currentTime}, Log time: ${logTime}`);

      if (currentTime >= logTime) {
        const confirmMessage = `Log '${log.content}' is overdue! Do you want to continue?`;
        const confirmed = window.confirm(confirmMessage);
        if (confirmed) {
          console.log("User confirmed to continue.");
          return { ...log, isTask: false }; // Create a new log object with isTask set to false
        } else {
          console.log("User canceled the operation.");
          return log; // Return original log if the user cancels
        }
      }
    }
    return log; // Return original log if it's not a task
  });


  console.log('Updated logs:', updatedLogs);

  localStorage.setItem('Logs', JSON.stringify(updatedLogs));
}
