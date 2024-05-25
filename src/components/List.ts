import $ from "jquery";
import { Todo } from "../types";
import { TodoItem } from "./TodoItem";

export const List = (items: Todo[], selectedItem: number): JQuery<HTMLElement> => {
    const list = $("<ul>");
    items.forEach(item => {
        list.append(TodoItem(item, selectedItem === item.id));
    });
    
    return list;
}