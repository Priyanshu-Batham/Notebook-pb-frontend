import React from 'react'
import Note from './Note'
import { Flex } from '@radix-ui/themes'
import { useSelector } from 'react-redux'

const NotesContainer = (props) => {
  const notes = useSelector((state)=>{
    return state.notes.notes;
  })

  return (
    <Flex wrap="wrap" style={{marginTop: '50px'}}>
      {notes.map((note)=>{
        return (
          <Note title={note.title} desc={note.description} key={note.noteId} noteId={note.noteId} _id={note._id} showAlert={props.showAlert}/>
        )
      })}
    </Flex>
  )
}

export default NotesContainer
