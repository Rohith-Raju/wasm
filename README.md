### This branch contains interaction between C++ classes and javascript using embind

## C++ Matrix Multiplication code

```
#include <iostream>
#include <vector>
#include <emscripten/bind.h>

using namespace emscripten;

class Matrix
{
private:
    int rows;
    int cols;
    std::vector<int> data;

public:
    Matrix(int rows, int cols) : rows(rows), cols(cols), data(rows * cols, 0) {}

    Matrix(int rows, int cols, const std::vector<int> &values) : rows(rows), cols(cols), data(values) {}

    int getRows()
    {
        return rows;
    }

    int getCols()
    {
        return cols;
    }

    std::vector<int> getData(){
        return data;
    }

    int &operator()(int row, int col)
    {
        return data[row * cols + col];
    }

    int operator()(int row, int col) const
    {
        return data[row * cols + col];
    }

    Matrix multiply(const Matrix &other) const
    {
        if (cols != other.rows)
        {
            throw std::invalid_argument("Matrix dimensions are not compatible for multiplication.");
        }

        Matrix result(rows, other.cols);

        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < other.cols; j++)
            {
                for (int k = 0; k < cols; k++)
                {
                    result(i, j) += (*this)(i, k) * other(k, j);
                }
            }
        }

        return result;
    }

    std::vector<int> answer()
    {
        return this->data;
    }
};

EMSCRIPTEN_BINDINGS(matrix_example)
{
    class_<Matrix>("matrix")
        .constructor<int,int,const std::vector<int>>()
        .function("multiply", &Matrix::multiply)
    register_vector<int>("vect");
}

```

## Emcripten Command

```
emcc --no-entry src/matrix.cpp -o src/matrix.mjs \
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
```

## Matrices
```
        [1 , 2]    X   [1 , 2]    =      [7 , 10]
        [3 , 4]        [3 , 4]           [15 , 22]
```

## Output 
![output](./output.png)