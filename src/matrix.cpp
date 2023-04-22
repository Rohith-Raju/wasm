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
};

EMSCRIPTEN_BINDINGS(matrix_example)
{
    class_<Matrix>("matrix")
        .constructor<int,int,const std::vector<int>>()
        .function("multiply", &Matrix::multiply)
    
    register_vector<int>("vect");
}