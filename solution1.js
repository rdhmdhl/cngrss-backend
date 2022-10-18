const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/us-senate')
    .then(() => console.log('connected to mongodb database...'))
    .catch(err => console.log('An error occured...', err));

const senateSchema = new mongoose.Schema({
    name: String,
    title: String,
    state_name: String,
    party: String,
    date_of_birth: String,
    entered_office: String,
    term_end: String
});

// create a model and specify the name of the collection: "Course" -- singular
const Senator = mongoose.model('Senator', senateSchema);

async function getSenator(){
   return await Senator
        .find({ state_name: 'California' })
        .sort('name')
        .select('name title state_name party, date_of_birth entered_office term_end')
}

async function run(){
    const senators = await getSenator();
    console.log(senators)
}

run();
