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
          <button @click="addTask(selectedLog)" class="highlight-button">Add Task</button>
          <button @click="toggleLists" class="toggle-button">Toggle Lists</button>
          <LogComments :log="selectedLog" />
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
                  <task-card :task="task" class="task-card"></task-card>
                </template>
              </draggable>

              <!-- Add Task button only for Backlog column -->
              <!-- <button 
                v-if="column.title === 'Backlog'" 
                @click="addTask(column)" 
                class="add-task-btn"
              >
                Add Task
              </button> -->
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
    // Get all tasks across all columns for the main panel
    allTasks() {
      return this.columns.flatMap(column => column.tasks);
    },
    currentList() {
      return this.logs.filter(log => log.list === this.selectedList);
    },
    selectedVariableList() {
      return this.selectedList;
    },
    list1() {
      return this.logs.filter(log => log.list === 1);
    },
    list2() {
      return this.logs.filter(log => log.list === 2);
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
          type: log.isTask ? 'Task' : 'Other',
          done: log.done,
          status: log.status,
          highlightedRed: log.highlightedRed,
          highlightedOrange: log.highlightedOrange,
          highlightedGreen: log.highlightedGreen,
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

    addTask() {
      const title = prompt("Enter task title:");
      const type = prompt("Enter task type:");

      if (title && type) {
        const newTask = {
          id: Date.now(),
          content: title,
          list: 1,
          done: false,
          extraInfo: "",
          timestamp: new Date().toLocaleString(),
          highlightedRed: false,
          highlightedOrange: false,
          highlightedGreen: false,
          isTask: false
        };
        
        // Add task to the "Backlog" column
        this.columns[0].tasks.push({
          id: newTask.id,
          title: newTask.content,
          date: newTask.timestamp,
          type: type,
        });

        // Add new task to logs and save to localStorage
        this.logs.push(newTask);
        this.saveData();

        // Save columns data to localStorage
        this.saveColumnsToLocalStorage();
      } else {
        alert("Both title and type are required!");
      }
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

    // Save columns data to localStorage
    saveColumnsToLocalStorage() {
      localStorage.setItem("columns", JSON.stringify(this.columns));
    },

    // Save logs data to localStorage
    saveData() {
      localStorage.setItem("Logs", JSON.stringify(this.logs));
    }
  },
};
</script>


<style src="./KanbanBoard.css"></style>