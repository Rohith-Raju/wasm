import { useEffect, useState} from 'react';
import './App.css';
import createModule from './matrix.mjs'


function App() {
  const [data,Setdata] = useState()
  useEffect(()=>{
    createModule().then((module)=>{
     var vect1 = new module.vect()
     vect1.push_back(1)
     vect1.push_back(2)
     vect1.push_back(3)
     vect1.push_back(4)

     var first = new module.matrix(2,2,vect1)

     var vect2 = new module.vect()
     vect2.push_back(1)
     vect2.push_back(2)
     vect2.push_back(3)
     vect2.push_back(4)

     var second = new module.matrix(2,2,vect2)
     
     var result = first.multiply(second)
     Setdata(result.getData())  
    })
  },[])
  if(!data){
    return "loading..."
  }

  return (
    <div className="App">
      <h1>{data.get(0)},{data.get(1)}</h1>
      <h1>
        {data.get(2)},{data.get(3)}
      </h1>
    </div>
  );
}

export default App;
