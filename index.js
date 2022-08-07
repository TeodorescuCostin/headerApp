const express = require("express");
var app = express()
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const fs = require('fs');

app.use(express.urlencoded({extended: true}));
app.use(express.json())

const { create } = require('ipfs-http-client');
const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

const { Web3Storage } = require('web3.storage');


function makeStorageClient () {
  return new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEY5MTg0MURjOUYxMUM1Nzk0Q0Y0YTA2Zjc1NDg3N0M1MzM5MTIwNEMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk1NzM1MjMyNzQsIm5hbWUiOiJIZWFkZXJUZXN0In0.yBvdu-zspSXiBR6HtXkJGTLEhZ_31Rq1eg-ZWXhCf14' })
}

makeStorageClient()

app.post('/api/post', (req,res) => {

  const data = req.body
  console.log(data)
  res.status(200)
})


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set('view engine', 'ejs');
app.use(fileUpload());

const fetch = require('node-fetch');

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;
