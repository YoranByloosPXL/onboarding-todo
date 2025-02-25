import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const todosRoutes = [
  {
    path: '/todo',
    children: [
      {
        name: 'todo-list',
        path: '',
        component: (): Component => import('@/modules/todos/features/overview/views/TodoOverviewView.vue'),
      },
    ],
  },

] as const satisfies RouteRecordRaw[]
