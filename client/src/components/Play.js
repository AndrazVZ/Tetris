// Play.js
import React, { useEffect } from "react";
import "./Play.css";



const Play = () => {
    useEffect(() => {
        const board = document.querySelector('.board');
        const cells = Array.from(board.children);
        const width = 10;

        const miniBoard = document.querySelector('.next-block');
        const miniCells = Array.from(miniBoard.children);

        function displayNextShape(){
            var shapeClass;
            var shapeIndexes;
            switch(nextRandom){
                case 0:
                    shapeClass = 'l-shape';
                    shapeIndexes = [1, 5, 9, 10];
                    break;
                case 1:
                    shapeClass = 'j-shape';
                    shapeIndexes = [1, 5, 9, 8];
                    break;
                case 2:
                    shapeClass = 'z-shape';
                    shapeIndexes = [0, 1, 5, 6];
                    break;
                case 3:
                    shapeClass = 's-shape';
                    shapeIndexes = [1, 2, 4, 5];
                    break;
                case 4: 
                    shapeClass = 't-shape';
                    shapeIndexes = [1, 4, 5, 6];
                    break;
                case 5:
                    shapeClass = 'square-shape';
                    shapeIndexes = [1, 2, 5, 6];
                    break;
                case 6:
                    shapeClass = 'line-shape';
                    shapeIndexes = [1, 5, 9, 13];
                    break;
                default:
                    shapeClass = 'active';
                    shapeIndexes = [];
                    break;
            }

            
            miniCells.forEach(cell =>{
                cell.className = '';
                cell.className = 'mini-cell';
            });
            

            shapeIndexes.forEach(index => {
                miniCells[index].classList.add('active');
                miniCells[index].classList.add(shapeClass);
            });
        }


        let currentPosition = 4;
        const L_SHAPE = [
            currentPosition, 
            currentPosition + width, 
            currentPosition + width * 2, 
            currentPosition + 1 + width * 2
        ];

        const J_SHAPE = [
            currentPosition,
            currentPosition + width, 
            currentPosition + width * 2, 
            currentPosition - 1 + width * 2
        ];

        const Z_SHAPE = [
            currentPosition,
            currentPosition + 1,
            currentPosition + 1 + width,
            currentPosition + 2 + width
        ];

        const S_SHAPE = [
            currentPosition,
            currentPosition - 1,
            currentPosition - 1 + width,
            currentPosition - 2 + width
        ];

        const T_SHAPE = [
            currentPosition,
            currentPosition - 1+ width,
            currentPosition + width,
            currentPosition + 1+ width
            
        ];

        const SQUARE = [
            currentPosition,
            currentPosition + 1,
            currentPosition + width,
            currentPosition + 1 + width
        ];

        const LINE = [
            currentPosition,
            currentPosition + width,
            currentPosition + 2 * width,
            currentPosition + 3 * width
        ];
        
        const shapes = [L_SHAPE,J_SHAPE,Z_SHAPE,S_SHAPE,T_SHAPE,SQUARE,LINE];
        let random = Math.floor(Math.random() * shapes.length);
        let nextRandom = Math.floor(Math.random() * shapes.length);
        
        let currentShape = shapes[random];

        let rotation=0;
        
        displayNextShape();




        function draw() {
            currentShape.forEach(index => {
                switch(random){ //Check what index did it choose and then give it a correct color for that shape
                    case 0:
                        cells[index].classList.add('active');
                        cells[index].classList.add('l-shape');
                        break;
                    case 1:
                        cells[index].classList.add('active');
                        cells[index].classList.add('j-shape');
                        break;
                    case 2:
                        cells[index].classList.add('active');
                        cells[index].classList.add('z-shape');
                        break;
                    case 3:
                        cells[index].classList.add('active');
                        cells[index].classList.add('s-shape');
                        break;
                    case 4: 
                        cells[index].classList.add('active');
                        cells[index].classList.add('t-shape');
                        break;
                    case 5:
                        cells[index].classList.add('active');
                        cells[index].classList.add('square-shape');
                        break;
                    case 6:
                        cells[index].classList.add('active');
                        cells[index].classList.add('line-shape');
                        break;
                    default:
                        cells[index].classList.add('active');
                        break;
                }
            });
        }
        
        function undraw() {
            var shapeClassRemove;
            switch(random){
                case 0:
                    shapeClassRemove ='l-shape';
                    break;
                case 1:
                    shapeClassRemove ='j-shape';
                    break;
                case 2:
                    shapeClassRemove = 'z-shape';
                    break;
                case 3:
                    shapeClassRemove = 's-shape';
                    break;
                case 4: 
                    shapeClassRemove = 't-shape';
                    break;
                case 5:
                    shapeClassRemove = 'square-shape';
                    break;
                case 6:
                    shapeClassRemove = 'line-shape';
                    break;
                default:
                    shapeClassRemove = 'active';
                    break;
            }

            currentShape.forEach(index => {
                cells[index].classList.remove('active');
                cells[index].classList.remove(shapeClassRemove);
            });
        }
        
        function moveDown() {
            //.some() checks if any of the cells in the shape are going over the board
            const atBottom = currentShape.some(index => index + width >= cells.length);
            if (!atBottom) {
                //Check if any *bottom block* is blocked by another shape
                const blockedByAnotherShape = currentShape.some(index => {
                    //Only check if there is NO other block of currentShape directly below this block
                    const isBottomBlock = !currentShape.includes(index + width);
                    if (isBottomBlock) {
                        return cells[index + width] && cells[index + width].classList.contains('active');
                    }
                    return false;
                });
                if(!blockedByAnotherShape){
                    undraw();
                    currentPosition += width;
                    currentShape = currentShape.map(index => index + width);
                    draw();
                }else{
                    getNewShape();
                }
            } else {
                getNewShape();
            }
        }
        
        draw();

        function moveLeft() {
            const atLeftWall = currentShape.some(index => index % width === 0);
        
            if (!atLeftWall) {
                undraw();
        
                const blockedByAnotherShape = currentShape.some(index => {
                    return cells[index - 1] && cells[index - 1].classList.contains('active');
                });
        
                if (!blockedByAnotherShape) {
                    currentPosition -= 1;
                    currentShape = currentShape.map(index => index - 1);
                }
        
                draw();
            }
        }
        
        

        function moveRight(){
            const atRightWall = currentShape.some(index => index % width === 9);
        
            if (!atRightWall) {
                undraw();
        
                const blockedByAnotherShape = currentShape.some(index => {
                    return cells[index + 1] && cells[index + 1].classList.contains('active');
                });
        
                if (!blockedByAnotherShape) {
                    currentPosition += 1;
                    currentShape = currentShape.map(index => index + 1);
                }
        
                draw();
            }
        }

        function getNewShape(){
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * shapes.length);
            currentPosition = 4;
            currentShape = shapes[random];
            rotation=0;
            draw();
            displayNextShape();
        }

        let timer = setInterval(moveDown, 1000000);

        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(moveDown, 1000000);
        }
        
        function rotate(){
            let atLeftWall;
            let atRightWall;
            let blockedByAnotherShape;
            let shapeCopy;
            switch(random){ 
                case 0:  // L shape
                    atLeftWall = currentShape.some(index => index % width === 0);
                    atRightWall = currentShape.some(index => index % width === 9);
                    shapeCopy = [...currentShape];
                    
                    undraw();
                    if(atLeftWall){
                        currentPosition += 1;
                        currentShape = currentShape.map(index => index + 1);
                    }
                    if(atRightWall){
                        currentPosition -= 1;
                        currentShape = currentShape.map(index => index - 1);
                    }
                    
                    switch(rotation){
                        case 0:  // 0 -> 1
                        shapeCopy[0] = currentPosition + 2 -1 + width;
                        shapeCopy[1] = currentPosition +1 -1 +width;
                        shapeCopy[2] = currentPosition - 1 * width;
                        shapeCopy[3] = currentPosition + 2*width -1;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                
                                currentShape[0]=currentPosition + 2 -1 +width;
                                currentShape[1]=currentPosition + 1 -1 +width;
                                currentShape[2]=currentPosition -1 +width;
                                currentShape[3]=currentPosition + width -1 +width;
                                rotation++;
                            }
                            break;
                        case 1:  // 1 -> 2
                            shapeCopy[0]=currentPosition + 2 * width;
                            shapeCopy[1]=currentPosition + width;
                            shapeCopy[2]=currentPosition;
                            shapeCopy[3]=currentPosition - 1;
                            
                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                              
                                currentShape[0]=currentPosition + 2 * width;
                                currentShape[1]=currentPosition + width;
                                currentShape[2]=currentPosition;
                                currentShape[3]=currentPosition - 1;
                                rotation++;
                            }
                            break;
                        case 2: // 2 -> 3
                            shapeCopy[0]=currentPosition + width -1;
                            shapeCopy[1]=currentPosition + width;
                            shapeCopy[2]=currentPosition + 1 + width;
                            shapeCopy[3]=currentPosition + 1;
                            
                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0]=currentPosition + width -1;
                                currentShape[1]=currentPosition + width;
                                currentShape[2]=currentPosition + 1 + width;
                                currentShape[3]=currentPosition + 1;
                                rotation++;
                            }
                            break;
                        case 3: // 3 -> 0
                            shapeCopy[0]=currentPosition;
                            shapeCopy[1]=currentPosition + width;
                            shapeCopy[2]=currentPosition + 2 * width;
                            shapeCopy[3]=currentPosition + 2 * width + 1;
                            
                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0]=currentPosition;
                                currentShape[1]=currentPosition + width;
                                currentShape[2]=currentPosition + 2 * width;
                                currentShape[3]=currentPosition + 2 * width + 1;
                                rotation=0;
                            }
                            break;
                    }
                    draw();
                    break;
                case 4:  // T shape
                    atLeftWall = (currentShape[2] % width === 0)
                    atRightWall = (currentShape[2] % width === 9)
                    shapeCopy = [...currentShape];
                    
                    undraw();
                    if(atLeftWall){
                        currentPosition += 1;
                        currentShape = currentShape.map(index => index + 1);
                    }
                    if(atRightWall){
                        currentPosition -= 1;
                        currentShape = currentShape.map(index => index - 1);
                    }
                    
                    switch(rotation){
                        case 0:  // 0 -> 1
                        shapeCopy[0] = currentPosition + 1 + width;
                        shapeCopy[1] = currentPosition;
                        shapeCopy[2] = currentPosition + width;
                        shapeCopy[3] = currentPosition + 2*width;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0]=currentPosition + 1 + width;
                                currentShape[1]=currentPosition;
                                currentShape[2]=currentPosition + width;
                                currentShape[3]=currentPosition + 2*width;
                                rotation++;
                            }
                            break;
                        case 1:  // 1 -> 2
                            shapeCopy[0] = currentPosition + 2 * width;
                            shapeCopy[1] = currentPosition + 1 + width;
                            shapeCopy[2] = currentPosition + width;
                            shapeCopy[3] = currentPosition - 1 + width;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0]=currentPosition + 2 * width;
                                currentShape[1]=currentPosition + 1 + width;
                                currentShape[2]=currentPosition + width;
                                currentShape[3]=currentPosition - 1 + width;
                                rotation++;
                            }
                            break;
                        case 2:  // 2 -> 3
                            shapeCopy[0] = currentPosition -1 + width;
                            shapeCopy[1] = currentPosition;
                            shapeCopy[2] = currentPosition + width;
                            shapeCopy[3] = currentPosition + 2 * width;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0]=currentPosition -1 + width;
                                currentShape[1]=currentPosition;
                                currentShape[2]=currentPosition + width;
                                currentShape[3]=currentPosition + 2 * width;
                                rotation++;
                            }
                            break;
                        case 3:  // 3 -> 0
                            shapeCopy[0] = currentPosition;
                            shapeCopy[1] = currentPosition -1 + width;
                            shapeCopy[2] = currentPosition + width;
                            shapeCopy[3] = currentPosition + 1 + width;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0]=currentPosition;
                                currentShape[1]=currentPosition - 1 + width;
                                currentShape[2]=currentPosition + width;
                                currentShape[3]=currentPosition + 1 + width;
                                rotation=0;
                            }
                            break;
                    }
                    draw();
                    break;  
            }
        }
        

        //TODO: Change to user set keybinds
        document.addEventListener('keydown', (e)=>{
            if(e.key === 'ArrowLeft'){
                moveLeft();
            }else if(e.key === 'ArrowRight'){
                moveRight();
            }else if(e.key === 'ArrowDown'){
                moveDown(); 
                resetTimer();
            }
            else if(e.key === 'ArrowUp'){
                rotate();
            }
        });
        
        

        return () => clearInterval(timer); //Cleanup on unmount
    }, []);

    return (
        <div className="container col">
            <header className="game-page-header">
                <div className="left"><i className="fa-solid fa-arrow-left"></i></div>
                <div><h2>TETRIS</h2></div>
                <div className="right"><i className="fa-solid fa-gear"></i></div>
            </header>
            <div className="game-container">
                <div className="board"> 
                    {Array.from({ length: 200 }).map((_, i) => (
                        <div key={i} className="board-cell" />
                    ))}
                </div>
                <div className="sidebar">
                    <div className="next-block-container">
                        <p>Next</p>
                        <div className="next-block">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="mini-cell" />
                        ))}
                        </div>
                    </div>
                    <div className="hold-block-container">
                        <p>Hold</p>
                    </div>
                    <div className="score-container">
                        <p>Score</p>
                        <h2>0</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Play;
