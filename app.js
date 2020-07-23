let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let methodOverride = require('method-override');

let app = express();

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.cz9bm.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

let listSchema = new mongoose.Schema({
	entry: String
})

let Entry = mongoose.model('Entry', listSchema);

app.get('/', function(req, res){
	
	Entry.find({}, function(err, allEntries){
		if(err){
			console.log('There was an issue: ')
			console.log(err)
		} else {
			res.render('index', {entries:allEntries});
		}
	})
})

app.post('/index', function(req, res){
	let entry = req.body.entry;
	let newEntry = {entry:entry}
	Entry.create(newEntry, function(err, newlyCreated){
		if(err){
			console.log('There was an issue: ')
			console.log(err)
		} else {
			res.redirect('/')
		}
	})
})

app.delete('/:id', function(req, res){
	Entry.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log('There was an issue: ')
			console.log(err)
		} else {
			res.redirect('/')
		}
	})
})

app.listen(process.env.PORT, process.env.IP, function(){
	console.log('Server running')
})