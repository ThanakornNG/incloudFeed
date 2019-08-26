const express = require("express")
const formidable = require("formidable")
const app = express()
var path = require('path');
var fs = require("fs-extra");
app.use(express.static('upload'));

app.get("/", (req, res)=>{
    res.end("i love home")
})

app.get("/login", (req, res)=>{
    res.end("i love login")
})

app.post("/myuploads", (req, res)=>{
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files)=>{
        if (err){
            res.json({result: 'ok', message: err})
        }else{
            console.log(JSON.stringify(fields))
            console.log(JSON.stringify(files))
            res.json({result: 'ok', fields, files})
        }
    })
})

app.post('/uploads/', function (req, res) {
    console.log("Upload File");

    try {
        var form = new formidable.IncomingForm();
        var newname = Date.now();
        form.parse(req, function (err, fields, files) {

            console.log(JSON.stringify(files));
            var oldpath = files.userfile.path;
            var newpath = path.join(__dirname, "./upload/" + newname.toString() + "." + files.userfile.name.split('.').pop());
            
            fs.move(oldpath, newpath, function (err) {
                if (err) throw err;

              var username = fields.username;
              var password =fields.password;
              console.log("username: " + username);
              console.log("password: " + password);
              res.json({result: "Upload Successfully"});

            });            
        });
    } catch (err) {
        console.log("err : " + err);
    }
});

app.listen(3000, ()=>{
    console.log("server is running...")
})