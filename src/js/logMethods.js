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
  
  export function addLog(context, listNumber) {
    let newLogContent = '';
    if (listNumber === 1) {
      newLogContent = context.newLog1;
      context.newLog1 = '';
    } else if (listNumber === 2) {
      newLogContent = context.newLog2;
      context.newLog2 = '';
    }
  
    if (newLogContent.trim() !== '') {
      const timestamp = new Date().toLocaleString();
      context.logs.push({
        id: context.logIdCounter++,
        content: newLogContent,
        list: listNumber,
        done: false,
        status: 1,
        extraInfo: "",
        timestamp: timestamp,
        highlightedRed: false,
        highlightedOrange: false,
        highlightedGreen: false,
        isTask: false
      });
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
  