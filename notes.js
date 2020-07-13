const fs = require('fs');
const chalk = require('chalk');

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green("Your notes: "))
    notes.forEach(note => {
        console.log(chalk.cyan(note.title))
    });

}

const readNote = (title) => {
    const notes = loadNotes();
    const noteToBeRead = notes.find((note) => note.title === title);
    if (noteToBeRead) {
        console.log(chalk.magenta(noteToBeRead.title))
        console.log(noteToBeRead.body)
    } else {
        console.log(chalk.red('We could not find this note.'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length){
        saveNotes(notesToKeep);
        console.log(chalk.green(`Note "${title}" removed!`))
    } else {
        console.log(chalk.red('No note found!'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}