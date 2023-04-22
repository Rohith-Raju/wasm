### This branch contains usage of embind to bind a simple function. Used to avoid name-mangling without `extern C`


## C++ Code
```
#include <emscripten/bind.h>

using namespace emscripten;

float lerp(float a, float b, float t) {
    return (1 - t) * a + t * b;
}

EMSCRIPTEN_BINDINGS(my_module) {
    function("lerp", &lerp);
}
```

## Emscripten command
```
emcc --no-entry src/calculator.cpp -o src/calculator.mjs  \
	--pre-js  src/locateFile.js  \
	  -s ENVIRONMENT='web'  \
	  -s EXPORT_NAME='createModule'  \
 	  -s USE_ES6_IMPORT_META=0  \
	  -lembind \
	  -s MODULARIZE=1 \
	  -O3 \
```

## Glue Code
```
useEffect(()=>{
    createModule().then((module)=>{
      setAdd(module.lerp(1,2,3))
    })
  },[])
```


## Output 
[output](output.png)