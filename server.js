const express = require('express');
const multer = require('multer');
const app = express();

app.set('view engine', 'ejs');

app.listen(8000,function(){
    console.log("server is running");
});

/*Nivell 1,Exercici 1:
Crea un servidor amb Express 
que retorni a una petició GET a l'endpoint /user un json amb el teu nom, edat i la url des d'on es fa la petició.
*/
app.get('/user', function(req,res){
    res.json({
        name:'Daniel',
        edat: '31',
        url: 'http://localhost:8000/user'
    });
});

/*
- Exercici 2
Afegeix un endpoint /upload 
per a pujar al servidor un arxiu de tipus png, jpg o gif 
que retorni un missatge d'error en cas que l'extensió de l'arxiu no coincideixi amb aquestes.
*/
app.get('/upload', function(req,res){
  res.render("upload");
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
  if(file.mimetype === 'image/gif' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(new Error("Només s'accepten arxius png, jpg o gif"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

app.post('/upload', upload.single('image'), (req,res)=>{ //a postman: body, key: image, value: (carregar imatge)
  console.log(req.file);
  res.send("image uploaded");
})
/*
Nivell 2
- Exercici 1
Creu un endpoint /time 
que rebi per POST com a paràmetre un JSON amb el nom d'usuari i retorni un objecte JSON que contingui l'hora i data actual. 
Inclogui un middleware que afegeixi la capçalera Cache-control: no-cache. 
Habiliti CORS en les respostes, ja sigui mitjançant Express o mitjançant un altre middleware.

Nivell 3
- Exercici 1
Afegeixi un middleware a l'endpoint anterior 
que retorni un HTTP Status 401 - Unauthorized si la capçalera de la petició no conté autenticació bàsica (usuari i contrasenya.*/
