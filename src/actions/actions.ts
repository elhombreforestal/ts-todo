import $ from "jquery";
import { TodoAPI } from "../api/api";
import { List } from "../components/List";
import { Todo } from "../types";

const api = new TodoAPI();

export function renderTodos(selectedItem: number): void {
    const targetElement = $("#todoList");
    if (targetElement) {
        targetElement.text("");
        const todos = JSON.parse(localStorage.getItem('todos') || '[]')
        targetElement.append(List(todos, todos[selectedItem]?.id));
    } else {
        console.error("Element 'todoList' neexistuje.");
    }
}

export function toggleTodo(id: number): void {
    const todo = getTodo(id);
    const todos = getTodos();
    todo.completed = !todo.completed;
    api.updateTodo(todo).then((data) => { 
     //fake update
     todos.splice(getTodoIndexById(id), 1, todo);
     localStorage.setItem('todos', JSON.stringify(todos));
     renderTodos(getSelectedId());
    }); 
}

export function updateTodo(id: number, title: string): void {
    const todo = getTodo(id);
    const todos = getTodos();
    todo.title = title;
    api.updateTodo(todo).then((data) => { 
     //fake update
     todos.splice(getTodoIndexById(id), 1, todo);
     localStorage.setItem('todos', JSON.stringify(todos));
     renderTodos(getSelectedId());
    }); 
}

export function deleteTodo(id: number): void {
   const todos = getTodos();
   api.deleteTodo(id).then((data) => { 
    //fake delete
    todos.splice(getTodoIndexById(id), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('selectedItem', '-1');
    $(".form").addClass("selected");
    renderTodos(-1);
   });
}

export function addTodo(title: string): void {
    const todos = getTodos();
    const todo = {
        title: title,
        completed: false,
        id: todos.length + 1,
    }
    api.addTodo(todo).then((data) => { 
     //fake add
     todos.push(todo);
     localStorage.setItem('todos', JSON.stringify(todos));     
     renderTodos(getSelectedId());
    });
 }

export function editTodo(id: number): void {
    const todo = getTodo(id);
    setSelectedId(getTodoIndexById(id));
    $(".form").removeClass("selected");
    $("li").removeClass("selected");
    $(`#todo_${id}`).addClass("selected");
    if($('#edit').length ) {
        renderTodos(getSelectedId());
    }
    $(`#todo_text_${id}`).html(`<input type="text" id="edit" value="${todo.title}">`);

    $(`#edit`).trigger('focus').on("blur", (e) => {
        renderTodos(getSelectedId());
    });
}

const getTodo = (id: number): Todo => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    return todos.find((todo: Todo) => todo.id === id);
}

export const getTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    return todos;
}

const getTodoIndexById = (id: number) => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    return todos.findIndex((todo: Todo) => todo.id === id);
}

export const getSelectedId = (): number => {
    return parseInt(localStorage.getItem('selectedItem') || '-1');
}

export const setSelectedId = (id: number): void => {
    localStorage.setItem('selectedItem', id.toString());
}
