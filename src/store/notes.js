export default {
    state: {
        notes: JSON.parse(localStorage.getItem('notes') === null ? [] : localStorage.getItem('notes'))
    },
    getters: {
        getNoteById: (state) => (id) =>{
            const notes = state.notes;
            let note = null;
            for(let i = 0; i < notes.length; i++){
                if(notes[i].id === id){
                    return notes[i];
                }
            }
            return note;
        }
    },
    actions: {
        insertNote: ({ commit, state }, note)=>{
            const notes = [...state.notes];
            notes.push(note);
            try {
                localStorage.setItem('notes', JSON.stringify(notes));
                commit('insertNote', note);
                return true;
            } catch(err) {
                return false;
            }
        },
        deleteNote: ({ commit, state }, noteId)=>{
            const notes = [...state.notes];
            try {
                for(let i = 0; i < notes.length; i++){
                    if(notes[i].id === noteId){
                        notes.splice(i, 1);
                        localStorage.setItem('notes', JSON.stringify(notes));
                        commit('deleteNote', noteId);
                        return true;
                    }
                }
            } catch(err){
                return false;
            }
        },
        updateNote: ({ commit, state }, note)=>{
            const notes = [...state.notes];
            try{
                for(let i = 0; i < notes.length; i++){
                    if(notes[i].id === note.id){
                        notes[i] = note;
                        localStorage.setItem('notes', JSON.stringify(notes));
                        commit('updateNote', note);
                        return true;
                    }
                }
            } catch(err){
                return false;
            }
        }
    },
    mutations: {
        insertNote: (state, note) => {
            const notes = state.notes;
            notes.push(note);
        },
        updateNote: (state, note) => {
            const notes = state.notes;
            for(let i = 0; i < notes.length; i++){
                if(notes[i].id === note.id){
                    notes[i] = note;
                    break;
                }
            }
        },
        deleteNote: (state, noteId) => {
            const notes = state.notes;
            for(let i = 0; i < notes.length; i++){
                if(notes[i].id === noteId){
                    notes.splice(i, 1);
                }
            }
        }
    }
}