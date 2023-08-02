// var express = require("express")//importing the express framwork as we are going to use this one
// var app = express()

// app.use(express.static(__dirname+'/public'))//pointing to directories
// app.use(express.json());

// app.use(express.urlencoded({ extended: false }));//only parse incoming Request Object if strings or arrays
// var port = process.env.port || 3000;//// use port 3000 unless there exists a preconfigured port

// //callback function for listening the app on port:3000
// app.listen(port,()=>{

//     console.log("App listening to: "+port)

// })

express = require("express")
var app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cardList = [
{
title: "Kitten 2",
image: "images/kitten-2.jpg",
link: "About Kitten 2",
desciption: "Demo desciption about kitten 2"
},
{
title: "Kitten 3",
image: "images/kitten-3.jpg",
link: "About Kitten 3",
desciption: "Demo desciption about kitten 3"
}
]
app.get('/api/projects',(req,res) => {
res.json({statusCode: 200, data: cardList, message:"Success"})
})
var port = process.env.port || 3000;
app.listen(port,()=>{
console.log("App listening to: "+port)
})
