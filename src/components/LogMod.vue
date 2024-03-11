<template>
    <div class="log-details">
      <h2>Log Details</h2>
      <div>
        <label for="logSelect">Select Log:</label>
        <select id="logSelect" v-model="selectedLogId">
          <option value="">Select a log...</option>
          <option v-for="log in logs" :key="log.id" :value="log.id">{{ log.content }}</option>
        </select>
      </div>
      <div v-if="log">
        <div>
          <label for="content">Content:</label>
          <input type="text" id="content" v-model="log.content" />
        </div>
        <div>
          <label for="extraInfo">Extra Information:</label>
          <textarea id="extraInfo" v-model="log.extraInfo"></textarea>
        </div>
        <div>
          <label for="timestamp">Timestamp:</label>
          <input type="text" id="timestamp" v-model="log.timestamp" />
        </div>
        <button @click="saveLogChanges">Save Changes</button>
      </div>
      <div v-else>
        <p>No log selected.</p>
      </div>
    </div>
    <router-link to="/">
        <button class="goto-ini-button">Go to Test</button>
      </router-link>
</template>
  
<script>
  export default {
    name: 'LogDetails',
    data() {
      return {
        selectedLogId: null,
        log: null,
        logs: []
      };
    },
    created() {
      const storedLogs = localStorage.getItem('Logs');
      if (storedLogs) {
        this.logs = JSON.parse(storedLogs);
      }
    },
    watch: {
      selectedLogId(newId) {
        this.log = this.logs.find(log => log.id === parseInt(newId));
      }
    },
    methods: {
      saveLogChanges() {
        console.log("Log details saved:", this.log);
        localStorage.setItem('Logs', JSON.stringify(this.logs));
      }
    }
  };
</script>
  
<style scoped>
.log-details {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;

    h2 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    select,
    input[type="text"],
    textarea {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 14px;
    }

    button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }

    button:hover {
        background-color: #45a049;
    }

    p {
        font-size: 16px;
        color: #888;
    }

    .goto-ini-button {
        margin-top: 20px;
    }
}
</style>