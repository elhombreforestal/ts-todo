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
    }
