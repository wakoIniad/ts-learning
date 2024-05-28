import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const _ = new Array(8).fill([]).map(()=>
    new Array(8).fill(0).map(()=>0)
  );
  _[3][3] = -1
  _[4][4] = -1
  _[3][4] = 1
  _[4][3] = 1
  const [board,setBoard] = useState(_);

  const [turnColor,setTurnColor] = useState(-1);



  function putChecker(x:number,y:number) {
    if(board[x][y])return false;
    const color = turnColor;
    let result = 0;
    for(var i = -1;i <= 1;i ++) {
      for(var j = -1;j <= 1;j ++) {
        if(i || j) {
          let c = 0;//
          let [posX,posY] = [x,y];
          while(board[posX+=i] && board[posX][posY+=j]) {
            if(board[posX][posY] === color) {
              result ||= c;
              break;
            }
            c++;//
          }
        }
      }
    }
    return result;
  }

  function clicked(x:number,y:number) {
    if(putChecker(x,y)) {
      const copiedBoard = structuredClone(board);//DeepCopy
      copiedBoard[x][y] = turnColor
      setBoard(copiedBoard)
      setTurnColor(turnColor*-1);
    }
  }

  function mouseovered() {
    
  }


  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {
          (function() {
            const col = []
            for(let x:number=0;x<8;x++) {
              const row = [];
              for(let y:number=0;y<8;y++) {
                const stat = board[x][y];
                let col = stat && ( (stat+1) && 'white'  || 'black' ) ||
                putChecker(x,y) && 'rgba(255,255,255,0.5)' || 'transparent';
                const cell = <div className={styles.cell}>
                  <div className={styles.stonewhite} style={{backgroundColor:col}} key={x+'_'+y}
                  onClick={ ()=>clicked(x,y) } onMouseOver={ ()=mouseovered(x,y) }/>
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
