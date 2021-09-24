let input = document.querySelector("#todo__text");
let list = document.querySelector("#todo__list");
let form = document.querySelector("#todo__form");
let filter = document.querySelector('#filter');
let todoList = [];
let filter__count = 1;
let active__text = document.querySelector('#active__count');
let active__count = 0;
let clear__completed = document.querySelector('#clear__completed');

//Скрипт Todo
let todoViewer = () =>{
    if (todoList.length > 0){
        filter.style.display = 'flex';
    }
    if (todoList.length == 0){
        filter.style.display = 'none';
    }
    let todo = '';
    todoList.forEach((i)=>{
        if(i.checked == false){
            active__count +=1;
        }
    });
    if(active__count != todoList.length){
        clear__completed.style.opacity = '1';
    }
    else{ clear__completed.style.opacity = '0'; }
    if(filter__count == 2){
        todoList.forEach((i, index)=>{
            if(i.checked == false){
                todo += `<li id='item_${index}' class ='items'>
                <input type="checkbox" class="checkbox" onchange="checkbox(${index})" id='id_${index}' ${i.checked ? 'checked' : ''}>
                <label id='i_${index}' onselectstart="return false" ondblclick="changelement(${index})">${i.todo}</label>
                <button id='todo__remove' onclick="removeTodo(${index})">X</button>
            </li>`;
            }
        });
    }
    else if(filter__count == 3){
        todoList.forEach((i, index)=>{
            if(i.checked == true){
                todo += `<li id='item_${index}' class ='items'>
                <input type="checkbox" class="checkbox" onchange="checkbox(${index})" id='id_${index}' ${i.checked ? 'checked' : ''}>
                <label id='i_${index}' onselectstart="return false" ondblclick="changelement(${index})">${i.todo}</label>
                <button id='todo__remove' onclick="removeTodo(${index})">X</button>
            </li>`;
            }
        });
    }
    else{
        todoList.forEach((i, index)=>{
            todo += `<li id='item_${index}' class ='items'>
                
                <input type="checkbox" class="checkbox" onchange="checkbox(${index})" id='id_${index}' ${i.checked ? 'checked' : ''}>
                <label id='i_${index}' onselectstart="return false" ondblclick="changelement(${index})">${i.todo}</label>
                <button id='todo__remove' onclick="removeTodo(${index})">X</button>
            </li>`;
        });
    }
    active__text.innerHTML = `${active__count} items left`;
    active__count = 0;
    list.innerHTML = todo;
}

if (localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    todoViewer();
}

clear__completed.addEventListener('click', () =>{
    let checkList = () =>{
        todoList.forEach((item)=>{
            if(item.checked){
                deleteItems();
            }
        });
    }
    let deleteItems = () =>{
        todoList.forEach((item, index)=>{
            if (item.checked)
            {
                todoList.splice(index, 1);
                checkList();
            }
        });
    }
    checkList();
    localStorage.setItem('todo', JSON.stringify(todoList));
    todoViewer();
});
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let NewEl = {
        todo: input.value,
        checked: false
    };
    todoList.push(NewEl);
    todoViewer();
    localStorage.setItem('todo', JSON.stringify(todoList));
    input.value = '';
});
let checkbox = (ind) => {
    let check;
    todoList.forEach((item, index)=>{
        if (index == ind){
            item.checked = !item.checked;
            check = item.checked;
            
        }
    })    
    localStorage.setItem('todo', JSON.stringify(todoList));
    todoViewer();
    let label = document.querySelector('#i_'+ ind);
    if(check){
        label.style.color = 'black';
        label.style.textDecoration = 'none';
        setTimeout(()=>{
            label.style.color = 'rgba(128, 128, 128, 0.432)';
            label.style.textDecoration = 'line-through';
        }, 0);
    }
    else{
        label.style.color = 'rgba(128, 128, 128, 0.432)';
        label.style.textDecoration = 'line-through';
        setTimeout(()=>{
            label.style.color = 'black';
            label.style.textDecoration = 'none';
        }, 0);
    }
    
}

let removeTodo = (ind) =>{
    let element = document.querySelector('#item_' + ind);
    todoList.splice(ind, 1);
    todoViewer();
    localStorage.setItem('todo', JSON.stringify(todoList));
}


let changelement = (ind) =>{
    let editinput = document.createElement('input');
    let label = document.querySelector('#i_'+ ind);
    editinput.className = 'edit';
    let text = label.innerHTML;
    editinput.value = text;
    let element = document.querySelector('#item_' + ind);
    element.replaceWith(editinput);
    editinput.focus();
    let changes = () =>{
       todoList.forEach((item, index)=>{
           if (index == ind){
               item.todo = editinput.value;
               label.innerHTML = editinput.value;
               localStorage.setItem('todo', JSON.stringify(todoList));
           }
       })
       editinput.replaceWith(element);
    }

    editinput.addEventListener('focusout', changes);
    editinput.addEventListener('keyup', (e) =>{
        if (e.key == 'Enter') {
            editinput.blur();
            changes();
        }
        if (e.key == 'Escape'){
            editinput.blur();
            editinput.replaceWith(element);
            return;
        }
    });
}


//Скрипт Фильтрации

filter.addEventListener('click', (e)=>{
    if (!e.target.classList.contains('filter__link')) return; 
    e.preventDefault();                              
    for (let link of filter.querySelectorAll('.filter__link')){
        link.classList.remove('active');
    }
    e.target.classList.add('active');
    filter__count = e.target.getAttribute('id');
    todoViewer();
})