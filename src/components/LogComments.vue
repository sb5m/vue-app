<template>
  <div>
    <h2>Log Raw Data:</h2>
    <pre>{{ log }}</pre>

    <button @click="downloadAllLogs">Download Logs</button>
    
    <input type="file" @change="handleFileUpload" accept=".json" />
  </div>
</template>

<script>
export default {
  props: {
    log: {
      type: String,
      required: true
    }
  },
  methods: {
    downloadAllLogs() {
      const logsData = localStorage.getItem('Logs');
      if (!logsData) {
        console.error('No logs found in internal storage');
        return;
      }
      
      const logs = JSON.parse(logsData);
      
      const logsJson = JSON.stringify(logs);
      const blob = new Blob([logsJson], { type: 'application/json' });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'logs.json';

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      URL.revokeObjectURL(url);
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContents = event.target.result;
        try {
          const jsonData = JSON.parse(fileContents);
          localStorage.setItem('jsonData', JSON.stringify(jsonData));
          this.showNotification('Data loaded successfully');
        } catch (error) {
          console.error('Error parsing JSON:', error);
          this.showNotification('Error loading data. Please check the file format.');
        }
      };
      
      reader.readAsText(file);
    },
    showNotification(message) {
      alert(message);
    }
  }
};
</script>
