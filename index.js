require('express-async-errors');
require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(bodyParser.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//DB
const connectDB = require('./db/connect');

//error handler

const notFoundMiddleware = require('./middleware/not-found');
const errorhandlerFunc = require('./middleware/error-handler');

//Routes
const AuthRoutes = require('./routes/auth');
const ProductRoutes = require('./routes/product');
const ChatRoutes = require('./routes/chat')
const MessageRoutes = require('./routes/message')
const AdminRoutes = require('./routes/admin')
const OrderRoutes = require('./routes/order')
const PaymentRoutes = require('./routes/payment')

app.use(express.json());

app.use('/api/user',AuthRoutes)

app.use('/api/product', ProductRoutes)

app.use('/api/chat', ChatRoutes)

app.use('/api/message', MessageRoutes)

app.use('/api/admin', AdminRoutes)

app.use('/api/order', OrderRoutes)

app.use('/api/payment', PaymentRoutes)

app.get('/', (req, res)=>{
    res.send('Hey Got you')
})
//MiddleWare

app.use(notFoundMiddleware);

app.use(errorhandlerFunc);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port} and Connected to DB...`)
        );
        
    } catch (error) {
        console.log(error);
    }
};

start();

let activeUsers = []

io.on("connection", (socket)=>{
    socket.on('new-user-add', (newUserId)=>{
        
        if(!activeUsers.some((user)=> user.userId === newUserId)){
            
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }

        console.log('connected Users', activeUsers);
        io.emit('get-users', activeUsers)
    })

    //sendMessage
    socket.on('send-message', (data)=>{
        const {receiverId} = data
        const user = activeUsers.find((user)=> user.userId === receiverId)
        console.log('send message from socket to', receiverId);

        if(user){
            io.to(user.socketId).emit('receive-message', data)
        }
    })

    socket.on('disconnect', ()=>{
        activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id)
        console.log('User Disconnected', activeUsers);
        io.emit('get-users', activeUsers)
    })

    socket.on("typing", (data) => {
        const { senderId, chatId, isTyping, receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
    
        if (user) {
          io.to(user.socketId).emit("user-typing", { senderId, chatId, isTyping });
        }
    });

})

io.listen(8000, {
    cors: {
        origin: "*",
    },
});

