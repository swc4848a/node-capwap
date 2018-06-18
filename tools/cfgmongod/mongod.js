let mongoose = require('mongoose')

mongoose.connect('mongodb://172.16.94.164/test')

let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

var kittySchema = mongoose.Schema({name: String});

kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

Kitten.find(function (err, kittens) {
    if (err) 
        return console.error(err);
    console.log(kittens);
})

db.on('open', function () {
    console.log('mongodb opened!')

    var fluffy = new Kitten({name: 'fluffy'});
    var silence = new Kitten({name: 'Silence'});

    fluffy.speak();
    silence.speak();

    fluffy.save(function (err, fluffy) {
        if (err) 
            return console.error(err);
        console.log('fluffy is saved')
    });
})

// mongoose.disconnect();