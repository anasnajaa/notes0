export default {
    state: {
        notes: localStorage.getItem('notes') === null ? [
            {
                id: 1,
                title: 'Temporary Note ',
                content: 
`This note is loaded once on first visit.
Work Projects Sample
========================

- [E-School and Website Documentation](https://alruya-my.sharepoint.com/:w:/g/personal/anasmo_alruya_edu_kw/ESMXMfzgj8JGlIuUFv5eYBsB_RIUl7VRCXSmH0s7TuCnvA?e=8jGq5A) will expire in two days.
- [RBS Website](https://www.alruya.edu.kw/)
- [RBS E-School - Website](https://www.alruya.edu.kw/eschool)
- [RBS E-School - App](https://play.google.com/store/apps/details?id=net.alruyaschool.eschool.alruyae_school)
- [RBS ERP - App](https://play.google.com/store/apps/details?id=net.alruyaschool.eschool.rbs_erp)
- [PAAET Announcements](https://pay.paaet.edu.kw/cbe/cal/)

Other Resources
-------------------

- **Github:**  https://github.com/hecked12

- **Notes0:**  https://notes0.herokuapp.com/#/
- **Quiz0:**  https://quiz0.herokuapp.com/
- **Hecked:**  https://hecked.herokuapp.com/

Social
-------------

- Twitter: [@spidernet12](https://twitter.com/spidernet12)
- LinkdIn: [Anas Najaa](https://www.linkedin.com/in/anasnajaa)`,
                tags: [{text:'default'}],
                dateCreated: '20190417T185300',
                dateModefied: null
            }
        ] : JSON.parse(localStorage.getItem('notes'))
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