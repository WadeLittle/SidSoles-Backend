
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("public"));

const items = [
    {
        "id": 1,
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
        "id": 2,
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
        "id": 3,
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
        "id": 4,
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
        "id": 5,
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
        "id": 6,
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
        "id": 7,
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
        "id": 8,
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
        "id": 9,
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
app.listen(3001, () => {
    console.log("Listening....");
  });