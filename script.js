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
                visitados[newX][newY] = true; // marcar como visitado

                fila.push({posicao: [newX, newY], caminho: [...caminho,[newX, newY]]})
            }
        }
    }

    return 0; // se nao achar o caminho
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

if (caminho !== 0)
{
    caminho.forEach(row => 
    {
        matriz[row[0]][row[1]] = 3; // marca o caminho como 3
    });
}

// marca o inicio e o final
matriz[inicio[0]][inicio[1]] = 2; 
matriz[final[0]][final[1]] = 4;

const table = document.getElementById('matrizTable');

function gerarTabela(matriz) 
{
    table.innerHTML = '';
    matriz.forEach((row, rowIndex) => 
    {
        const tr = document.createElement('tr');

        row.forEach((cell, colIndex) => 
        {
            const td = document.createElement('td');

            td.id = `celula-${rowIndex}-${colIndex}`; // da um id baseado na posicao

            if(cell === 1)
            {
                td.classList.add('parede');
            }
            else if (cell === 2)
            {
                td.classList.add('inicio');
            }
            else if (cell === 3)
            {
                td.classList.add('caminho');
                td.textContent = 'X'
            }
            else if (cell === 4)
            {
                td.classList.add('final');
            }
            else
            {
                td.classList.add('vazio');
            }

            td.addEventListener('click', () =>
            {
                // inverte ao clicar e seta o novo valor na matriz
                if (matriz[rowIndex][colIndex] === 0)
                {
                    matriz[rowIndex][colIndex] = 1;
                    td.classList.remove('vazio');
                    td.classList.add('parede');
                }
                else if (matriz[rowIndex][colIndex] === 1)
                {
                    matriz[rowIndex][colIndex] = 0;
                    td.classList.remove('parede');
                    td.classList.add('vazio');
                }
                else if (matriz[rowIndex][colIndex] === 3)
                {
                    matriz[rowIndex][colIndex] = 1;
                    td.classList.remove('caminho');
                    td.classList.add('parede');
                }

                // remove os caminhos antigos
                for (let i = 0; i < matriz.length; i++) 
                {
                    for (let j = 0; j < matriz[i].length; j++) 
                    {
                        if (matriz[i][j] !== 1) 
                        {
                            matriz[i][j] = 0;
                        }
                    }
                }

                const novoCaminho = bfs(matriz, inicio, final);

                if (novoCaminho !== 0)
                {
                    novoCaminho.forEach(row => 
                    {
                        matriz[row[0]][row[1]] = 3; // marca o caminho como 3
                    });
                }

                matriz[inicio[0]][inicio[1]] = 2; 
                matriz[final[0]][final[1]] = 4; 

                gerarTabela(matriz);

                //console.log(novoCaminho);
                //console.log(matriz);
            });

            tr.appendChild(td);
        });
        
        table.appendChild(tr);
    });
}

gerarTabela(matriz); // chama a primeira tabela