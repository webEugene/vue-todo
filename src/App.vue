<template>
  <div id="app">
    <h1>{{ appTitle }}</h1>
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/Todo/TodoList';

export default {
  name: 'App',
  components: {
    TodoList,
  },
  data: () => ({
    appTitle: 'Vue Todo List',
  }),
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
