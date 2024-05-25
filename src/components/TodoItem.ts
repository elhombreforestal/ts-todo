import $ from "jquery";
import { Todo } from "../types";
import { UnfinishedIcon, FinishedIcon, DeleteIcon } from "../icons/Icons";
import { deleteTodo, toggleTodo, editTodo } from "../actions/actions";

export const TodoItem = (item: Todo, isSelected: boolean): JQuery<HTMLElement> => {
    const deleteIcon = DeleteIcon().on("click", () => deleteTodo(item.id));
    const todoIcon = item.completed ? FinishedIcon() : UnfinishedIcon();
    const todoText = $(`<span id="todo_text_${item.id}">`).text(item.title).on("click", () => editTodo(item.id));
    todoIcon.on("click", () => toggleTodo(item.id));
    const todoItem = $(`<li id="todo_${item.id}">`)
        .append(todoIcon)
        .append(todoText)
        .append(deleteIcon);
    if (!item.completed) {
       todoItem.addClass("todo");
    }
    if (isSelected) {
        todoItem.addClass("selected");
    }

    return todoItem;
}
