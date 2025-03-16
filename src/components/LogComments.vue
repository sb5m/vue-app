<template>
  <div class="log-container">
    <h2>Log Raw Data:</h2>

    <button @click="downloadAllLogs">Download Logs</button>
    
    <input type="file" @change="handleFileUpload" accept=".json" />
  </div>
</template>

<script>
export default {
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
          localStorage.setItem('Logs', JSON.stringify(jsonData));
          this.showNotification('Logs loaded in Local Storage');
          window.location.reload();
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

<style scoped>
.log-container {
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

button,
input[type="file"] {
  display: block;
  max-width: 100%;
  box-sizing: border-box;
}
</style>
