<!-- <script lang="ts" setup>
import type { TodoIndex } from '@/models/todo/index/todoIndex.model'

const props = defineProps<{
  isLoading: boolean
  todoList: TodoIndex[] | null
}>()
</script>

<template>
  <div>
    <div v-if="isLoading">
      <p></p>
    </div>

    <div v-else-if="!todoList || todoList.length === 0">
    </div>

    <table v-else>
      <tbody>
        <tr
          v-for="todo in todoList"
          :key="todo.id"
        >
          <td>{{ todo.id }}</td>
          <td>{{ todo.title }}</td>
          <td>{{ todo.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template> -->
