const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(8000,function(){
    console.log("server is running");
});

app.get('/user', function(req,res){
  try{
    res.status(200).json({
        name:'Daniel',
        edat: '31',
        url: 'http://localhost:8000/user'
    });
  }catch(e){
    res.status(400).json({error: "bad request"});
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'images');
  },
  filename: (req, file, cb)=>{
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb)=>{
  if(file.mimetype === 'image/gif' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

app.post('/upload', upload.single('image'), (req,res)=>{

  console.log(req.file);
  if(!req.file) {
    res.status(400).json({error: "no s'ha pujat cap imatge png, jpg o gif"});
  }else{
    res.status(201).json({result: "image uploaded"});
  }

});

app.post('/time', (req,res)=>{

  const username=req.headers.username;
  const password=req.headers.password;

  const mockUsername="Daniel";
  const mockPassword="1234";

  if (username===mockUsername && password===mockPassword){
    let date = new Date;
    let usuari = req.body.username;
    res.set('Cache-control','no cache').json({
      success: true,
      message: 'usuari i contrasenya correctes!',
      usuari: usuari,
      hora: `${date.getHours()}:${String(date.getMinutes()).padStart(2,'0')}`,
      data: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'usuari i contrasenya incorrectes'
    });
  }
});

app.get('*', (req, res)=>{
  res.status(404).json({
      title: '404',
      error: 'Page not found'
  });
});
