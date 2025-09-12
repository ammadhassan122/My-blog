import React from 'react'
import { Container,PostForm } from '../../../components'
function AddPost() {
  return (
    <div className=' min-h-screen z-50 flex justify-center items-center pt-30 pb-10'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost