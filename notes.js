
const fs = require('fs');

var fetchNotes = () => {
	try {//esto es para los errores
		var notesString = fs.readFileSync('notes-data.json'); //Lee las notas anteriores
		return JSON.parse(notesString);//Las convierte de string a objeto
	} catch (e){
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes)); //lo manda al archivo de vuelta convirtiendolo en string
};

var addNote = (title, body) => {
	var note = {
		title,
		body
	};

	var notes = fetchNotes();

	var duplicateNotes = notes.filter((note)=> note.title === title);//pone en un array el titulo que ya aparece una ves en el array de notas

	if (duplicateNotes.length === 0){ //no tiene ningun titulo porq no hay ninguna nota cpn el no,bre repetido asi que procede
		notes.push(note); //agrega la nueva nota al array
		saveNotes(notes);
		return note;
	}
	else{
		console.log('Error. El nombre de la nota ya existe');
	}
}

var getAll = () => {
	console.log('Obteniendo todas las notas...\n');

	return fetchNotes();
}

var getNote = (title) => {
	console.log('Leyendo nota:',title);
	var notes = fetchNotes();
	notes = notes.filter((note)=> note.title === title);

	if(notes.length){
		return notes[0];
	}
	else{
		console.log('No existe ninguna nota con ese título.');
	}
}

var removeNote = (title) => {
	var notes = fetchNotes();
	var notesFiltered = notes.filter((note)=> note.title !== title);
	if(notes.length!==notesFiltered.length){
		saveNotes(notesFiltered);
		return notesFiltered;
	}
	else{
		console.log('No existe ninguna nota con ese título.');
	}
}
module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
};
