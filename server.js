let express = require('express');//importing the express framwork as we are going to use this one
let app = express();

//Imported mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');

//path of the database where we store our data
const uri = "mongodb+srv://admin786:admin786@cluster0.diwr1y6.mongodb.net/?retryWrites=true&w=majority";
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/public'));//pointing to directories
app.use(express.json());
app.use(express.urlencoded({extended: false}));//only parse incoming Request Object if strings or arrays

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//asynchronious (promise) function 
async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Cat');//this  method to get a MongoDB collection. If it doesn't already exist, it is automatically created:
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', function (req,res) {
    res.render('index.html');
});

app.get('/api/cats', (req,res) => {
    getAllCats((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'get all cats successful'});
        }
    });
});

app.post('/api/cat', (req,res)=>{
    let cat = req.body;
    postCat(cat, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});

function postCat(cat,callback) {
    collection.insertOne(cat,callback);
}

function getAllCats(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, ()=>{
    console.log('Server started on PORT', port);
    runDBConnection();
});