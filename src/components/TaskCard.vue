<template>
    <div class="task-card-content">
      <div class="task-header">
        <p class="task-title">{{ task.title }}</p>
        <img
          class="task-avatar"
          src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
          alt="Avatar"
        />
      </div>
      <div class="task-footer">
        <span class="task-date">{{ task.date }}</span>
        <BadgeItem v-if="task.type" :color="badgeColor">{{ task.type }}</BadgeItem>
      </div>
    </div>
  </template>
  
  <script>
  import BadgeItem from "./BadgeItem.vue";
  
  export default {
    components: {
        BadgeItem,
    },
    props: {
      task: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      badgeColor() {
        const mappings = {
          Design: "purple",
          "Feature Request": "teal",
          Backend: "blue",
          QA: "green",
          default: "teal",
        };
        return mappings[this.task.type] || mappings.default;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styling for the task card container */
  .task-card-content {
    background-color: white;
    padding: 12px;
    border-radius: 6px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid white;
  }
  
  /* Header of the task card */
  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  /* Task title text */
  .task-title {
    font-weight: bold;
    font-size: 14px;
    color: #555;
  }
  
  /* Avatar image */
  .task-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  
  /* Footer of the task card */
  .task-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  
  /* Task date text */
  .task-date {
    font-size: 12px;
    color: #888;
  }
  </style>
  