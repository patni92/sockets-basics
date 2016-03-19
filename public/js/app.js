var name = getQueryVariable("name") || "guest";
var room = getQueryVariable("room");

jQuery("#roomName").text(room);

console.log(name + " wants to join " + room);
var socket = io();

socket.on("connect", function () {
    console.log("Conntected to socket.io server");
    socket.emit("joinRoom", {
        name: name,
        room: room
    });

    


});




socket.on("message", function (message) {
    var momentTimestamp = moment.utc(message.timestamp);
    var $message = jQuery(".messages");
    console.log("New Message");
    console.log(message.text);




    $message.append("<p><strong>" + message.name + " "+ momentTimestamp.local().format("HH:mm") + "</strong></p>")
    $message.append("<p>" + message.text + "</p>")
});


var $form = jQuery("#message-form")

$form.on("submit", function (event) {
    event.preventDefault();
    var $message = $form.find("input[name=message]")

    socket.emit("message", {
        name: name,
        text: $message.val()
    })

    $message.val("");
})
