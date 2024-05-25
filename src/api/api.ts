import { Todo } from "../types";

export class TodoAPI {
    public fetchTodos(): Promise<Todo[]> {
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
    public deleteTodo(id: number): Promise<Todo[]> {
        return fetch("https://jsonplaceholder.typicode.com/todos/"+ id, {
            method: 'DELETE',
          })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Nelze smazat todo list");
                }
                console.log('deleteTodo', response);
                return response.json();
            })
            .catch(error => {
                console.error(error);
                return [];
            });
    }
    public updateTodo(todo: Todo): Promise<Todo[]> {
        return fetch("https://jsonplaceholder.typicode.com/todos/"+ todo.id, {
            method: 'PUT',
            body: JSON.stringify(todo),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
          })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Nelze updatovat todo");
                }
                console.log('updateTodo', response);
                return response.json();
            })
            .catch(error => {
                console.error(error);
                return [];
            });
    }
    public addTodo(todo: Todo): Promise<Todo[]> {
        return fetch("https://jsonplaceholder.typicode.com/todos/", {
            method: 'POST',
            body: JSON.stringify(todo),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
          })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Nelze pridat todo");
                }
                console.log('addTodo', response);
                return response.json();
            })
            .catch(error => {
                console.error(error);
                return [];
            });
    }
}
