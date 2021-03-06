let matrix = [];

form.onchange = function () {
    document.querySelector('.areas').innerHTML = '';
    matrix = [];
    let
        width = document.querySelector('input[name="width"]').value,
        height = document.querySelector('input[name="height"]').value;

    areas(+(height * width), width, height, width);
    document.querySelector('.result').innerHTML = "Результат: 0";
}

result.onclick = makeArray;

function makeArray() {

    matrix = [];

    let row = document.querySelector('input[name="height"]').value;

    for (let i = 1; i <= row; i++) {

        let array = new Array();

        for (let n of document.querySelectorAll(".area[data-row]")) {

            if (+n.dataset.row == i) {
                array.push(+n.value);
            } else {
                continue;
            }

        }
        matrix.push(array);
    }
    let result = document.querySelector('.result'),
        effect = Determinant(matrix);

    result.innerHTML = "";
    result.innerHTML = isNaN(effect) ? 'Похоже вы ввели не правильную матрицу, или где-то вы ввели не число, пожалуйста проверьте правильность ввода ваших данных' : `Результат: ${effect}`;
}

function areas(size, width, rows, col) {
    let
        row = 1,
        count = col,
        innerCount = 0;

    for (let i = 0; i < size; i++) {

        if (innerCount == count) {
            row++;
            innerCount = 0;
        }

        let area = document.createElement('input');

        area.className = 'area';
        area.dataset.row = row;
        area.style.width = ~~(100 / width - 1) + "%";
        document.querySelector('.areas').append(area);
        innerCount++;

    }
}

function matrixArray(width, height) {
    let
        arr = new Array(),
        count = 1;

    for (let i = 0; i < width; i++) {
        arr[i] = new Array();
        for (let j = 0; j < height; j++) {

            arr[i][j] = 1;
            count++;
        }
    }
    return arr;
}

function InverseMatrix(A) // A - двумерный квадратный массив
{
    var det = Determinant(A); // Функцию Determinant см. выше
    if (det == 0) return false;
    var N = A.length,
        A = AdjugateMatrix(A); // Функцию AdjugateMatrix см. выше
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) A[i][j] /= det;
    }
    return A;
}

function AdjugateMatrix(A) // A - двумерный квадратный массив
{
    var N = A.length,
        adjA = [];
    for (var i = 0; i < N; i++) {
        adjA[i] = [];
        for (var j = 0; j < N; j++) {
            var B = [],
                sign = ((i + j) % 2 == 0) ? 1 : -1;
            for (var m = 0; m < j; m++) {
                B[m] = [];
                for (var n = 0; n < i; n++) B[m][n] = A[m][n];
                for (var n = i + 1; n < N; n++) B[m][n - 1] = A[m][n];
            }
            for (var m = j + 1; m < N; m++) {
                B[m - 1] = [];
                for (var n = 0; n < i; n++) B[m - 1][n] = A[m][n];
                for (var n = i + 1; n < N; n++) B[m - 1][n - 1] = A[m][n];
            }
            adjA[i][j] = sign * Determinant(B); // Функцию Determinant см. выше
        }
    }
    return adjA;
}

function Determinant(A) // Используется алгоритм Барейса, сложность O(n^3)
{
    let N = A.length,
        B = [],
        denom = 1,
        exchanges = 0;
    for (let i = 0; i < N; ++i) {
        B[i] = [];
        for (let j = 0; j < N; ++j) B[i][j] = A[i][j];
    }
    for (let i = 0; i < N - 1; ++i) {
        let maxN = i,
            maxValue = Math.abs(B[i][i]);
        for (let j = i + 1; j < N; ++j) {
            let value = Math.abs(B[j][i]);
            if (value > maxValue) {
                maxN = j;
                maxValue = value;
            }
        }
        if (maxN > i) {
            var temp = B[i];
            B[i] = B[maxN];
            B[maxN] = temp;
            ++exchanges;
        } else {
            if (maxValue == 0) return maxValue;
        }
        var value1 = B[i][i];
        for (var j = i + 1; j < N; ++j) {
            var value2 = B[j][i];
            B[j][i] = 0;
            for (var k = i + 1; k < N; ++k) B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
        }
        denom = value1;
    }
    if (exchanges % 2) return -B[N - 1][N - 1];
    else return B[N - 1][N - 1];
}