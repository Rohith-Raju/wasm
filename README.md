# Usage of  extern "C" to prevent C++ name mangling and ensure that your functions are exported with their original names.
## C++ code 
```
#include <emscripten/emscripten.h>


extern "C" {

EMSCRIPTEN_KEEPALIVE int add(int a,int b){
    return a+b;
}

}
```

## Emscripten command

```
emcc --no-entry src/calculator.cpp -o src/calculator.mjs  \
	--pre-js  src/locateFile.js  \
	  -s ENVIRONMENT='web'  \
	  -s EXPORT_NAME='createModule'  \
	  -s USE_ES6_IMPORT_META=0  \
	  -s EXPORTED_FUNCTIONS='["_add"]'  \
	  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'  \
	  -O3
```

### Glue Code
```
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
```
## Output 
![output](output.png)