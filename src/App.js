import { useEffect, useState } from 'react';
import './App.css';
import createModule from './calculator.mjs'


function App() {
  const [add,setAdd] = useState()
  useEffect(()=>{
    createModule().then((module)=>{
      setAdd(()=>module.cwrap("add","number",["number","number"]))
    })
  },[])
  console.log(add)
  if (!add){
    return "loading wasm"
  }
  return (
    <div className="App">
      add = {add(1,2)}
    </div>
  );
}

export default App;
