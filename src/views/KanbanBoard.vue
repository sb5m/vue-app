<template>
  <div class="app">
    <h1 class="app-title">Vue App</h1>
    <div class="separator"></div>
    <div class="panel-container">
      <!-- Left Panel (Control Panel) -->
      <div class="left-panel">
        <div class="control-panel">
          <h2>Control Panel</h2>
          <div class="select-wrapper">
            <select v-model="selectedLog">
              <option v-for="(log, index) in currentList" :key="index" :value="log">{{ log.content }}</option>
            </select>
            <div class="selected-list">{{ selectedVariableList }}</div>
          </div>
          <button @click="deleteLog(selectedLog)" class="delete-button">Delete</button>
          <button @click="toggleLists" class="toggle-button">Toggle Lists</button>
          <LogComments />
        </div>
      </div>

      <!-- Center Panel (Kanban Board) -->
      <div class="center-panel">
        <div class="kanban-container">
          <div class="kanban-board">
            <!-- Loop through columns and render them in the center panel -->
            <div
              v-for="column in columns"
              :key="column.title"
              class="kanban-item"
            >
              <p class="column-title">{{ column.title }}</p>

              <!-- Draggable tasks within each column -->
              <draggable
                v-model="column.tasks"
                :animation="200"
                ghost-class="ghost-card"
                group="tasks"
                item-key="id"
                @change="updateTaskStatus($event, column)"
              >
                <template #item="{ element: task }">
                  <TaskCard :task="task" class="task-card"></TaskCard>
                </template>
              </draggable>

            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel (Router Panel) -->
      <div class="right-panel">
        <div class="router-panel">
          <h2>Router Panel</h2>
          <button @click="$router.push('/item')" class="goto-item-button">Go to Item</button>
          <button @click="$router.push('/')" class="goto-item-button">Dashboard</button>
        </div>
      </div>
    </div>
  </div>

  <!-- MainDisclaimer component -->
  <MainDisclaimer />
</template>


<script>
import draggable from "vuedraggable";
import TaskCard from "../components/TaskCard.vue";
import LogComments from '../components/LogComments.vue';
import MainDisclaimer from "../components/MainDisclaimer.vue";
import {
  deleteLog,
  toggleLists,
} from '../js/logMethods.js';

export default {
  name: "App",
  components: {
    TaskCard,
    draggable,
    LogComments,
    MainDisclaimer
  },
  data() {
    return {
      columns: this.loadColumnsFromLocalStorage(),
      selectedLog: null,
      selectedList: 1,
    };
  },
  created() {
    const storedLogs = localStorage.getItem('Logs');
    if (storedLogs) {
      this.logs = JSON.parse(storedLogs);
      this.mapLogsToColumns();
    }
  },
  computed: {
    currentList() {
      return this.logs.filter(log => log.list === this.selectedList);
    },
    selectedVariableList() {
      return this.selectedList;
    },
  },
  methods: {
    loadColumnsFromLocalStorage() {
      const savedColumns = localStorage.getItem("columns");
      return savedColumns ? JSON.parse(savedColumns) : this.defaultColumns();
    },

    defaultColumns() {
      return [
        { title: "Backlog", tasks: [] },
        { title: "In Progress", tasks: [] },
        { title: "Review", tasks: [] },
        { title: "Done", tasks: [] }
      ];
    },
    toggleLists() {
      toggleLists(this);
    },
    deleteLog(log) {
      if (!log) {
        alert("No log selected to delete.");
        return;
      }
      
      deleteLog(this, log);
      this.mapLogsToColumns();
      this.saveData();
    },

    // Map logs to the correct Kanban columns based on their 'list' property
    mapLogsToColumns() {
      this.columns.forEach(column => {
        column.tasks = [];
      });

      this.logs.forEach(log => {
        const task = {
          id: log.id,
          title: log.content,
          date: log.timestamp,
          isTask: log.isTask ? 'Task' : 'Other',
          done: log.done,
          status: log.status,
          highlightedRed: log.highlightedRed,
          highlightedOrange: log.highlightedOrange,
          highlightedGreen: log.highlightedGreen,
          type: log.type
        };

        if (log.status === 1) {
          this.columns[0].tasks.push(task); // Backlog
        } else if (log.status === 2) {
          this.columns[1].tasks.push(task); // In Progress
        } else if (log.status === 3) {
          this.columns[2].tasks.push(task); // Review
        } else if (log.status === 4) {
          this.columns[3].tasks.push(task); // Done
        }
      });
    },

    updateTaskStatus(event, column) {
      console.log("updateTaskStatus called with column:", column.title, "event:", event);

      if (event.added) {
        const addedTask = event.added.element;

        const logToUpdate = this.logs.find(log => log.id === addedTask.id);
        if (logToUpdate) {
          logToUpdate.status = this.getStatusFromColumnTitle(column.title);
          console.log("Updated Log Status:", logToUpdate.status);

          this.saveData();
        }
      }
    },

    getStatusFromColumnTitle(title) {
      switch (title) {
        case "Backlog":
          return 1;
        case "In Progress":
          return 2;
        case "Review":
          return 3;
        case "Done":
          return 4;
        default:
          return 1;
      }
    },

    // Save logs data to localStorage
    saveData() {
      localStorage.setItem("Logs", JSON.stringify(this.logs));
    }
  },
};
</script>


<style src="./KanbanBoard.css"></style>