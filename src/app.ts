import $ from "jquery";
import { Todo } from "./types";
import { TodoItem } from "./components/todo";

function fetchTodos(): Promise<Todo[]> {
    return fetch("https://jsonplaceholder.typicode.com/users/7/todos")
        .then(response => {
            if (!response.ok) {
                throw new Error("Nelze nacist todo list");
            }
            return response.json();
        })
        .catch(error => {
            console.error(error);
            return [];
        });
}

function renderTodos(todos: Todo[]): void {
    const targetElement = $("#todoList");
    if (targetElement) {
        const todoList = $("<ul>");
        todos.forEach(todo => {
            todoList.append(TodoItem(todo, false));
        });
        targetElement.text("");
        targetElement.append(todoList);
    } else {
        console.error("Element with id 'todoList' not found.");
    }
}

function main(): void {
    console.log("Generating app...");
    fetchTodos().then(todos => {
        console.log("Fetched todos:", todos);
        renderTodos(todos);
    });
}

main();