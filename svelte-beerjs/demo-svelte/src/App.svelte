<script>
  import { uuid } from "./utils";
  import { onMount } from 'svelte';

  const FILTER_TITLES = ["All", "Active", "Completed"];

  let todos = []
  let newTodo = ''
  let filter = 'All'

  $: numActive = todos.filter(todo => todo.completed === false).length;
  $: filteredTodos =
    filter === "All"
      ? todos
      : filter === "Active"
      ? todos.filter(todo => todo.completed === false)
      : todos.filter(todo => todo.completed !== false);

  function addTodo(event) {
    event.preventDefault();

    todos = [
      ...todos,
      {
        id: uuid(),
        completed: false,
        text: newTodo
      }
    ]

    newTodo = ''
  }

  function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
  }

  function toggleTodo(id) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }

  function clearCompleted() {
    todos = todos.filter(todo => todo.completed === false)
  }
</script>

<header class="header">
  <h1>Sveltodo</h1>
  <form on:submit={addTodo}>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      bind:value={newTodo}
    />
  </form>
  </header>

<section class="main">
  <ul class="todo-list">
    {#each filteredTodos as todo}
      <li class={todo.completed ? "completed" : ""}>
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            bind:checked={todo.completed}
          />
          <label>{todo.text}</label>
          <button
            class="destroy"
            on:click={() => deleteTodo(todo.id)}
          />
        </div>
      </li>
    {/each}
  </ul>
  </section>

  <footer class="footer">
  <span class="todo-count">
    <strong>{`${numActive} item(s) left`}</strong>
  </span>
  <ul class="filters">
    {#each FILTER_TITLES as filterName}
      <li>
        <a
          href="#a"
          class={filter === filterName ? "selected" : ""}
          style="cursor: pointer"
          on:click={() => filter = filterName}
        >
          {filterName}
        </a>
      </li>
    {/each}
  </ul>
  <button class="clear-completed" on:click={clearCompleted}>
    Clear completed
  </button>
  </footer>
