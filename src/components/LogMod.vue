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
          <input type="text" id="timestamp" v-model="log.timestamp" @input="validateTimestamp" />
          <span v-if="!isTimestampValid" class="error-message">Please enter a valid timestamp format (DD/MM/YYYY, HH:MM:SS).</span>
        </div>
        <div>
          <label for="isTask">Is this log a task?:</label>
          <select id="isTask" v-model="log.isTask">
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </div>
        <button @click="saveLogChanges">Save Changes</button>
      </div>
      <div v-else>
        <p>No log selected.</p>
      </div>
      <router-link to="/" class="goto-ini-link">
        <button class="goto-ini-button">Go to Test</button>
      </router-link>
    </div>
</template>

<script>
import './LogMod.css';

export default {
  name: 'LogDetails',
  data() {
    return {
      selectedLogId: null,
      log: null,
      logs: [],
      isTimestampValid: true
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
    },
    validateTimestamp() {
      // Regular expression for validating timestamp format: DD/MM/YYYY, HH:MM:SS
      const timestampRegex = /^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/;
      this.isTimestampValid = timestampRegex.test(this.log.timestamp);
    },
  }
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
