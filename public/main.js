$(document).ready(function(){

$('#todoBtn').on('click', function(){

let inputValue = $('#todoInput').val()

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
            $('#todoList').append("<li id="+resp[i]._id+">"+resp[i].todo+"<button id="+resp[i]._id+" class='deleteBtn'>x</button>"+"</li>")
        }
    })
}
displayTodos()



$('#todoList').on('click', "button", function(){

 let todoToDelete = $(this).attr('id')
 

 $.ajax({
     type: "GET",
     url: '/delete/' + todoToDelete,
     succes:function(resp){
        
     }
 })
 displayTodos()
})

})
