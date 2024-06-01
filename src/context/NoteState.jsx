import React, {useState} from "react";
import NoteContext from './NoteContext';

const noteState = (props)=>{
    const [state, setState] = useState({
        name: 'Priyanshu',
        surname: 'Batham'
    });

    return (
        <NoteContext.Provider value={{state, setState}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default noteState;
