// logMethods.js

export function toggleLists(context) {
    context.selectedList = context.selectedList === 1 ? 2 : 1;
    context.selectedLog = null;
  }
  
  export function deleteLog(context, log) {
    const index = context.logs.findIndex(item => item.id === log.id);
    if (index !== -1) {
      context.logs.splice(index, 1);
      saveData(context);
    }
  }
  
  export function moveUp(context, selectedLog) {
    if (selectedLog) {
      const index = context.logs.indexOf(selectedLog);
      if (index > 0) {
        const temp = context.logs[index];
        context.logs.splice(index, 1);
        context.logs.splice(index - 1, 0, temp);
        saveData(context);
      }
    }
  }
  
  export function moveDown(context, selectedLog) {
    if (selectedLog) {
      const index = context.logs.indexOf(selectedLog);
      if (index < context.logs.length - 1) {
        const temp = context.logs[index];
        context.logs.splice(index, 1);
        context.logs.splice(index + 1, 0, temp);
        saveData(context);
      }
    }
  }

  export function initializeLogs() {
    let logIdCounter = localStorage.getItem('logIdCounter');
    if (!logIdCounter) {
      localStorage.setItem('logIdCounter', 1);
    }
  }
  
  export function addLog(context, listNumber) {
    let newLogContent = '';
    let type = "Chaser";
    if (listNumber === 1) {
      newLogContent = context.newLog1;
      context.newLog1 = '';
      type = "ToDo";
    } else if (listNumber === 2) {
      newLogContent = context.newLog2;
      context.newLog2 = '';
      type = "Epic";
    }
  
    if (newLogContent.trim() !== '') {
      const timestamp = new Date();
      const dateTimestamp = new Date(timestamp.getTime()).toLocaleString();
      const taskTimestamp = new Date(timestamp.getTime() + 4 * 60 * 60 * 1000).toLocaleString(); // default 4 hour deadline

      let logIdCounter = localStorage.getItem('logIdCounter');
      if (!logIdCounter) {
        logIdCounter = 1;
      } else {
        logIdCounter = parseInt(logIdCounter);
      }
  
      const newLogId = logIdCounter;
      localStorage.setItem('logIdCounter', logIdCounter + 1);

      /**
       * @typedef {Object} Log
       * @property {number} id
       * @property {string} content
       * @property {number} list
       * @property {boolean} done
       * @property {number} status
       * @property {string} extraInfo
       * @property {string} timestamp
       * @property {boolean} highlightedRed
       * @property {boolean} highlightedOrange
       * @property {boolean} highlightedGreen
       * @property {boolean} isTask
       * @property {string} type
       */

      if (listNumber === 1) {
        context.logs.push({
          id: newLogId,
          content: newLogContent,
          list: listNumber,
          done: false,
          status: 1,
          extraInfo: "",
          timestamp: taskTimestamp,
          highlightedRed: false,
          highlightedOrange: false,
          highlightedGreen: false,
          isTask: true,
          type: type
        });
      } else if (listNumber === 2) {
        context.logs.push({
          id: newLogId,
          content: newLogContent,
          list: listNumber,
          done: false,
          status: 1,
          extraInfo: "",
          timestamp: dateTimestamp,
          highlightedRed: false,
          highlightedOrange: false,
          highlightedGreen: false,
          isTask: false,
          type: type
        });
      }
  
      saveData(context);
    }
  }
  
  export function doneLog(context, log) {
    log.done = !log.done;
    saveData(context);
  }
  
  export function saveData(context) {
    const storageData = JSON.stringify(context.logs);
    localStorage.setItem(context.storageKey, storageData);
  }
  
  export function toggleHighlightRed(context, log) {
    if (log) {
      log.highlightedRed = !log.highlightedRed;
      if (log.highlightedRed) {
        log.highlightedOrange = false;
        log.highlightedGreen = false;
      }
      saveData(context);
    }
  }
  
  export function toggleHighlightOrange(context, log) {
    if (log) {
      log.highlightedOrange = !log.highlightedOrange;
      if (log.highlightedOrange) {
        log.highlightedRed = false;
        log.highlightedGreen = false;
      }
      saveData(context);
    }
  }
  
  export function toggleHighlightGreen(context, log) {
    if (log) {
      log.highlightedGreen = !log.highlightedGreen;
      if (log.highlightedGreen) {
        log.highlightedOrange = false;
        log.highlightedRed = false;
      }
      saveData(context);
    }
  }
  