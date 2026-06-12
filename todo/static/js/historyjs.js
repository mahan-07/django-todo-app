document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async function (e) {
        
        e.preventDefault();
        
        if (!confirm("Delete this todo?(complitely)")) {
            return;
        }
        
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const todo_id = this.dataset.todoId;
        const taggle_delete_url = this.dataset.taggleDeleteUrl;
        const response = await fetch(taggle_delete_url, {method:"POST", headers:{"X-CSRFToken":csrftoken}, body:new URLSearchParams({todo_id:todo_id})});
        const data = await response.json();
        if(data.status === "ok"){this.closest(".task-item").remove();};
    })
});

document.getElementById("clearForm").addEventListener("submit", function (e) {
    const ok = confirm("Are you sure you sure about it?");
    if (!ok) {
        e.preventDefault(); 
    }
});