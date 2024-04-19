export function checkTasks(logs) {
    console.log('Checking logs:', logs);
  
    const currentTime = new Date().getTime();
  
    logs.forEach(log => {
      const [datePart, timePart] = log.timestamp.split(', ');
      const [day, month, year] = datePart.split('/').map(Number);
      const [hour, minute, second] = timePart.split(':').map(Number);
  
      // Month in JavaScript Date is 0-based, so subtract 1 from the month
      const logTime = new Date(year, month - 1, day, hour, minute, second).getTime();
  
      console.log(`Current time: ${currentTime}, Log time: ${logTime}`);
  
      if (currentTime >= logTime) {
        console.log(`Log '${log.content}' is due now or overdue!`);
      }
    });
  }
  