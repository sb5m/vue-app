<template>
  <div class="app">
    <h1 class="app-title">vue app</h1>
    <div class="separator"></div>
    <div class="control-panel">
      <h2>Control Panel</h2>
        <select v-model="selectedLog">
          <option v-for="(log, index) in currentList" :key="index" :value="log">{{ log.content }}</option>
        </select>
        <button @click="toggleHighlightRed(selectedLog)" class="highlight-button">Toggle Red</button>
        <button @click="toggleHighlightGreen(selectedLog)" class="highlight-button">Toggle Green</button>
        <button @click="deleteLog(selectedLog)" class="delete-button">Delete</button>
        <button @click="toggleLists" class="toggle-button">Toggle Lists</button>
        <button @click="moveUp(selectedLog)" class="move-button">Move Up</button>
        <button @click="moveDown(selectedLog)" class="move-button">Move Down</button>
        <div class="selected-list">{{ selectedVariableList }}</div>
    </div>
    <div class="logs-container">
      <div class="log-class-list">
        <form @submit.prevent="addLog" class="log-form">
          <label class="form-label">New Log</label>
          <input v-model="newLog" class="form-input" name="newLog" autocomplete="off" />
          <button class="form-button">Add Log</button>
        </form>
        <h2 class="list-title">Log List</h2>
        <ul class="log-list">
          <li v-for="(log, index) in logs" :key="index" class="log-item">
            <span :class="{ done: log.done, 'highlight-red': log.highlightedRed, 'highlight-green': log.highlightedGreen }" @click="doneLog(log)">{{ log.content }}</span>
            <button class="remove-button">Remove</button>
          </li>
        </ul>
        <h4 v-if="logs.length === 0" class="empty-list">Empty list.</h4>
      </div>
      <div class="log-class-list">
        <form @submit.prevent="addSecondLog" class="log-form">
          <label class="form-label">New Log</label>
          <input v-model="newLog" class="form-input" name="newLog" autocomplete="off" />
          <button class="form-button">Add Log</button>
        </form>
        <h2 class="list-title">Log List</h2>
        <ul class="log-list">
          <li v-for="(log, index) in secondList" :key="'second-' + index" class="log-item">
            <span :class="{ done: log.done, 'highlight-red': log.highlightedRed, 'highlight-green': log.highlightedGreen }" @click="doneSecondLog(log)">{{ log.content }}</span>

            <button class="remove-button">Remove</button>
          </li>
        </ul>
        <h4 v-if="secondList.length === 0" class="empty-list">Empty list.</h4>
      </div>
    </div>
    <div class="test-panel">
      <router-link to="/test">
        <button class="goto-test-button">Go to Test</button>
      </router-link>
      <template v-if="selectedLog">
        <router-link :to="'/logs/' + selectedLog.id">
          <span :class="{ done: selectedLog.done, 'highlight-red': selectedLog.highlightedRed, 'highlight-green': selectedLog.highlightedGreen }">{{ selectedLog.content }}</span>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import './Dashboard.scss';

/**
 * @typedef {Object} Log
 * @property {number} id
 * @property {boolean} done
 * @property {string} content
 * @property {boolean} highlightedRed
 * @property {boolean} highlightedGreen
 */

export default {
  name: 'App',
  data() {
    return {
      newLog: '',
      defaultData: [
        {
          done: false,
          content: 'This is a logger test',
          extraInfo: 'Additional information',
          timestamp: new Date().toISOString(),
          id: 1
        },
      ],
      logs: [],
      storageKey: 'Logs',
      secondList: [],
      secondStorageKey: 'secondLogs',
      selectedLog: null,
      selectedList: 'logs',
    };
  },
  created() {
    const storedLogs = localStorage.getItem(this.storageKey);
    if (storedLogs) {
      this.logs = JSON.parse(storedLogs);
    }

    const storedSecondLogs = localStorage.getItem(this.secondStorageKey);
    if (storedSecondLogs) {
      this.secondList = JSON.parse(storedSecondLogs);
    }
  },
  computed: {
    currentList() {
      return this.selectedList === 'logs' ? this.logs : this.secondList;
    },
    selectedVariableList() {
      if (this.selectedList === 'logs') {
      return 1;
      } else if (this.selectedList === 'secondLogs') {
        return 2;
      } else {
        return 0;
      }
    },
  },
  methods: {
    toggleLists() {
      this.selectedList = this.selectedList === 'logs' ? 'secondLogs' : 'logs';
    },
    deleteLog(selectedLog) {
      if (this.selectedList === 'logs') {
        const index = this.logs.indexOf(selectedLog);
        if (index !== -1) {
          this.logs.splice(index, 1);
          this.saveData();
        }
      } else if (this.selectedList === 'secondLogs') {
        const index = this.secondList.indexOf(selectedLog);
        if (index !== -1) {
          this.secondList.splice(index, 1);
          this.saveSecondData();
        }
      }
    },
    moveUp(selectedLog) {
      const index = this.currentList.indexOf(selectedLog);
      if (index > 0) {
        const temp = this.currentList[index];
        this.currentList.splice(index, 1);
        this.currentList.splice(index - 1, 0, temp);
        this.saveData();
      }
    },
    moveDown(selectedLog) {
      const index = this.currentList.indexOf(selectedLog);
      if (index < this.currentList.length - 1) {
        const temp = this.currentList[index];
        this.currentList.splice(index, 1);
        this.currentList.splice(index + 1, 0, temp);
        this.saveData();
      }
    },
    addLog() {
      if (this.newLog) {
        this.logs.push({
          id: this.logs.length + 1,
          done: false,
          content: this.newLog,
          highlightedRed: false,
          highlightedGreen: false,
        });
        this.newLog = '';
        this.saveData();
      }
    },
    doneLog(log) {
      log.done = !log.done;
      this.saveData();
    },
    saveData() {
      const storageData = JSON.stringify(this.logs);
      localStorage.setItem(this.storageKey, storageData);
    },
    toggleHighlightRed(log) {
      log.highlightedRed = !log.highlightedRed;
      if (log.highlightedRed) {
        log.highlightedGreen = false;
      }
    },
    toggleHighlightGreen(log) {
      log.highlightedGreen = !log.highlightedGreen;
      if (log.highlightedGreen) {
        log.highlightedRed = false;
      }
    },
    // Functions for the second list
    addSecondLog() {
      if (this.newLog) {
        this.secondList.push({
          id: this.logs.length + 1,
          done: false,
          content: this.newLog,
          highlightedRed: false,
          highlightedGreen: false,
        });
        this.newLog = '';
        this.saveSecondData();
      }
    },
    doneSecondLog(log) {
      log.done = !log.done;
      this.saveSecondData();
    },
    saveSecondData() {
      const storageData = JSON.stringify(this.secondList);
      localStorage.setItem(this.secondStorageKey, storageData);
    },
  },
};
</script>

<style scoped>
.highlight-red {
  background-color: red;
  color: white;
  border-radius: 3px;
}
.highlight-green {
  background-color: green;
  color: white;
  border-radius: 3px;
}
</style>
