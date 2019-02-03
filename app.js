
const fs = require('fs'); //file system modulo (cosas de archivos)
// const os = require('os'); //os modulo (informacion de usuario y os)
const _ = require('lodash'); //modulo lodash (cosas de strings)
const yargs = require('yargs'); //modulo yargs (manejo de argumentos q pasa el usuario por terminal)

const notes = require('./notes.js'); //mi modulo notes 

const titleOptions = {
	describe: 'Titulo de la nota',
	demand: true, //tenes que pedir titulo siempre
	alias: 't'
};

const bodyOptions = {
	describe: 'Cuerpo de la nota',
	demand: true,
	alias: 'b'
};

const argv = yargs
	.command('add','Añade una nueva nota', {
		title: titleOptions,
		body: bodyOptions
	})
	.command('list','Lista todas las notas')
	.command('read','Lee una nota', {
		title: titleOptions
	})
	.command('remove','Elimina una nota', {
		title: titleOptions
	})
	.help()
	.argv;
var command = argv._[0];


var printNote = (note) =>{
	console.log(' -Titulo:',note.title,'\n -Body:',note.body);
}



if(command === 'add'){
	if(!argv.body){
		argv.body = '';
	}
	var note = notes.addNote(argv.title,argv.body);
	if(note){
		console.log('La nota fue creada! \n -Titlo:', note.title,'\n -Body:', note.body);
	}
}
else if(command==='list'){
	var notesList = notes.getAll();
	for(var i=0; i<notesList.length; i++){ //se puede modificar con .forEach((note)=> notes.readNote(note));
		printNote(notesList[i]);
		console.log('*********************************************');
	}
} 
else if(command === 'read'){
	var note = notes.getNote(argv.title);
	if(note){
		console.log('La nota fue encontrada!\n');
		printNote(note);
	}
}
else if(command=== 'remove'){
	console.log('Removiendo nota...');
	var newNotes = notes.removeNote(argv.title);
	if (newNotes){
		console.log('Nota',argv.title,'eliminada exitosamente.');
	}
}
else{
	console.log('Comando no reconocido');
}



