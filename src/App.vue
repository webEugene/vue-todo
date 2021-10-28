<template>
  <v-app>
    <v-container>
      <h1 class="d-flex justify-center">{{ appTitle }}</h1>
      <AddTask />
      <TodoList />
    </v-container>
  </v-app>
</template>

<script>
import AddTask from '@/components/Form/AddTask';
import TodoList from '@/components/Todo/TodoList';

export default {
  name: 'App',

  components: {
    AddTask,
    TodoList,
  },

  data: () => ({
    appTitle: 'Vue Todo List',
  }),
};
</script>
