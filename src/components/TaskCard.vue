<template>
    <div class="task-card-content">
      <div class="task-header">
        <p class="task-title">{{ task.title }}</p>
        <img
          class="task-avatar"
          src="../assets/rac.png"
          alt="Avatar"
        />
      </div>
      <div class="task-footer">
        <span class="task-date">{{ task.date }}</span>
        <BadgeItem v-if="task.isTask" :color="badgeColor.taskColor">{{ task.isTask }}</BadgeItem>
        <BadgeItem v-if="task.type" :color="badgeColor.typeColor">{{ task.type }}</BadgeItem>
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
            Backend: "blue",
            QA: "green",
            "ToDo": "blue",
            "Epic": "purple",
            "Chaser": "green",
            default: "teal"
        };

        return {
            taskColor: mappings[this.task.isTask] || mappings.default,
            typeColor: mappings[this.task.type] || mappings.default
        };
    }
    },
  };
  </script>
  
  <style scoped>
  .task-card-content {
    background-color: white;
    padding: 12px;
    border-radius: 6px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid white;
  }
  
  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .task-title {
    font-weight: bold;
    font-size: 14px;
    color: #555;
  }
  
  .task-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  
  .task-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  
  .task-date {
    font-size: 12px;
    color: #888;
  }
  </style>
  