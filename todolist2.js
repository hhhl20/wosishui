

/* 声明两个作用域在块级中的变量，初始均为空*/
let todoItems = [];/* 正在进行的任务 */

let finishedItems = [];/* 已经完成的任务 */

/* 声明函数，函数括号里有两个形参，在调用这个函数事时，用来传递相应的参数 */
function renderTodoItemList(todoItems, finishedItems) {
    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";

    for (let i=0; i < todoItems.length; i++ ) {
        let item = todoItems[i];
        /* 在itemDiv中创建一个div */
        let itemDiv = document.createElement("div");
        /* 改变标签元素的css类选择器，从list-pane变为todo-item */
        itemDiv.className = "todo-item";

        let inputEl = document.createElement("input");
        /* checkbox 复选框 */
        inputEl.type = "checkbox";

        
        /* 安装一个监听器，当change事件发生时会执行以下代码，将item放入finishedItem中 */
        inputEl.addEventListener("change", (e) => {
            finishedItems.push(item);
            /* 删除todoItem中的下标为i的一个item */
            todoItems.splice(i, 1);

            /* 输出结果 */
            console.log("finshed:", i, todoItems, finishedItems );
            /* 渲染函数 */
            renderTodoItemList(todoItems, finishedItems);

        });
         /* 创建一个新的div标签 */
        let titleEl = document.createElement("div");
        /* 获取class属性 */
        titleEl.className = "title";
        
        /* 创建一个div标签，用来装！（表示重要） */
        let importanceEl = document.createElement("div");
        /* 用important-falg 的样式 */
        importanceEl.className = "important-flag"
        /* 改变标签中文本样式为！ */
        importanceEl.innerText = "！";

        /* 判断是不是重要的内容，如果重要则添加class名open */
        if (item.isImportance) {
            importanceEl.classList.add("open");
        }

        /* 安装一个监听器，如果点击！则触发下面的函数 */
        importanceEl.addEventListener("click", (e) => {
            console.log("click: ", item);
            if (item.isImportance) {
                item.isImportance = false;
            } else {
                item.isImportance = true;
            }

            /* 渲染函数 */
            renderTodoItemList(todoItems, finishedItems);
        });

        /* 删除键 */
        /* 创建一个button标签，改变标签中文本样式为X */
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.className = "del-btn";

        /* 当点击X按钮时则执行下列函数 */
        deleteBtn.addEventListener("click",(e) => {
            setTimeout(() =>{
                todoItems.splice(i,1);
                renderTodoItemList(todoItems, finishedItems)
            },500)
        });


        /* 将class名为title的全部添加到titleEl */
        titleEl.innerText = item.title;

        /* 向itemDiv中添加下列所有代表各个部分的元素 */
        itemDiv.append(inputEl);
        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        itemDiv.append(deleteBtn);
        /* 将itemDiv添加到paneEl中 */
        paneEl.append(itemDiv);
    }

}

function renderFinishedItemList(todoItems, finishedItems) {

    /* 获取list-pane中的dom元素 */
    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";

    /* 创建一个div标签并获取一个class为todo-item属性，后面与上面的相同 */
    for (let i=0; i < finishedItems.length; i++ ) {
        let item = finishedItems[i];
        let itemDiv = document.createElement("div");
        itemDiv.className = "todo-item";


        let titleEl = document.createElement("div");
        titleEl.className = "title";

        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";
        if (item.isImportance) {
            importanceEl.classList.add("open");
        }
        

        titleEl.innerText = item.title;

        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        
        paneEl.append(itemDiv);
    }

}


function renderInputPane(todoItems) {
    let inputPaneEl = document.querySelector("#todolist > .input-pane");

    /* 获取add-btn his-btn 中的dom元素 */
    let addBtnEl = inputPaneEl.querySelector("#add-btn");
    let hisBtnEl = inputPaneEl.querySelector("#his-btn");

    /* 安装监听器，如果点击add-btn则执行下面函数操作 */
    addBtnEl.addEventListener("click", (e)=>{
        /* 获取input的内容 */
        let inputEl = inputPaneEl.querySelector("input");
        /* 如果输入的内容为空，则弹出弹窗，反之输入 */
        if(inputEl.value === ""){
            alert("请输入待办事项内容")
        }else{
            /* 将里面的内容，是否完成的情况和是否重要全部都放在todoItem中 */ 
            todoItems.push({
                title: inputEl.value,
                isFinished: false,
                isImportance: false,
            })
            /* 点击添加按钮后将输入框的内容清除 */
            inputEl.value = "";
        }
        
        /* 输出结果 */
        console.log("add a item: ", inputEl.value);
        renderTodoItemList(todoItems, finishedItems);
    });

    /*安装监听器，如果点击his-btn则执行下面函数操作  */
    hisBtnEl.addEventListener("click", (e)=>{
        /* 判断his-btn的类名中是否包含open 如果有则删除，反之添加 */
        /* 这里就只是变颜色而已，来到finished就有open，还在todolist就没有open */
        if (hisBtnEl.classList.contains("open")) {
            hisBtnEl.classList.remove("open");
            renderTodoItemList(todoItems, finishedItems)
        } else {
            hisBtnEl.classList.add("open");
            renderFinishedItemList(todoItems, finishedItems)
        }
    });

    // let btnEl = document.querySelector("#todolist #add-btn");
}

/* 执行程序 */
renderInputPane(todoItems, finishedItems);
renderTodoItemList(todoItems, finishedItems);