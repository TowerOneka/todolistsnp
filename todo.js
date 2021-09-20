let input = document.querySelector("#todo__text");
let list = document.querySelector("#todo__list");
let form = document.querySelector("#todo__form");

let todoList = [];



let todoViewer = () =>{
    let todo = '';
    todoList.forEach((i, index)=>{
        todo += `<li id='item_${index}'>
            <input type='checkbox' onchange="checkbox(${index})" id='id_${index}' ${i.checked ? 'checked' : ''}>
            <label for='id_${index}' onselectstart="return false" ondblclick="changelement(${index})">${i.todo}</label>
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

let checkbox = (index) => {
    let label = list.querySelector('[for=id_'+ index +']');
    let labelValue = label.innerHTML;

    todoList.forEach((item)=>{
        if (item.todo == labelValue){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
}

let removeTodo = (element,label) =>{
    todoList.forEach((item, index)=>{
        if(item.todo == label){
            element.remove();
            todoList.splice(index, 1);
        }
    })
    localStorage.setItem('todo', JSON.stringify(todoList));
}

let changelement = (index) =>{
    let editinput = document.createElement('input');
    let label = document.querySelector('[for=id_'+ index +']');
    editinput.className = 'edit';
    let text = label.innerHTML;
    editinput.value = text;
    let element = document.querySelector('#item_' + index);
    
    element.replaceWith(editinput);
    editinput.focus();
    editinput.addEventListener('focusout', ()=>{
        if(!editinput.value){
             editinput.replaceWith(element);
             return;
        };
        let error = false
        todoList.forEach((item)=>{
            if(editinput.value == item.todo) {
                error = true;
                
            }
        });
        if (error) {
            editinput.replaceWith(element);
            return;
        }

        todoList.forEach((item)=>{
            if (item.todo == text){
                item.todo = editinput.value;
                label.innerHTML = editinput.value;
                localStorage.setItem('todo', JSON.stringify(todoList));
            }
        })
        editinput.replaceWith(element);
    });
    
}