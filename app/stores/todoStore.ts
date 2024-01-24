import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Item } from "../types/itemType";

type TodoStore = {
    todos: Item[]
    addTodo: (id: number, todo: string) => void
    removeTodo: (id: number) => void
    updateTodoStatus: (id: number) => void
}

export const useTodoStore = create(persist<TodoStore>((set) => ({
    todos: [],
    addTodo: (id: number, item: string) => {
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id,
                    item,
                    status: false
                } as Item
            ]
        }))
    },
    removeTodo: (id: number) => {
        set(state => ({todos: state.todos.filter(todo => todo.id !== id)}))
    },
    updateTodoStatus: (id: number) => {
        set((state) => ({
            todos: state.todos.map((todo) => todo.id === id ? ({...todo, status: true} as Item) : todo)
        }))
    }
}), {
    name: 'todo',
    storage: createJSONStorage(() => localStorage)
}
))