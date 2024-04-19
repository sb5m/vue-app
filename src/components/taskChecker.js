// taskChecker.js

export function checkTasks(tasks) {
    console.log('Checking tasks:', tasks);
  
    const currentTime = new Date().getTime();
  
    tasks.forEach(task => {
      // Parse task completion time string into a JavaScript Date object
      const [datePart, timePart] = task.completionTime.split(', ');
      const [day, month, year] = datePart.split('/').map(Number);
      const [hour, minute, second] = timePart.split(':').map(Number);
  
      // Month in JavaScript Date is 0-based, so subtract 1 from the month
      const completionTime = new Date(year, month - 1, day, hour, minute, second);
  
      const taskTime = completionTime.getTime(); // Convert task completion time to milliseconds
  
      console.log(`Current time: ${currentTime}, Task time: ${taskTime}`);
  
      if (currentTime >= taskTime) {
        console.log(`Task '${task.name}' is due now or overdue!`);
      }
    });
  }
  