// Do not expose your credentials in your code.
//let atlasDB = "mongodb+srv://deep307patel:cYWuFBSZBxP4Zm9e@Cluster0/carstore?retryWrites=true&w=majority";
let atlasDB = "mongodb+srv://deep307patel:deep3030@cluster0.vbz4gmh.mongodb.net/carstore?retryWrites=true&w=majority";




// Database setup
let mongoose = require('mongoose'); 

module.exports = function(){

    mongoose.connect(atlasDB, { useNewUrlParser: true, useUnifiedTopology: true});
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}

