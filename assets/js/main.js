const inputTarea = document.querySelector(".input-tarea");
const lista = document.querySelector(".lista");
const btnAdd = document.querySelector(".btn-add");

btnAdd.addEventListener("click", () => {
    
    const tareaAdd = inputTarea.value.trim();
    const li = document.createElement("li");

    if(tareaAdd !== ""){
        li.textContent = tareaAdd;
    }
    
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "❌";
    btnDelete.classList.add("btn-delete");
    
    btnDelete.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(btnDelete);

    lista.appendChild(li);

    inputTarea.value = "";
});