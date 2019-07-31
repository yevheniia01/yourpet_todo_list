$(document).ready(function(){

$('#todoBtn').on('click', function(){

let inputValue = $('#todoInput').val()
console.log('todoInput Value', inputValue)
$.ajax({
    type: "POST",
    url: "/todo",
    data:{
        todo: inputValue,
    },
    succes: function(data){
        console.log("DATA", data)
    }
    
   
})
displayTodos()
})
function displayTodos(){
    $('#todoList').empty()
    $.ajax({
        type: 'GET',
        url: '/todo',
    })
    .then(function(resp){
        for (i = 0; i < resp.length; i++) { 
            console.log("Response",resp[i]);
            $('#todoList').append("<li id="+resp[i]._id+">"+resp[i].todo+"<button id="+resp[i]._id+" class='deleteBtn'>x</button>"+"</li>")
        }
    })
}
displayTodos()



$('#todoList').on('click', "button", function(){
 console.log("Im Working");
 let todoToDelete = $(this).attr('id')
 console.log("to delete id", todoToDelete);

 $.ajax({
     type: "GET",
     url: '/delete/' + todoToDelete,
     succes:function(resp){
         console.log("Removed")
     }
 })
 displayTodos()
})

})