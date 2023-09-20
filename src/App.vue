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


<style lang="scss">
$border: 2px solid
  rgba(
    $color: white,
    $alpha: 0.35,
  );
$size1: 6px;
$size2: 12px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: #17181a;
$textColor: white;
$primaryColor: #89babf;
$secondTextColor: #1f2023;

body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $backgroundColor;
  color: $textColor;
  #app {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    .app-title {
      font-weight: bold;
      font-size: 28px;
      text-align: center;
    }
    .separator {
      border-bottom: 1px solid $primaryColor; /* Add a border as a separator */
      margin: 20px 0 30px; /* Adjust margin to create space */
    }
    .logs-container {
      display: flex;
      justify-content: space-between;
      .log-class-list {
        width: 48%;
        .log-form {
          display: flex;
          flex-direction: column;
          width: 100%;
          .form-label {
            font-size: 14px;
            font-weight: bold;
          }
          .form-input,
          .form-button {
            height: $size5;
            box-shadow: none;
            outline: none;
            padding-left: $size2;
            padding-right: $size2;
            border-radius: $size1;
            font-size: 18px;
            margin-top: $size1;
            margin-bottom: $size2;
          }
          .form-input {
            background-color: transparent;
            border: $border;
            color: inherit;
          }
          .form-button {
            cursor: pointer;
            background-color: $primaryColor;
            border: 1px solid $primaryColor;
            color: $secondTextColor;
            font-weight: bold;
            outline: none;
            border-radius: $size1;
          }
        }
        .list-title {
          font-size: 22px;
          border-bottom: $border;
          padding-bottom: $size1;
        }
        .log-list {
          padding: 10px;
          .log-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: $border;
            padding: $size2 $size4;
            border-radius: $size1;
            margin-bottom: $size2;
            span {
              cursor: pointer;
            }
            .done {
              text-decoration: line-through;
            }
            button {
              cursor: pointer;
              font-size: $size2;
              padding: $size1;
              background-color: $primaryColor;
              border: 1px solid $primaryColor;
              color: $secondTextColor;
              font-weight: bold;
              border-radius: $size1;
            }
          }
        }
        .empty-list {
          text-align: center;
          opacity: 0.5;
          margin: 0;
        }
      }
    }
  }
}

</style>
