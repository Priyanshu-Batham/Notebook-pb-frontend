import React from 'react'
import Note from './Note'
import { Flex } from '@radix-ui/themes'
import { useSelector } from 'react-redux'

const NotesContainer = () => {
  const notes = useSelector((state)=>{
    return state.notes.notes;
  })

  return (
    <Flex wrap="wrap" style={{marginTop: '50px'}}>
      {notes.map((note, index)=>{
        return (
          <Note title={note.title} desc={note.description} key={index}/>
        )
      })}
    </Flex>
  )
}

export default NotesContainer
