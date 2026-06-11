const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async function (e) {
        if (!confirm("Delete this todo?")) {
            return;
        }
        e.preventDefault();
        const todo_id = this.dataset.todoId;
        const taggle_soft_delete_url = this.dataset.taggleSoftDeleteUrl;
        const response = await fetch(taggle_soft_delete_url, {method:"POST", headers:{"X-CSRFToken":csrftoken}, body:new URLSearchParams({todo_id:todo_id})});
        const data = await response.json();
        if(data.status == "ok"){this.closest(".task-item").remove();};
    })
});