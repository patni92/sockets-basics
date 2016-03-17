var socket = io();

socket.on("connect", function () {
    console.log("Conntected to socket.io server");
});
