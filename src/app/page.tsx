"use client";

import { useEffect, useRef, useState } from "react";

const width = 800;
const height = 800;
const cell_size = 10;

const num_rows = Math.floor(width / cell_size);
const num_cols = Math.floor(height / cell_size);

const colors = ["black", "white"]

type Board = number[][];
function createBoard() : Board {
  return Array.from({length: num_rows}, ()=> new Array(num_rows).fill(0));
}




export default function Home() {
  const initialBoard = createBoard();
  const [boardState, setBoardState] = useState<Board>(initialBoard);

  const canvasRef = useRef<null | HTMLCanvasElement>(null);


  useEffect(() => {
    if(canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if(!ctx) return;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "gray";
      ctx.lineWidth = 0.1;




      for(let r = 0; r < num_rows; ++r) {
        for(let c = 0; c < num_cols; ++c) {
          ctx.fillStyle = colors[boardState[r][c]];
          
          
          ctx.fillRect(
            Math.floor((width / num_rows) * r), 
            Math.floor((height / num_cols) * c), 
            cell_size, 
            cell_size
          );
          
          ctx.strokeRect(
            Math.floor((width / num_rows) * r), 
            Math.floor((height / num_cols) * c), 
            cell_size, 
            cell_size
          );
        }
      }

    }

  }, [boardState, canvasRef])


  function computeNextBoard() {
    
  }
  






  return (
    <div>
      <header>
        <h1>Game of Life</h1>
        <div>
          <button onClick={computeNextBoard}>Next</button>
        </div>
      </header>

      <main>
        <canvas 
          onClick={(e)=> {
            const x = Math.floor(e.nativeEvent.offsetX / cell_size);
            const y = Math.floor(e.nativeEvent.offsetY / cell_size);
            

            let updatedBoardState = [...boardState]
            if (updatedBoardState[x][y] === 0) {
              updatedBoardState[x][y] = 1
            } else {
              updatedBoardState[x][y] = 0

            }
            setBoardState(updatedBoardState);


            
          }}
          ref={canvasRef}
          width={width} 
          height={height}
          className="board" 
        ></canvas>
      </main>
    </div>
  );
}
