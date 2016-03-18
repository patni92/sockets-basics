var socket = io();

socket.on("connect", function () {
    console.log("Conntected to socket.io server");


});

socket.on("message", function (message) {
    var momentTimestamp = moment.utc(message.timestamp);
    console.log("New Message");
    console.log(message.text);

    jQuery(".messages").append("<strong>" + momentTimestamp.local().format("HH:mm ") + "</strong " +" <p>"  + message.text + "</p>");
});


var $form = jQuery("#message-form")

$form.on("submit", function (event) {
    event.preventDefault();
    var message = $form.find("input[name=message]")

    socket.emit("message", {
        text: message.val()
    })

    message.val("");
})
