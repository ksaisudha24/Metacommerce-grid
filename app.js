//jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session')
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");
const cors = require("cors");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@cluster0.35f5yfz.mongodb.net/?retryWrites=true&w=majority/flipkartDB', { useNewUrlParser: true, useUnifiedTopology: true });


const itemSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    price: String,
    url: String
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    id: "1",
    name: "Black Dress",
    description: "Black solid woven accordian pleats empire dress, has a stand collar, long puff sleeves, button closure, flared hem",
    price: "Rs 1500",
    url: "https://cdn.hum3d.com/wp-content/uploads/Tools/967_Dress/Dress_1000_0001.jpg"
});

const item2 = new Item({
    id: "2",
    name: "Laptop",
    description: "Lenovo Ideapad 3 AMD Ryzen 5 5500U 15.6 (39.62cm) FHD Thin & Light Laptop (8GB/512GB SSD/Windows 11/Office 2021/Backlit Keyboard/2Yr Warranty/Arctic Grey/1.65Kg), 82KU017KIN",
    price: "Rs 70000",
    url: "https://m.media-amazon.com/images/I/81o+qmhDE9L._AC_SS450_.jpg"
});

const item3 = new Item({
    id: "3",
    name: "Mobile Phone",
    description: "OPPO A74 5G (Fantastic Purple,6GB RAM,128GB Storage) with No Cost EMI/Additional Exchange Offers",
    price: "20000",
    url: "https://images.gizbot.com/img/2020/02/realme-c2-diamond-ruby-32-gb-1580991963.jpg"
});
const item4 = new Item({
    id: "4",
    name: "Head Phones",
    description: "Honeywell Moxie V10 Wireless Bluetooth Headphones with Upto 12 Hours Playtime, Foldable Headphone with Mic, High Bass, Bluetooth 5.0 (Red)",
    price: "Rs 1400",
    url: "https://cf.shopee.sg/file/0e4bbcb725404903b5ce8d9b127342cc"
});

const item5 = new Item({
    id: "5",
    name: "Brown Dress",
    description: "Lymio Women Dress(491-524)",
    price: "Rs 4000",
    url: "https://cdn-images.farfetch-contents.com/17/60/08/29/17600829_39802733_600.jpg"
});


const item6 = new Item({
    id: "6",
    name: "Blue Jeans",
    description: "Levi's Men's Slim Jeans",
    price: "Rs 3000",
    url: "https://www.renderhub.com/vicky180/male-jeans-denim-pants/male-jeans-denim-pants-02.jpg"
});

const item7 = new Item({
    id: "7",
    name: "Black Jeans",
    description: "Levi's Men's Slim Jeans",
    price: "Rs 3000",
    url: "https://img2.cgtrader.com/items/2037338/69f25b581d/large/mens-black-levi-s-jeans-with-4k-texture-3d-model-obj-mtl.jpg"
});

const item8 = new Item({
    id: "8",
    name: "Sandals",
    description: "Puma mens Prime Idp Iron Gate-sunflower-puma Black Outdoor Sandals",
    price: "Rs 4000",
    url: "https://5.imimg.com/data5/HQ/IC/MY-28948580/puma-men-s-sandals-250x250.jpg"
});

const item9 = new Item({
    id: "9",
    name: "Heels",
    description: "ABJ Fashion Latest Womens Pencil Heel sandal | Kitten heel",
    price: "Rs 1500",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSoRD0JSWC_hCrr2xlgyFpys59BS3C9Uthw&usqp=CAU"
});


const item10 = new Item({
    id: "10",
    name: "LandPhone",
    description: "Beetel M59 Caller ID Corded Landline Phone with 16 Digit LCD Display & Adjustable contrast,10 One Touch Memory Buttons,2Ways Speaker Phone,Music On Hold,Solid Build Quality,Classic Design (Black)(M59)",
    price: "Rs 1200",
    url: " https://us.123rf.com/450wm/alexlmx/alexlmx1710/alexlmx171000363/88062643-black-old-fashioned-phone-3d-rendering-isolated-on-white-background.jpg"
});
const item11 = new Item({
    id: "11",
    name: "Television",
    description: "AmazonBasics 109 cm (43 inches) Full HD Smart LED Fire TV AB43E10DS (Black)",
    price: "Rs 40000",
    url: "https://images.samsung.com/is/image/samsung/in-full-hd-tv-te50fa-ua43te50fakxxl-frontblack-231881877?$650_519_PNG$"
});

const item12 = new Item({
    id: "12",
    name: "Watch",
    description: "Time Up Digital Dial Printed Strap with Cartoon Waterproof Alarm Kids Watch for Boys & Girls (Age:4-12 Years)",
    price: "Rs 4000",
    url: "https://5.imimg.com/data5/MK/IH/MY-50357095/mens-sport-watch-500x500.jpeg"

});

