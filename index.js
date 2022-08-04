const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const {Server} = require("socket.io");
const io = new Server(server);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/methodics', function (error){
  if (error) throw error;
  console.log('Successfully connected')
});

const SubjectModel = require('./models/subject');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/subjects', (req, res) => {
  res.sendFile(__dirname + '/views/subjects.html');
});




io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('rooms_join', (data) => {
    socket.join(data.title);
  })

  socket.on('subject_getList', (msg) =>{
    SubjectModel.find().exec(function(err, subjects) {
        if (err) throw err;
        
        console.log(subjects);
        socket.emit('subject_listTaken', subjects);
    });
  })

  socket.on('subject_add', (data) =>{
    let newSubj = new SubjectModel({
        _id: new mongoose.Types.ObjectId(),
        title: data.title,
        code: data.code,
    });
    newSubj.save(function(err) {
      if (err) throw err;
      console.log('Subject successfully saved.');
      io.to('subjectList').emit('subject_added', newSubj)
    });
  })
  socket.on('subject_delete', (data) =>{
    console.log(data);
    SubjectModel.deleteOne({ _id: data.id }, function (err) {
      if (err) return handleError(err);
      console.log(`Subject successfully deleted. [${data.id}]`);
    });
    io.to('subjectList').emit('subject_deleted', {id: data.id})
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});