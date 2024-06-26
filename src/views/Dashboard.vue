<template>
  <div class="app">
    <h1 class="app-title">vue app</h1>
    <div class="separator"></div>
    <div class="panel-container">
      <div class="left-panel">
        <div class="control-panel">
          <h2>Control Panel</h2>
            <div class="select-wrapper">
              <select v-model="selectedLog">
                <option v-for="(log, index) in currentList" :key="index" :value="log">{{ log.content }}</option>
              </select>
              <div class="selected-list">{{ selectedVariableList }}</div>
            </div>
            <button @click="toggleHighlightRed(selectedLog)" class="highlight-button">Toggle Red</button>
            <button @click="toggleHighlightGreen(selectedLog)" class="highlight-button">Toggle Green</button>
            <button @click="deleteLog(selectedLog)" class="delete-button">Delete</button>
            <button @click="toggleLists" class="toggle-button">Toggle Lists</button>
            <button @click="moveUp(selectedLog)" class="move-button">Move Up</button>
            <button @click="moveDown(selectedLog)" class="move-button">Move Down</button>
            <LogComments :log="selectedLog" />
        </div>
      </div>
      <div class="center-panel">
        <div class="logs-container">
          <div class="log-class-list">
            <form @submit.prevent="addLog(1)" class="log-form">
              <label class="form-label">New Log</label>
              <input v-model="newLog1" class="form-input" name="newLog" autocomplete="off" />
              <button class="form-button">Add Log</button>
            </form>
            <h2 class="list-title">Log List</h2>
            <ul class="log-list">
              <li v-for="(log, index) in list1" :key="index" class="log-item">
                <span :class="{ done: log.done, 'highlight-red': log.highlightedRed, 'highlight-green': log.highlightedGreen }" @click="doneLog(log)">{{ log.content }}</span>
                <button class="remove-button" @click="deleteLog(log)">Remove</button>
              </li>
            </ul>
            <h4 v-if="list1.length === 0" class="empty-list">Empty list.</h4>
          </div>
          <div class="log-class-list">
            <form @submit.prevent="addLog(2)" class="log-form">
              <label class="form-label">New Log</label>
              <input v-model="newLog2" class="form-input" name="newLog" autocomplete="off" />
              <button class="form-button">Add Log</button>
            </form>
            <h2 class="list-title">Log List</h2>
            <ul class="log-list">
              <li v-for="(log, index) in list2" :key="'second-' + index" class="log-item">
                <span :class="{ done: log.done, 'highlight-red': log.highlightedRed, 'highlight-green': log.highlightedGreen }" @click="doneLog(log)">{{ log.content }}</span>
                <button class="remove-button" @click="deleteLog(log)">Remove</button>
              </li>
            </ul>
            <h4 v-if="list2.length === 0" class="empty-list">Empty list.</h4>
          </div>
        </div>
      </div>
      <div class="right-panel">
        <div class="router-panel">
          <h2>Router Panel</h2>
          <button @click="$router.push('/item')" class="goto-item-button">Go to Item</button>
        </div>
      </div>
    </div>
  </div>
  <!-- MainDisclaimer component -->
  <MainDisclaimer/>
</template>

<script>
import '../assets/css/Variables.css';
import './Dashboard.css';
import LogComments from '../components/LogComments.vue';
import MainDisclaimer from "../components/MainDisclaimer.vue";
import { checkTasks } from '../components/taskChecker.js';

/**
 * @typedef {Object} Log
 * @property {number} id
 * @property {string} content
 * @property {number} list
 * @property {boolean} done
 * @property {string} extraInfo
 * @property {string} timestamp
 * @property {boolean} highlightedRed
 * @property {boolean} highlightedGreen
 * @property {boolean} isTask
 */

export default {
  name: 'App',
  components: {
    LogComments,
    MainDisclaimer
  },
  data() {
    return {
      newLog1: '',
      newLog2: '',
      defaultData: [
        {
          id: 0,
          content: 'This is a logger test',
          list: null,
          done: false,
          extraInfo: 'Additional information',
          timestamp: new Date().toISOString(),
          highlightedRed: false,
          highlightedGreen: false,
          isTask: false
        },
      ],
      logs: [],
      storageKey: 'Logs',
      selectedLog: null,
      selectedList: 1,
      logIdCounter: 1,
    };
  },
  created() {
    const storedLogs = localStorage.getItem(this.storageKey);
    if (storedLogs) {
      this.logs = JSON.parse(storedLogs);
    }
    checkTasks(this.logs);
    setInterval(() => {
      checkTasks(this.logs);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
  },
  computed: {
    currentList() {
      return this.logs.filter(log => log.list === this.selectedList);
    },
    selectedVariableList() {
      return this.selectedList;
    },
    list1() {
      return this.logs.filter(log => log.list === 1);
    },
    list2() {
      return this.logs.filter(log => log.list === 2);
    },
  },
  methods: {
    toggleLists() {
      this.selectedList = this.selectedList === 1 ? 2 : 1;
      this.selectedLog = null;
    },
    deleteLog(log) {
      const index = this.logs.indexOf(log);
      if (index !== -1) {
        this.logs.splice(index, 1);
        this.saveData();
      }
    },
    moveUp(selectedLog) {
      if (selectedLog) {
        const index = this.logs.indexOf(selectedLog);
        if (index > 0) {
          const temp = this.logs[index];
          this.logs.splice(index, 1);
          this.logs.splice(index - 1, 0, temp);
          this.saveData();
        }
      }
    },
    moveDown(selectedLog) {
      if (selectedLog) {
        const index = this.logs.indexOf(selectedLog);
        if (index < this.logs.length - 1) {
          const temp = this.logs[index];
          this.logs.splice(index, 1);
          this.logs.splice(index + 1, 0, temp);
          this.saveData();
        }
      }
    },
    addLog(listNumber) {
      let newLogContent = '';
      if (listNumber === 1) {
        newLogContent = this.newLog1;
        this.newLog1 = '';
      } else if (listNumber === 2) {
        newLogContent = this.newLog2;
        this.newLog2 = '';
      }

      // Default log values here
      if (newLogContent.trim() !== '') {
        const timestamp = new Date().toLocaleString();
        this.logs.push({
          id: this.logIdCounter++,
          content: newLogContent,
          list: listNumber,
          done: false,
          extraInfo: "",
          timestamp: timestamp,
          highlightedRed: false,
          highlightedGreen: false,
          isTask: false
        });
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
      if (log) {
        log.highlightedRed = !log.highlightedRed;
        if (log.highlightedRed) {
          log.highlightedGreen = false;
        }
        this.saveData();
      }
    },

    toggleHighlightGreen(log) {
      if (log) {
        log.highlightedGreen = !log.highlightedGreen;
        if (log.highlightedGreen) {
          log.highlightedRed = false;
        }
        this.saveData();
      }
    },
  },
};
</script>

<style scoped>
.highlight-red {
  background-color: #9c2727;
  color: white;
  border-radius: 3px;
}
.highlight-green {
  background-color: #1d611d;
  color: white;
  border-radius: 3px;
}
</style>
