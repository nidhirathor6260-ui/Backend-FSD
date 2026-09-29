import {useState} from 'react'

const App = () => {

  const documents=[
    {
      name:"Resume",
      file:"Nidhi-Resume.pdf"
    }
  ]
  return (
    <div>
       <h1>Notes Portal App</h1>
       <input type="text" placeholder='searach notes here' onClick={(e)=>{
            setSearch(e.target.value);
       }} />
       documents.filter().map();
    </div>
  )
}

export default App
