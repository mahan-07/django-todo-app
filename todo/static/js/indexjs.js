function createTodo(todo) {
    return `
        <div class="task-item">
            <input type="checkbox" class="checkbox">

            <span title="${todo.description || ''}">
                ${todo.title}
            </span>

            <div class="actions">
                <a href="/edit/${todo.id}/" class="edit-btn">
                    <img width="27" height="35"
                         src="/static/img/edit.svg"
                         alt="✏️">
                </a>

                <a href="#"
                   data-todo-id="${todo.id}"
                   data-taggle-soft-delete-url="/taggle_soft_delete"
                   class="soft-delete-btn">
                    <img width="35"
                         src="/static/img/delete.svg"
                         alt="❌">
                </a>
            </div>
        </div>
    `;
}


document.addEventListener('click', async function (e) {
    const btn = e.target.closest('.add-btn');
    if (!btn) return;

    e.preventDefault();
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const title = document.querySelector('.todoinput').value;
    
    const taggle_todo_add_url = btn.dataset.taggleTodoAddUrl;
    const response = await fetch(taggle_todo_add_url, {method:"POST", headers:{"X-CSRFToken":csrftoken}, body:new URLSearchParams({title:title})});
    const data = await response.json();
    
    if(data.status === "ok"){
        const container = document.querySelector('.task-list');
        container.insertAdjacentHTML("afterbegin",createTodo(data));
        document.querySelector('.todoinput').value = '';
    };
})

document.addEventListener('click', async function (e) {
    const btn = e.target.closest('.soft-delete-btn');
    if (!btn) return;

    e.preventDefault();

    if (!confirm("Delete this todo?")) {
        return;
    };
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const todo_id = btn.dataset.todoId;
    const taggle_soft_delete_url = btn.dataset.taggleSoftDeleteUrl;
    const response = await fetch(taggle_soft_delete_url, {method:"POST", headers:{"X-CSRFToken":csrftoken}, body:new URLSearchParams({todo_id:todo_id})});
    const data = await response.json();
    if(data.status === "ok"){btn.closest(".task-item").remove();};
});


document.addEventListener('change', function (e) {
    const checkbox = e.target.closest('.checkbox');

    if (!checkbox) return;

    const title = checkbox.nextElementSibling;

    if (checkbox.checked) {
        title.style.textDecoration = 'line-through';
    } else {
        title.style.textDecoration = 'none';
    }
});