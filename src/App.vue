<template>
  <div class="app">
    <h1 class="app-title">vue app</h1>
    <div class="separator"></div>
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
            <span :class="{ done: log.done }" @click="doneLog(log)">{{ log.content }}</span>
            <button @click="removeLog(index)" class="remove-button">Remove</button>
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
            <span :class="{ done: log.done }" @click="doneSecondLog(log)">{{ log.content }}</span>
            <button @click="removeSecondLog(index)" class="remove-button">Remove</button>
          </li>
        </ul>
        <h4 v-if="secondList.length === 0" class="empty-list">Empty list.</h4>
      </div>
    </div>
  </div>
</template>

<script>
import './App.scss';

export default {
  name: 'App',
  data() {
    return {
      newLog: '',
      defaultData: [
        {
          done: false,
          content: 'This is a logger test',
        },
      ],
      logs: [],
      storageKey: 'Logs',
      secondList: [],
      secondStorageKey: 'secondLogs',
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
  methods: {
    addLog() {
      if (this.newLog) {
        this.logs.push({
          done: false,
          content: this.newLog,
        });
        this.newLog = '';
        this.saveData();
      }
    },
    doneLog(log) {
      log.done = !log.done;
      this.saveData();
    },
    removeLog(index) {
      this.logs.splice(index, 1);
      this.saveData();
    },
    saveData() {
      const storageData = JSON.stringify(this.logs);
      localStorage.setItem(this.storageKey, storageData);
    },
    // Functions for the second list
    addSecondLog() {
      if (this.newLog) {
        this.secondList.push({
          done: false,
          content: this.newLog,
        });
        this.newLog = '';
        this.saveSecondData();
      }
    },
    doneSecondLog(log) {
      log.done = !log.done;
      this.saveSecondData();
    },
    removeSecondLog(index) {
      this.secondList.splice(index, 1);
      this.saveSecondData();
    },
    saveSecondData() {
      const storageData = JSON.stringify(this.secondList);
      localStorage.setItem(this.secondStorageKey, storageData);
    },
  },
};
</script>