const item13 = new Item({
    id: "13",
    name: "Blue Dress",
    description: "Lymio Women Dress(491-524)",
    price: "Rs 4000",
    url: "https://w7.pngwing.com/pngs/737/319/png-transparent-designer-clothing-dress-marvelous-entertainment-dress-blue-3d-computer-graphics-textile.png"

});
const item14 = new Item({
    id: "14",
    name: "Suit",
    description: "Men's Two Piece Suit - Download Free 3D model by",
    price: "Rs 12000",
    url: "https://media.sketchfab.com/models/8cafbab7a73e4fb7966a00659a4e31ef/thumbnails/a623b4049e6a4265be005d62cb8a3a16/b9ac836e281a47ea8f31d04c8ccc7041.jpeg"
});
const item15 = new Item({
    id: "15",
    name: "Red-Suit",
    description: "Men's Two Piece Suit - Download Free 3D model by",
    price: "Rs 12000",
    url: "https://static.turbosquid.com/Preview/2019/08/26__05_06_16/suitmodelin3D.jpg43741F42-D92D-4E95-A2F7-365DF2C46DF2Large.jpg"
});
const item16 = new Item({
    id: "16",
    name: "Heels",
    description: "ABJ Fashion Latest Womens Pencil Heel sandal | Kitten heel",
    price: "Rs 1500",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSoRD0JSWC_hCrr2xlgyFpys59BS3C9Uthw&usqp=CAU"
});
const item17 = new Item({
    id: "17",
    name: "Saree",
    description: "Traditional Indian Saree",
    price: "Rs 3500",
    url: "https://cdna.artstation.com/p/marketplace/presentation_assets/000/639/068/large/file.jpg?1607660466"
});
const item18 = new Item({
    id: "18",
    name: "Traditional Dress",
    description: "Traditional Indian Dress",
    price: "Rs 3500",
    url: "https://cdnb.artstation.com/p/assets/images/images/023/291/429/large/swati-sharma-stylish-designer-indian-women-dress-3d-model-3d-model-obj-fbx-2.jpg?1578725248"
});
const item19 = new Item({
    id: "19",
    name: "Traditional_Dress",
    description: "Traditional Indian Dress",
    price: "Rs 3800",
    url: "https://i.pinimg.com/originals/71/58/26/7158262e6c73dd36e900eb45c0ecb1b7.jpg"
});
const item20 = new Item({
    id: "20",
    name: "Traditional_Dress_men",
    description: "Traditional Men Dress",
    price: "Rs 1800",
    url: "https://i.pinimg.com/originals/71/58/26/7158262e6c73dd36e900eb45c0ecb1b7.jpg"
});


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


app.get("/", function(req, res) {
    res.render("home");
});


app.get("/register", function(req, res) {
    res.render("register");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/welcome", function(req, res) {
    if (req.isAuthenticated()) {
        res.render("welcome");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", function(req, res) {
    res.redirect("/");
});

app.get("/black-dress", function(req, res) {
    res.render("product", { item: item1 })
});
app.get("/laptop", function(req, res) {
    res.render("product", { item: item2 })
});
app.get("/Mobile-phone", function(req, res) {
    res.render("product", { item: item3 })
});
app.get("/HeadPhones", function(req, res) {
    res.render("product", { item: item4 })
});
app.get("/Brown-dress", function(req, res) {
    res.render("product", { item: item5 })
});
app.get("/Blue-Jeans", function(req, res) {
    res.render("product", { item: item6 })
});
app.get("/Black-Jeans", function(req, res) {
    res.render("product", { item: item7 })
});
app.get("/Sandals", function(req, res) {
    res.render("product", { item: item8 })
});
app.get("/LandPhone", function(req, res) {
    res.render("product", { item: item9 })
});
app.get("/Heels", function(req, res) {
    res.render("product", { item: item10 })
});
app.get("/Television", function(req, res) {
    res.render("product", { item: item11 })
});
app.get("/Watch", function(req, res) {
    res.render("product", { item: item12 })
});
app.get("/BlueDress", function(req, res) {
    res.render("product", { item: item13 })
});
app.get("/Suit", function(req, res) {
    res.render("product", { item: item14 })
});
app.get("/red_suit", function(req, res) {
    res.render("product", { item: item15 })
});
app.get("/Heels2", function(req, res) {
    res.render("product", { item: item16 })
});
app.get("/Saree", function(req, res) {
    res.render("product", { item: item17 })
});
app.get("/Dress_1", function(req, res) {
    res.render("product", { item: item18 })
});
app.get("/Dress_2", function(req, res) {
    res.render("product", { item: item19 })
});
app.get("/Dress_3", function(req, res) {
    res.render("product", { item: item20 })
});


app.post("/register", function(req, res) {
    User.register({ username: req.body.username }, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("https://hub.link/FwceFK8");
            });
        }
    });
});

app.post("/login", function(req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("https://hub.link/FwceFK8");
            });
        }
    });
});

app.listen(process.env.PORT || 5000,
    () => console.log("Server is running..."));