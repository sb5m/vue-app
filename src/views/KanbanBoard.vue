<template>
  <div id="app">
    <!-- Main panel for listing tasks with delete buttons -->
    <div class="main-panel">
      <h2>All Tasks</h2>
      <ul>
        <li v-for="task in allTasks" :key="task.id">
          <span>{{ task.title }} ({{ task.type }})</span>
          <button @click="deleteTask(task)" class="delete-btn">Delete</button>
        </li>
      </ul>
    </div>
    <div class="kanban-container">
      <div class="kanban-board">
        <div
          v-for="column in columns"
          :key="column.title"
          class="kanban-column"
        >
          <p class="column-title">{{ column.title }}</p>
          
          <!-- Draggable tasks within each column -->
          <draggable
            v-model="column.tasks"
            :animation="200"
            ghost-class="ghost-card"
            group="tasks"
            item-key="id"
          >
            <template #item="{ element: task }">
              <task-card
                :task="task"
                class="task-card"
              ></task-card>
            </template>
          </draggable>
          
          <!-- Add Task button only for Backlog column -->
          <button 
            v-if="column.title === 'Backlog'" 
            @click="addTask(column)" 
            class="add-task-btn"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TaskCard from "../components/TaskCard.vue";

export default {
  name: "App",
  components: {
    TaskCard,
    draggable,
  },
  data() {
    return {
      columns: this.loadColumnsFromLocalStorage(), // Load columns from localStorage
    };
  },
  created() {
    const storedLogs = localStorage.getItem('Logs');
    if (storedLogs) {
      this.logs = JSON.parse(storedLogs);
      this.mapLogsToColumns(); // Map logs to columns
    }
  },
  computed: {
    // Get all tasks across all columns for the main panel
    allTasks() {
      return this.columns.flatMap(column => column.tasks);
    },
  },
  methods: {
    // Load columns from localStorage if available, otherwise set default
    loadColumnsFromLocalStorage() {
      const savedColumns = localStorage.getItem("columns");
      if (savedColumns) {
        return JSON.parse(savedColumns);
      } else {
        return [
          { title: "Backlog", tasks: [] },
          { title: "In Progress", tasks: [] },
          { title: "Review", tasks: [] },
          { title: "Done", tasks: [] }
        ];
      }
    },
    
    // Map logs to the correct Kanban columns based on their 'list' property
    mapLogsToColumns() {
      this.columns.forEach(column => {
        column.tasks = []; // Clear the column tasks
      });

      this.logs.forEach(log => {
        const task = {
          id: log.id,
          title: log.content, // Assuming 'content' contains the task title
          date: log.timestamp,
          type: log.isTask ? 'Task' : 'Other', // You can customize this based on your needs
          done: log.done,
          highlightedRed: log.highlightedRed,
          highlightedOrange: log.highlightedOrange,
          highlightedGreen: log.highlightedGreen,
        };

        if (log.list === 1) {
          this.columns[0].tasks.push(task); // Backlog
        } else if (log.list === 2) {
          this.columns[1].tasks.push(task); // In Progress
        } else if (log.list === 3) {
          this.columns[2].tasks.push(task); // Review
        } else if (log.list === 4) {
          this.columns[3].tasks.push(task); // Done
        }
      });
    },

    // Add a new task to the column
    addTask(column) {
      const title = prompt("Enter task title:");
      const type = prompt("Enter task type:");

      if (title && type) {
        const newTask = {
          id: Date.now(),
          title: title,
          date: new Date().toLocaleDateString(),
          type: type,
        };
        column.tasks.push(newTask);
        this.saveColumnsToLocalStorage(); // Save changes to localStorage
      } else {
        alert("Both title and type are required!");
      }
    },

    // Delete task
    deleteTask(taskToDelete) {
      for (let column of this.columns) {
        const taskIndex = column.tasks.findIndex(task => task.id === taskToDelete.id);
        if (taskIndex !== -1) {
          column.tasks.splice(taskIndex, 1); // Remove task from column
          break; // Exit loop after removing task
        }
      }
      this.saveColumnsToLocalStorage(); // Save changes to localStorage
    },

    // Save columns data to localStorage
    saveColumnsToLocalStorage() {
      localStorage.setItem("columns", JSON.stringify(this.columns));
    }
  },
};
</script>

<style scoped>
/* Container for the entire Kanban board and task list */
#app {
  display: flex;
  justify-content: flex-start;
  gap: 40px;
  padding: 20px;
  min-height: 100vh;
}

/* Container for the Kanban board */
.kanban-container {
  flex: 1; /* Takes up remaining space */
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

/* Kanban board with multiple columns */
.kanban-board {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

/* Each column in the Kanban board */
.kanban-column {
  background-color: #e3e6e8;
  border-radius: 6px;
  padding: 16px;
  min-width: 250px;
  max-width: 250px;
}

/* Title of each column */
.column-title {
  font-weight: bold;
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
}

/* Style for individual task cards */
.task-card {
  margin-top: 8px;
}

/* Ghost card that shows up during drag */
.ghost-card {
  opacity: 0.5;
  background-color: #d1d8df;
  border: 1px dashed #333;
}

/* Style for the Add Task button */
.add-task-btn {
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-task-btn:hover {
  background-color: #45a049;
}

/* Main panel for listing tasks */
.main-panel {
  width: 300px; /* Fixed width for the main panel */
  margin-top: 40px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-panel h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.main-panel ul {
  list-style-type: none;
  padding-left: 0;
}

.main-panel li {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.delete-btn {
  padding: 4px 8px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #e53935;
}
</style>
