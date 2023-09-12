<template>
  <div class="app">
    <h1 class="app-title">vue app</h1>
    <div class="separator"></div>
    <div class="logs-container">
      <div class="log-list">
        <form @submit.prevent="addTodo" class="todo-form">
          <label class="form-label">New Log</label>
          <input v-model="newTodo" class="form-input" name="newTodo" autocomplete="off" />
          <button class="form-button">Add Log</button>
        </form>
        <h2 class="list-title">Log List</h2>
        <ul class="todo-list">
          <li v-for="(todo, index) in todos" :key="index" class="todo-item">
            <span :class="{ done: todo.done }" @click="doneTodo(todo)">{{ todo.content }}</span>
            <button @click="removeTodo(index)" class="remove-button">Remove</button>
          </li>
        </ul>
        <h4 v-if="todos.length === 0" class="empty-list">Empty list.</h4>
      </div>
      <div class="log-list">
        <form @submit.prevent="addSecondTodo" class="todo-form">
          <label class="form-label">New Log</label>
          <input v-model="newTodo" class="form-input" name="newTodo" autocomplete="off" />
          <button class="form-button">Add Log</button>
        </form>
        <h2 class="list-title">Log List</h2>
        <ul class="todo-list">
          <li v-for="(todo, index) in secondList" :key="'second-' + index" class="todo-item">
            <span :class="{ done: todo.done }" @click="doneSecondTodo(todo)">{{ todo.content }}</span>
            <button @click="removeSecondTodo(index)" class="remove-button">Remove</button>
          </li>
        </ul>
        <h4 v-if="secondList.length === 0" class="empty-list">Empty list.</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'App',

  setup() {
    const newTodo = ref('');
    const defaultData = [
      {
        done: false,
        content: 'This is a logger test',
      },
    ];
    const todos = ref([]);
    const storageKey = 'todos';

    const secondList = ref([]);
    const secondStorageKey = 'secondTodos';

    // Load todos from localStorage on component mount
    onMounted(() => {
      const storedTodos = JSON.parse(localStorage.getItem(storageKey)) || defaultData;
      const storedSecondTodos = JSON.parse(localStorage.getItem(secondStorageKey)) || [];
      todos.value = storedTodos;
      secondList.value = storedSecondTodos;
    });

    function addTodo() {
      if (newTodo.value) {
        todos.value.push({
          done: false,
          content: newTodo.value,
        });
        newTodo.value = '';
        saveData();
      }
    }

    function doneTodo(todo) {
      todo.done = !todo.done;
      saveData();
    }

    function removeTodo(index) {
      todos.value.splice(index, 1);
      saveData();
    }

    function saveData() {
      const storageData = JSON.stringify(todos.value);
      localStorage.setItem(storageKey, storageData);
    }

    // Functions for the second list
    function addSecondTodo() {
      if (newTodo.value) {
        secondList.value.push({
          done: false,
          content: newTodo.value,
        });
        newTodo.value = '';
        saveSecondData();
      }
    }

    function doneSecondTodo(todo) {
      todo.done = !todo.done;
      saveSecondData();
    }

    function removeSecondTodo(index) {
      secondList.value.splice(index, 1);
      saveSecondData();
    }

    function saveSecondData() {
      const storageData = JSON.stringify(secondList.value);
      localStorage.setItem(secondStorageKey, storageData);
    }

    return {
      newTodo,
      todos,
      addTodo,
      doneTodo,
      removeTodo,
      secondList,
      addSecondTodo,
      doneSecondTodo,
      removeSecondTodo,
    };
  },
};
</script>

<style lang="scss">
$border: 2px solid
  rgba(
    $color: white,
    $alpha: 0.35,
  );
$size1: 6px;
$size2: 12px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: #17181a;
$textColor: white;
$primaryColor: #89babf;
$secondTextColor: #1f2023;

body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $backgroundColor;
  color: $textColor;
  #app {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    .app-title {
      font-weight: bold;
      font-size: 28px;
      text-align: center;
    }
    .separator {
      border-bottom: 1px solid $primaryColor; /* Add a border as a separator */
      margin: 20px 0 30px; /* Adjust margin to create space */
    }
    .logs-container {
      display: flex;
      justify-content: space-between;
      .log-list {
        width: 48%;
        .todo-form {
          display: flex;
          flex-direction: column;
          width: 100%;
          .form-label {
            font-size: 14px;
            font-weight: bold;
          }
          .form-input,
          .form-button {
            height: $size5;
            box-shadow: none;
            outline: none;
            padding-left: $size2;
            padding-right: $size2;
            border-radius: $size1;
            font-size: 18px;
            margin-top: $size1;
            margin-bottom: $size2;
          }
          .form-input {
            background-color: transparent;
            border: $border;
            color: inherit;
          }
          .form-button {
            cursor: pointer;
            background-color: $primaryColor;
            border: 1px solid $primaryColor;
            color: $secondTextColor;
            font-weight: bold;
            outline: none;
            border-radius: $size1;
          }
        }
        .list-title {
          font-size: 22px;
          border-bottom: $border;
          padding-bottom: $size1;
        }
        .todo-list {
          padding: 10px;
          .todo-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: $border;
            padding: $size2 $size4;
            border-radius: $size1;
            margin-bottom: $size2;
            span {
              cursor: pointer;
            }
            .done {
              text-decoration: line-through;
            }
            button {
              font-size: $size2;
              padding: $size1;
            }
          }
        }
        .empty-list {
          text-align: center;
          opacity: 0.5;
          margin: 0;
        }
      }
    }
  }
}

</style>
