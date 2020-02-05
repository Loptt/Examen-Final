let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

let MovieCollection = mongoose.Schema({
    film_ID: String,
    film_title: String,
    year: Number,
    rating: Number
})

let Movie = mongoose.model('movies', MovieCollection);

let MovieController = {
    getAll: function() {
        return Movie.find()
            .then(movies => {
                return movies;
            })
            .catch(err => {
                throw Error(err);
            })
    },
    create: function(newMovie) {
        return Movie.create(newMovie)
            .then(movie => {
                return movie;
            })
            .catch(err => {
                throw Error(err);
            })
    }
}

module.exports = {
    MovieController    
};