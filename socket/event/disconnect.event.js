module.exports = (io, socket) => {
    socket.on("forceDisconnect", () => {
        count--;
        socket.disconnect();
    });

    socket.on("disconnect", () => {
        console.log("user disconnected: " + socket.name);
    });
};
