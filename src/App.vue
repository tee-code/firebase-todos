<script setup>
import { onMounted, ref } from 'vue';
// import { v4 as uuidv4 } from 'uuid';
import {addTodo as add, deleteTodo as remove, updateTodo, readTodosInRealTime} from './firebase/controllers';
import { collection, addDoc, onSnapshot, query, orderBy  } from "firebase/firestore";
import { db } from './firebase/index';

const todos = ref([]);

const todoContent = ref('');

const collectionRef = collection(db, 'todos');
const collectionRefQuery = query(collectionRef, orderBy('date','desc'));

onMounted(() => {
  
  const unsubscribe = onSnapshot(collectionRefQuery, (querySnapshot) => {

    const fbtodos = [];

    querySnapshot.forEach(doc => {

      const id = {
        id: doc.id
      };
      fbtodos.push({...doc.data(), ...id});
    });

    todos.value = fbtodos;
    // console.log(fbtodos, todos.value)

  });
  
});

const addTodo = () => {
  const newTodo = {
    content: todoContent.value,
    completed: false,
    date: Date.now()
  }

  add(newTodo);

  todoContent.value = "";

};

const deleteTodo = (id) => {
  
  // todos.value = todos.value.filter(todo => todo.id !== id);
  remove(id);
}

const toggleCompleted = (id) => {
  const index = todos.value.findIndex(todo => todo.id === id);
  // todos.value[index].completed = ! todos.value[index].completed;

  updateTodo(id, {
    completed: ! todos.value[index].completed
  });
  
}

</script>

<template>
  <div class="todos">
    <form @submit.prevent="addTodo">
      <div class="title has-text-centered">Firebase Todos</div>
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input v-model="todoContent" class="input" type="text" placeholder="Add a todo...">
        </p>
        <p class="control">
          <button class="button is-info" :disabled="!todoContent" >
            Add
          </button>
        </p>
      </div>
    </form>
    <div v-for="todo in todos" :key="todo.id" class="card mb-3">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column has-text-left" :class="{'has-text-success line-through' : todo.completed}">
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button @click="toggleCompleted(todo.id)" class="button mr-2" :class="todo.completed ? 'is-success' : 'is-light'">&check;</button>
              <button @click="deleteTodo(todo.id)" class="button is-danger">&cross;</button>
            </div>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('bulma/css/bulma.min.css');

.todos{
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
}
.line-through{
  text-decoration: line-through;
}
</style>
