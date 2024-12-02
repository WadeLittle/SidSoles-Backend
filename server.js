const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
app.use(cors());
app.use(express.static("public"));
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
  
const items = [
    {
        "_id": 1,
        "brand": "jordan",
        "title": "Jordan 4 Retro White Thunder",
        "image": "jordan-4-white-thunder.jpg",
        "sku": "FQ8138-001",
        "sizes": [
            6,
            7,
            8
        ],
        "price": 350,
        "condition": "Brand New",
        "carted": false
    },
    {
        "_id": 2,
        "brand": "yeezy",
        "title": "Adidas Yeezy Boost 350 V2 Black (Non-Reflective)",
        "image": "350-black.png",
        "sku": "FU9006",
        "sizes": [
            6,
            7,
            8
        ],
        "price": 300,
        "condition": "Brand New",
        "carted": false
    },
    {
        "_id": 3,
        "brand": "yeezy",
        "title": "Adidas Yeezy Slide Onyx",
        "image": "yeezy-slide-onyx.jpg",
        "sku": "HQ6448",
        "sizes": [
            6,
            7,
            8
        ],
        "price": 180,
        "condition": "Brand New",
        "carted": false
    },
    {
        "_id": 4,
        "brand": "jordan",
        "title": "Jordan 4 Retro Thunder (2023)",
        "image": "jordan-4-thunder.jpg",
        "sku": "DH6927-017",
        "sizes": [
            6,
            7,
            8
        ],
        "price": 350,
        "condition": "Brand New",
        "carted": false
    },
    {
        "_id": 5,
        "brand": "dunk",
        "title": "Nike Dunk Low Retro White Black Panda (2021)",
        "image": "panda-dunk.png",
        "sku": "DD1391-100",
        "sizes": [
            6,
            7,
            8
        ],
        "price": 140,
        "condition": "Brand New",
        "carted": false
    },
    {
        "_id": 6,
        "brand": "dunk",
        "title": "Nike Dunk Low Triple Pink (GS)",
        "image": "triple-pink-dunk.jpg ",
        "sku": "DH9765-600",
        "sizes": [
            6,
            7,
            8
        ],
        "price": 160,
        "condition": "Brand New",
        "carted": false
    },
    {
        "_id": 7,
        "brand": "yeezy",
        "title": "Adidas Yeezy Boost 350 V2 Bone",
        "image": "yeezy-350-bone.jpg",
        "sku": "HQ6316",
        "sizes": [
            6,
            7,
            8
        ],
        "price": 225,
        "condition": "Brand New",
        "carted": false
    },
    {
        "_id": 8,
        "brand": "jordan",
        "title": "Jordan 11 Retro Cool Grey (2021)",
        "image": "cool-grey-11.png",
        "sku": "CT8012-005",
        "sizes": [
            6,
            7,
            8
        ],
        "price": 400,
        "condition": "Brand New",
        "carted": false
    },
    {
        "_id": 9,
        "brand": "dunk",
        "title": "Nike Dunk Low UNC (2021)",
        "image": "unc-dunk.jpg",
        "sku": "DD1391-102",
        "sizes": [
            6,
            7,
            8
        ],
        "price": 280,
        "condition": "Brand New",
        "carted": false
    }
];


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/shoes", (req,res) => {
    res.json(items);
});

app.post("/api/shoes", upload.single("image"), (req,res)=> {
    console.log("In a post request");

    const result = validateItem(req.body);

    if(result.error)  {
        res.status(400).send(result.error.details[0].message);
        console.log("I have an error");
        return;
    }

    const item = {
        _id:req.body._id,
        brand:req.body.brand,
        title:req.body.title,
        sku:req.body.sku,
        sizes: JSON.parse(req.body.sizes),
        price:req.body.price,
        condition:req.body.condition
    }
    if(req.file){
        item.image = req.file.filename;
    }
    items.push(item);
    console.log(item);
    res.status(200).send(item);
});

app.put("/api/shoes/:_id", upload.single("image"), (req,res)=>{
    const item = items.find((item)=>item._id ===parseInt(req.params._id));
  
    if(!item){
      res.status(404).send("The house with the provided id was not found");
      return;
    }
    const result = validateItem(req.body);
    
    if(result.error){
      res.status(400).send(result.error.details[0].message);
      return;
    }
    item.brand = req.body.brand;
    item.title = req.body.title;
    item.sku = req.body.sku;
    item.sizes = JSON.parse(req.body.sizes);
    item.price = req.body.price;
    item.condition = req.body.condition;
  
    if(req.file){
      item.image = req.file.filename;
    }
  
    res.status(200).send(item);
  });




const validateItem = (item)=> {
    const schema = Joi.object({
        brand:Joi.string().required(),
        title:Joi.string().required(),
        sku:Joi.string().required(),
        sizes:Joi.string().required(),
        price:Joi.number().required(),
        condition:Joi.string().required(),
    });
    return schema.validate(item);
};














app.listen(3001, () => {
    console.log("Listening....");
  });