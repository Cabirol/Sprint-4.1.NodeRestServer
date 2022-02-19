# Sprint-4.1.NodeRestServer

## Instruccions:

Instal·lar els mòduls express, multer i cors:

`npm install`

Iniciar el server:

`npm start`

A la documentació de la col·lecció de postman hi ha les instruccions per a cada petició.

## Enunciat dels exercicis:

Crearem una API REST de resposta ràpida

Nivell 1
- Exercici 1
Crea un servidor amb Express que retorni a una petició GET a l'endpoint /user un json amb el teu nom, edat i la url des d'on es fa la petició.

- Exercici 2
Afegeix un endpoint /upload per a pujar al servidor un arxiu de tipus png, jpg o gif que retorni un missatge d'error en cas que l'extensió de l'arxiu no coincideixi amb aquestes.

Nivell 2
- Exercici 1
Crea un endpoint /time que rebi per POST com a paràmetre un JSON amb el nom d'usuari i retorni un objecte JSON que contingui l'hora i data actual. Inclogui un middleware que afegeixi la capçalera Cache-control: no-cache. Habiliti CORS en les respostes, ja sigui mitjançant Express o mitjançant un altre middleware.

Nivell 3
- Exercici 1
Afegeixi un middleware a l'endpoint anterior que retorni un HTTP Status 401 - Unauthorized si la capçalera de la petició no conté autenticació bàsica (usuari i contrasenya).
