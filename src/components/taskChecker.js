export function checkTasks(logs) {
  console.log('Checking logs:', logs);

  const currentTime = new Date().getTime();

  logs.forEach(log => {
    if (log.isTask) { // Check if it's a task
      const [datePart, timePart] = log.timestamp.split(', ');
      const [day, month, year] = datePart.split('/').map(Number);
      const [hour, minute, second] = timePart.split(':').map(Number);

      // Month in JavaScript Date is 0-based, so subtract 1 from the month
      const logTime = new Date(year, month - 1, day, hour, minute, second).getTime();

      console.log(`Current time: ${currentTime}, Log time: ${logTime}`);

      if (currentTime >= logTime) {
        const confirmMessage = `Log '${log.content}' is due now or overdue! Do you want to continue?`;
        const confirmed = window.confirm(confirmMessage);
        if (confirmed) {
          console.log("User confirmed to continue.");
          // You can put further actions here if the user confirms
        } else {
          console.log("User canceled the operation.");
          // You can put actions for cancellation here
        }
      }
    }
  });
}
