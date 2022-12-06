const app = require("./app");
const socket = require("socket.io")

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

const server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

const io = socket(server)

io.on("connection", socket => {
  console.log("New client connected: ", socket.id)

  socket.on("new-message", payload => {
    console.log("New message incoming: ", payload)

    // Send message to all connected clients
    io.emit("message", payload)
  })
})



