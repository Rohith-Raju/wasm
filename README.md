### Emscripten command

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

## Move the generated wasm file to the public folder