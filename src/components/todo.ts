import $ from "jquery";
import { Todo } from "../types";

export const TodoItem = (item: Todo, isSelected: boolean): JQuery<HTMLElement> => {
    const todoItem = $("<li>").text(item.title);
    if (!item.completed) {
       todoItem.addClass("todo");
    }
    if (isSelected) {
        todoItem.addClass("selected");
    }
    return todoItem;
}