import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const board: number[][] =
  new Array(8).fill([]).map(()=>
    new Array(8).fill(0).map(()=>0)
  )
  board[3][3] = -1
  board[4][4] = -1
  board[3][4] = 1
  board[4][3] = 1


  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {
          (function() {
            const col = []
            for(let i:number=0;i<8;i++) {
              const row = [];
              for(let j:number=0;j<8;j++) {
                const stat = board[i][j];
                let col = stat && ( (stat+1) && 'white'  || 'black' ) || 'transparent';
                console.log(col)
                const cell = <div className={styles.cell}>
                  <div className={styles.stonewhite} style={{'background-color':col}} key={i+'_'+j}/>
                </div>
                row.push(cell);

              }
              col.push(<div>{row}</div>)
            }
            return col
          })()
        }
      </div>
    </div>
  );
};
export default Home;
