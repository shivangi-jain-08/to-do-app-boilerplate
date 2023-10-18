//input tag
var inputText = document.getElementById("input");

//add button tag
var subBtn = document.getElementById("button");

//To do list
var toDoListTag = document.getElementById("todolist");

//an array to store all the todo elements, initially empty
// var todoArray = [];

var todoArray = JSON.parse(localStorage.getItem("todoArr")) || []
display()

// When Add button is clicked 
subBtn.addEventListener("click", addItemToArray);

//if input is in focus and Enter is pressed addItemToArray should be called to add element to array
inputText.addEventListener("keypress", (event)=>{
    if(event.key=="Enter"){
        addItemToArray();
    }
})

function addItemToArray(){
    //push value to array if it is not an empty string
    if(inputText.value!=""){
        todoArray.push(inputText.value);
    }
    localStorage.setItem("todoArr", JSON.stringify(todoArray));
    //reset the value to empty string ""
    inputText.value = "";
    
    display();
}

//to
function display(){
    //Clear out old tasks, every time we add one item to the array
    toDoListTag.innerHTML = "";

    //Map through array and display
    todoArray.map((curr,i)=>{
        //Structure of li tag
        var listItem = `  <li id="item${i}">
        <div>${curr}</div>
        <div>
            <span onclick="deleteItem(${i})">&times;</span>
            <span>|</span>
            <span onclick="editItem(${i})">Edit</span>
        </div>
        </li>`;

        //insert li inside ul tag
        toDoListTag.innerHTML += listItem;
    })
    localStorage.setItem("todoArr", JSON.stringify(todoArray));


}

function deleteItem(index){
    //delete the element[index] from todoArray
    todoArray.splice(index, 1);
    localStorage.setItem("todoArr", JSON.stringify(todoArray));
    display();

}

function editItem(index){
    //get new Value from the user
    var newValue = prompt("Pls Edit")
    // insert the value to the array at that index
    todoArray.splice(index, 1, newValue);
    localStorage.setItem("todoArr", JSON.stringify(todoArray));

    display();
    
}

//reset the todo list
document.getElementById("reset").addEventListener("click", ()=>{
    todoArray = [];
    localStorage.setItem("todoArr", JSON.stringify(todoArray));
    display();
})




