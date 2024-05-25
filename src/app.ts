import $, { get } from "jquery";
import { Todo } from "./types";
import { TodoAPI } from "./api/api";
import { AddForm } from "./components/AddForm";
import { renderTodos, setSelectedId, getSelectedId, getTodos, addTodo, toggleTodo, updateTodo, editTodo, deleteTodo } from "./actions/actions";

const api = new TodoAPI();
setSelectedId(-1);

function main(): void {
    $("#addForm").append(AddForm(getSelectedId()));
    api.fetchTodos().then(data => {
        localStorage.setItem('todos', JSON.stringify(data));
        renderTodos(getSelectedId());
    });
    $(document).on("keyup", (e) => {
        const todos = getTodos();
        const selectedId = getSelectedId();
        switch (e.code) {
            case "ArrowUp":
                setSelectedId(selectedId > -1 ? selectedId - 1 : todos.length - 1);
                renderTodos(getSelectedId());
                break;
            case "ArrowDown":
                setSelectedId(selectedId < todos.length - 1 ? selectedId + 1 : -1);
                renderTodos(getSelectedId());
                break;
            case "Enter":
                if(selectedId === -1) {
                    const title = $("#input").val();
                    console.log('title', title);
                    if (title) {
                        $("#input").val("")
                        addTodo(title.toString());
                    }
                } else {
                    if($("#edit").length && $("#edit").val() !== "") {
                        updateTodo(todos[selectedId].id, $("#edit").val()?.toString() || "");
                    } else {
                        editTodo(todos[selectedId].id);
                    }
                }
                break;
            case "Space":
                if(selectedId !== -1 && !$("#edit").length) {
                    toggleTodo(todos[selectedId].id);
                }
                break;
            case "Escape":
                renderTodos(getSelectedId());
                break;
            case "Delete":
            case "Backspace":
                if(selectedId !== -1) {
                    deleteTodo(todos[selectedId].id);
                }
                break;
            default:
                if(selectedId === -1) {
                  $("#input").trigger("focus");
                } else {
                  $("#input").trigger("blur");
                  //e.preventDefault();
                }
        }
        if(getSelectedId() === -1) {
            $(".form").addClass("selected");
        } else {
            $(".form").removeClass("selected");
        }
    });
}

main();