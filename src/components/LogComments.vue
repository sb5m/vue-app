<template>
    <div>
      <h2>Log Comments</h2>
      <div class="log-details">
        <h3>{{ log.content }}</h3>
        <!-- Display log details here -->
      </div>
      <div class="comment-section">
        <!-- Your comment section -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['log'],
    created() {
      // Remove this line if you're not using logId
      const logId = this.$route.params.logId;
      // Use logId if needed
      console.log(logId);
    }
  };
  </script>
  