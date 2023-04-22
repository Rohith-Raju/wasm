import { useEffect, useState } from 'react';
import './App.css';
import createModule from './calculator.mjs'


function App() {
  const [add,setAdd] = useState()
  useEffect(()=>{
    createModule().then((module)=>{
      setAdd(module.lerp(1,2,3))
    })
  },[])
  console.log(typeof add)
  if (!add){
    return "loading wasm"
  }
  return (
    <div className="App">
      <h1>{add}</h1>
    </div>
  );
}

export default App;
