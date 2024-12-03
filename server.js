const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
app.use(cors());
app.use(express.static("public"));
const multer = require("multer");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

mongoose 
.connect("mongodb+srv://portia:SB1QdULIQxPwE7i2@cluster0.tfvcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> {console.log("Connected to MongoDB");})
.catch((error) => {
    console.log("couldn't connect to MongoDB", error);
});
  
const itemSchema = new mongoose.Schema({
    brand: String,
    title: String,
    sku: String,
    sizes: Array,
    price: Number,
    condition: String,
    image: String
});

const Item = mongoose.model("Item", itemSchema);



app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/shoes", async(req,res) => {
   const items = await Item.find();
   res.send(items);
});

app.post("/api/shoes", upload.single("image"), async(req,res)=> {

    const result = validateItem(req.body);

    if(result.error)  {
        res.status(400).send(result.error.details[0].message);
        console.log("I have an error");
        return;
    }

    const item = new Item({
        brand:req.body.brand,
        title:req.body.title,
        sku:req.body.sku,
        sizes: JSON.parse(req.body.sizes),
        price:req.body.price,
        condition:req.body.condition
    });
    if(req.file){
        item.image = req.file.filename;
    }
   const newItem = await item.save();
    res.status(200).send(newItem);
});

app.put("/api/shoes/:id", upload.single("image"), (req,res)=>{
    const item = items.find((item)=>item._id ===parseInt(req.params.id));
  
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


  app.delete("/api/shoes/:id", async(req,res)=>{
    const item = await Item.findByIdAndDelete(req.params.id);
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