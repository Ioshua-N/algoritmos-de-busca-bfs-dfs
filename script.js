function bfs(matriz, inicio, final)
{
    // casas vizinhas
    const vizinhos = 
    [
        [-1, 0], [1, 0], [0, -1], [0, 1] // cima baixo esquerda direita (o x e o y são invertidos em matrizes)
    ];

    // tamanho do matriz
    const linhas = matriz.length;
    const colunas = matriz[0].length;

    // cria um array com [posição atual,[caminho até a posição atual a partir do inicio]]
    let fila = [{posicao: inicio, caminho: [inicio]}];

    // cria uma matriz 5x5 preenchida com false em todas as casas para dizer que nenhuma casa da matriz foi visitada até agora
    let visitados = Array.from({length: linhas}, () => Array(colunas).fill(false));

    // marcar a casa inicial como visitada
    visitados[inicio[0]][inicio[1]] = true;

    while (fila.length > 0) // enquanto houverem casas vizinhas a serem exploradas
    {
        let { posicao, caminho } = fila.shift(); // mudar para fila.pop(); vira um método DFS
        // OK

        let [x, y] = posicao;
        // OK

        if (posicao[0] === final[0] && posicao[1] === final[1])
        {
            return caminho; // caminho achado
        }

        for (let [direcaoX, direcaoY] of vizinhos)
        {
            let newX = x + direcaoX;
            let newY = y + direcaoY;

            if(newX >= 0 && newX < linhas && newY >= 0 && newY < colunas && !visitados[newX][newY] && matriz[newX][newY] === 0)
            {
                visitados[newX, newY] = true; // marcar como visitado

                fila.push({posicao: [newX, newY], caminho: [...caminho,[newX, newY]]})
            }
        }
    }

    return []; // se nao achar o caminho
}

const matriz = 
[
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
];

const inicio = [0, 0];
const final = [4, 4];

const caminho = bfs(matriz, inicio, final);

const table = document.getElementById('matrizTable');

// Função para gerar a tabela
function gerarTabela(matriz) 
{
    // Adiciona as linhas à tabela
    matriz.forEach(row => 
    {
        const tr = document.createElement('tr');
        // Adiciona as células à linha
        row.forEach(cell => 
        {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}

// Chama a função para gerar a tabela
gerarTabela(matriz);

console.log(caminho);