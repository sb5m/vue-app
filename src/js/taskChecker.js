let popupCount = 0;

function showCustomPopup(message, duration = 15000) {
  // Create the popup container
  const popup = document.createElement('div');
  popup.innerText = message;
  
  // Style the popup
  popup.style.position = 'fixed';
  popup.style.top = `${20 + popupCount * 80}px`; // Each popup is spaced 80px apart vertically
  popup.style.right = '20px';
  popup.style.padding = '20px 40px';
  popup.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  popup.style.color = '#fff';
  popup.style.borderRadius = '5px';
  popup.style.border = '2px solid #487f85';
  popup.style.minWidth = '15%';
  popup.style.maxWidth = '15%';
  popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  popup.style.zIndex = '1000';
  popup.style.transition = 'opacity 0.5s';

  // Append the popup to the body
  document.body.appendChild(popup);

  popupCount++;

  // Automatically remove the popup after the duration
  const autoRemoveTimeout = setTimeout(() => {
    removePopup(popup);
  }, duration);

  popup.classList.add('custom-popup');

  // Add click event listener to close the popup manually
  popup.addEventListener('click', () => {
    clearTimeout(autoRemoveTimeout);
    removePopup(popup);
  });
}

function removePopup(popup) {
  popup.style.opacity = '0';
  setTimeout(() => {
    document.body.removeChild(popup);
    popupCount--;

    // Adjust positions of remaining pop-ups
    const remainingPopups = document.querySelectorAll('.custom-popup');
    remainingPopups.forEach((popup, index) => {
      popup.style.top = `${20 + index * 80}px`;
    });
  }, 500);
}

function showBrowserNotification(message) {
  // Check if the Notifications API is supported
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notifications.");
    return;
  }

  // Request permission if it hasn't been granted
  if (Notification.permission === "default") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("Task Alert", { body: message });
      }
    });
  } else if (Notification.permission === "granted") {
    // Show the notification
    new Notification("Task Alert", { body: message });
  } else {
    console.warn("Notifications are blocked. Please enable them in browser settings.");
  }
}

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
        const message = `Log '${log.content}' is overdue!`;

        // Show custom pop-up
        showCustomPopup(message);

        // Show browser notification
        showBrowserNotification(message);

        return log;
      }
    }
    return log;
  });

  console.log('Updated logs:', updatedLogs);

  localStorage.setItem('Logs', JSON.stringify(updatedLogs));
}
