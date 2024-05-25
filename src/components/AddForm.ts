import $ from "jquery";
import { AddIcon } from "../icons/Icons";
import { renderTodos, setSelectedId, addTodo } from "../actions/actions";

export const AddForm = (selectedItem: number): JQuery<HTMLElement> => {
    const button = $('<button id="add">').append(AddIcon()).on("click", (e) => {
        const title = $("#input").val();
        if (title) {
            $("#input").val("")
            addTodo(title.toString());
        }
    });
    const form = $('<div class="form">')
        .append('<input type="text" id="input" placeholder="Novy ukol">').on("click", (e) => {
            setSelectedId(-1);
            $(".form").addClass("selected");
            $("li").removeClass("selected");
        })
        .append(button);
    if (selectedItem === -1) {
        form.addClass('selected');
    }    
    return form;
}
