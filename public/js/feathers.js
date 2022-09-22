const socket = io('http://localhost:3030/');
const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(feathers.authentication());

export default app;
