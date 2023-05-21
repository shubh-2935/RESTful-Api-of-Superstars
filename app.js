const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.URI || 3000;

const mongoConnect = async () => {
    try {
        const moncon = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    }
    catch (err) {
        console.log(err);
    }
}

const actorSchema = new mongoose.Schema({
    name: String,
    movie: String
})

const Superstar = mongoose.model("Superstar", actorSchema);

// app.get("/", async (req, res) => {
//     try {
//         const superstars = await Superstar.insertMany([
//             {
//                 "_id": "6468ab05eb5106b38fd23f6f",
//                 "name": "Brad Pitt",
//                 "movie": "Fight Club",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f70",
//                 "name": "Angelina Jolie",
//                 "movie": "Maleficent",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f71",
//                 "name": "Tom Cruise",
//                 "movie": "Mission: Impossible",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f72",
//                 "name": "Jennifer Lawrence",
//                 "movie": "The Hunger Games",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f73",
//                 "name": "Leonardo DiCaprio",
//                 "movie": "The Wolf of Wall Street",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f74",
//                 "name": "Scarlett Johansson",
//                 "movie": "Avengers: Endgame",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f75",
//                 "name": "Robert Downey Jr.",
//                 "movie": "Iron Man",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f76",
//                 "name": "Meryl Streep",
//                 "movie": "The Devil Wears Prada",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f77",
//                 "name": "Denzel Washington",
//                 "movie": "Training Day",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f78",
//                 "name": "Charlize Theron",
//                 "movie": "Mad Max: Fury Road",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f79",
//                 "name": "Johnny Depp",
//                 "movie": "Pirates of the Caribbean",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f7a",
//                 "name": "Sandra Bullock",
//                 "movie": "Gravity",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f7b",
//                 "name": "Chris Hemsworth",
//                 "movie": "Thor: Ragnarok",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f7c",
//                 "name": "Emma Stone",
//                 "movie": "La La Land",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f7d",
//                 "name": "Ryan Reynolds",
//                 "movie": "Deadpool",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f7e",
//                 "name": "Julia Roberts",
//                 "movie": "Pretty Woman",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f7f",
//                 "name": "Will Smith",
//                 "movie": "Men in Black",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f80",
//                 "name": "Natalie Portman",
//                 "movie": "Black Swan",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f81",
//                 "name": "Dwayne Johnson",
//                 "movie": "Jumanji: Welcome to the Jungle",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468ab05eb5106b38fd23f82",
//                 "name": "Anne Hathaway",
//                 "movie": "The Devil Wears Prada",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468b16884191f381d2eaedd",
//                 "name": "Hritik Roshan",
//                 "movie": "Krish 3",
//                 "__v": 0
//             },
//             {
//                 "_id": "6468b306da41627d13a4e9c7",
//                 "name": "Akshay Kumar",
//                 "movie": "Hera Pheri",
//                 "__v": 0
//             }
//         ])
//         res.send("Successfully added");
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

app.route("/superstars")
    .get(async (req, res) => {

        try {
            const superArray = await Superstar.find({});
            res.send(superArray);
        }
        catch (err) {
            console.log(err);
        }

    })

    .post(async (req, res) => {

        try {
            const name = req.body.name;
            const movie = req.body.movie;
            const superstar = new Superstar({
                name: name,
                movie: movie
            })
            const isSave = await superstar.save();
            if (isSave) {
                res.send("New character added");
            }
        }
        catch (err) {
            console.log(err);
        }

    })

    .delete(async (req, res) => {
        try {
            await Superstar.deleteMany();
            res.send("All the items deleted");
            console.log(err);
        }
        catch (err) {
        }
    })

app.route("/superstars/:superName")
    .get(async (req, res) => {
        try{
            const starName = await Superstar.findOne({name: req.params.superName});
            if(starName){
                res.send(starName);
            }
            else{
                res.send("No matches");
            }
        }
        catch(err){
            console.log(err);
        }
    })

    .put(async (req, res) => {
        try{
            const update = await Superstar.replaceOne({name: req.params.superName}, 
                                                    {name: req.body.name, movie: req.body.movie}, 
                                                    {overwrite: true}
                                                );
            if(update){
                res.send("Updated Successfully by Patch");
            }
            else{
                res.send("Not updated");
            }
        }
        catch(err){
            console.log(err);
        }
    })

    .patch(async (req, res) => {
        try{
            const update = await Superstar.updateOne({name: req.params.superName}, { $set: req.body });
            if(update){
                res.send("Updated Successfully by Patch");
            }
            else{
                res.send("Not updated");
            }
        }
        catch(err){
            console.log(err);
        }
    })

    .delete(async (req, res) => {
        try{
            const deleteItem = await Superstar.deleteOne({name: req.params.superName});
            if(deleteItem){
                res.send("Deleted Successfully");
            }
            else{
                res.send("Not deleted");
            }
        }
        catch(err){
            console.log(err);
        }
    })


mongoConnect().then(() => {
    app.listen(PORT, () => {
        console.log("Listening on port");
    })
});