let input = document.querySelector("#todo__text");
let list = document.querySelector("#todo__list");
let form = document.querySelector("#todo__form");

let todoList = [];



let todoViewer = () =>{
    let todo = '';
    todoList.forEach((i, index)=>{
        todo += `<li id='item_${index}'>
            <input type='checkbox' id='id_${index}' ${i.checked ? 'checked' : ''}>
            <label for='id_${index}'>${i.todo}</label>
            <button id='todo__remove' onclick="removeTodo(item_${index},${i.todo})">X</button>
        </li>`;
        list.innerHTML = todo;
    });
 
}



if (localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    todoViewer();
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let error = false
    if(!input.value) return;
    todoList.forEach((item)=>{
        if(input.value == item.todo) {
            error = true;
        }
    });
    if(error) { 
        input.value = '';
        error = false;
        return
    };
    let NewEl = {
        todo: input.value,
        checked: false
    };

    todoList.push(NewEl);
    todoViewer();
    localStorage.setItem('todo', JSON.stringify(todoList));
    input.value = '';
});

list.addEventListener('change', (e) => {
    let idTodo = e.target.getAttribute('id');
    let label = list.querySelector('[for='+ idTodo +']');
    let labelValue = label.innerHTML;

    todoList.forEach((item)=>{
        if (item.todo == labelValue){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
})

let removeTodo = (element,label) =>{
    todoList.forEach((item, index)=>{
        if(item.todo == label){
            element.remove();
            todoList.splice(index, 1);
        }
    })
    localStorage.setItem('todo', JSON.stringify(todoList));
}