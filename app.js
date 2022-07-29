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
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// mongoose.connect('mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.35f5yfz.mongodb.net/?retryWrites=true&w=majority/flipkartDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://sudha:ksudha241A@cluster0.35f5yfz.mongodb.net/?retryWrites=true&w=majority/flipkartDB', { useNewUrlParser: true, useUnifiedTopology: true });

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
    description: "This is a black dress",
    price: "Rs 1500",
    url: "https://cdn.hum3d.com/wp-content/uploads/Tools/967_Dress/Dress_1000_0001.jpg"
});

const item2 = new Item({
    id: "2",
    name: "Laptop",
    description: "This is a black dress",
    price: "300$",
    url: "https://cdn.hum3d.com/wp-content/uploads/Tools/967_Dress/Dress_1000_0001.jpg"
});

const item3 = new Item({
    id: "1",
    name: "Black Dress",
    description: "This is a black dress",
    price: "20$",
    url: "https://cdn.hum3d.com/wp-content/uploads/Tools/967_Dress/Dress_1000_0001.jpg"
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