// Play.js
import React, { useEffect } from "react";
import "./Play.css";
import Header from './Header';



const Play = () => {
    useEffect(() => {
        const board = document.querySelector('.board');
        const cells = Array.from(board.children);
        const width = 10;
        const DROP_INTERVAL = 1000;

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

        const miniBoardHold = document.querySelector('.hold-block');
        const miniCellsHold = Array.from(miniBoardHold.children);

        function displayHeldShape(){
            var shapeClass;
            var shapeIndexes;
            switch(savedShape){
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
                case null:
                    shapeClass = 'active';
                    shapeIndexes = [];
                    break;
                default:
                    shapeClass = 'active';
                    shapeIndexes = [];
                    break;
            }

            
            miniCellsHold.forEach(cell =>{
                cell.className = '';
                cell.className = 'mini-cell';
            });
            

            shapeIndexes.forEach(index => {
                miniCellsHold[index].classList.add('active');
                miniCellsHold[index].classList.add(shapeClass);
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
        let currentScore = 0;
        const scoreElement = document.getElementById('current-score');
        let currentShape = shapes[random];
        let shapeProjection = currentShape;
        let savedShape=null;
        let tmpHold=null;
        let canHold=true;

        let rotation=0;
        updateScoreElement();

        displayNextShape();

        function updateScoreElement(){
            scoreElement.innerHTML = currentScore;
        }

        function hold(){
            if(canHold) //checks if it can hold shape
            {
                canHold=false; //disables the hold function until new shape is placed
                undraw();
                var projectionClassRemove;
                switch(random){
                    case 0:
                        projectionClassRemove ='projection-l';
                        break;
                    case 1:
                        projectionClassRemove ='projection-j';
                        break;
                    case 2:
                        projectionClassRemove = 'projection-z';
                        break;
                    case 3:
                        projectionClassRemove = 'projection-s';
                        break;
                    case 4: 
                    projectionClassRemove = 'projection-t';
                        break;
                    case 5:
                        projectionClassRemove = 'projection-square';
                        break;
                    case 6:
                        projectionClassRemove = 'projection-line';
                        break;
                    default:
                        break;
                }

                shapeProjection.forEach(index => {
                    cells[index].classList.remove(projectionClassRemove);
                });

                if(savedShape===null){ //when no shape is held
                    savedShape=random;  //saves the current shape
                    displayHeldShape();
                    getNewShape();
                    tmpHold=0;
                }else {
                    tmpHold=savedShape;
                    savedShape=random;
                    currentShape=[...shapes[tmpHold]]; //swiches current shape and the held shape
                    random=tmpHold;
                    currentPosition = 4;
                    rotation=0;
                    shapeProjection = [...currentShape];
                    displayHeldShape();
                    draw();
                }
            }
        }


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
            drawShapeProjection();
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
            const overlapWithProjection = currentShape.filter(index => shapeProjection.includes(index));
            if (overlapWithProjection.length > 0) {
                overlapWithProjection.forEach(value => {
                    cells[value].classList.forEach(cls => {
                        if (cls.startsWith('projection-')) {
                            cells[value].classList.remove(cls);
                        }
                    });
                });
            }
        }

        function drop() {       
            undraw();
            while (true) { //Continuously drops the shape until it hits bottom or another shape
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
                        currentPosition += width;
                        currentShape = currentShape.map(index => index + width);
                    }else{
                        break;
                    }
                } else{
                    break;
                }
            }
            
            draw();
            const overlapWithProjection = currentShape.filter(index => shapeProjection.includes(index));
            if (overlapWithProjection.length > 0) {
                overlapWithProjection.forEach(value => {
                    cells[value].classList.forEach(cls => {
                        if (cls.startsWith('projection-')) {
                            cells[value].classList.remove(cls);
                        }
                    });
                });
            }
            getNewShape();
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
                const overlapWithProjection = currentShape.filter(index => shapeProjection.includes(index));
                if (overlapWithProjection.length > 0) {
                    overlapWithProjection.forEach(value => {
                        cells[value].classList.forEach(cls => {
                            if (cls.startsWith('projection-')) {
                                //console.log(cls);
                                cells[value].classList.remove(cls);
                            }
                        });
                    });
                }
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
                const overlapWithProjection = currentShape.filter(index => shapeProjection.includes(index));
                if (overlapWithProjection.length > 0) {
                    overlapWithProjection.forEach(value => {
                        cells[value].classList.forEach(cls => {
                            if (cls.startsWith('projection-')) {
                                //console.log(cls);
                                cells[value].classList.remove(cls);
                            }
                        });
                    });
                }
            }
        }

        function getNewShape(){
            if(!cells[4].classList.contains("active"))
            {
                currentShape=null;
                checkForFullRow(); //Async animation?
                random = nextRandom;
                nextRandom = Math.floor(Math.random() * shapes.length);
                currentPosition = 4;
                rotation=0;
                currentShape = [...shapes[random]]; 
                shapeProjection = [...currentShape];
                draw();
                displayNextShape();
                if(tmpHold != null)
                {
                    canHold=true; //enables the hold function
                }
            }
            else {
                console.log("endgame");
                clearInterval(timer);
                //call pop-up
            }
        }

        function drawShapeProjection(){
            var projectionClassRemove;
            switch(random){
                case 0:
                    projectionClassRemove ='projection-l';
                    break;
                case 1:
                    projectionClassRemove ='projection-j';
                    break;
                case 2:
                    projectionClassRemove = 'projection-z';
                    break;
                case 3:
                    projectionClassRemove = 'projection-s';
                    break;
                case 4: 
                projectionClassRemove = 'projection-t';
                    break;
                case 5:
                    projectionClassRemove = 'projection-square';
                    break;
                case 6:
                    projectionClassRemove = 'projection-line';
                    break;
                default:
                    break;
            }

            shapeProjection.forEach(index => {
                cells[index].classList.remove(projectionClassRemove);
            });

            shapeProjection = currentShape;
            while (true) { //Continuously drops the shape until it hits bottom or another shape
                const atBottom = shapeProjection.some(index => index + width >= cells.length);
                if (!atBottom) {
                    //Check if any *bottom block* is blocked by another shape
                    const blockedByAnotherShape = shapeProjection.some(index => {
                        //Only check if there is NO other block of currentShape directly below this block
                        const isBottomBlock = !shapeProjection.includes(index + width);
                        if (isBottomBlock) {
                            return cells[index + width] && cells[index + width].classList.contains('active');
                        }
                        return false;
                    });
                    if(!blockedByAnotherShape){
                        //currentPosition += width;
                        shapeProjection = shapeProjection.map(index => index + width);
                    }else{
                        break;
                    }
                } else{
                    break;
                }
            }

            shapeProjection.forEach(index => {
                switch(random){ //Check what index did it choose and then give it a correct color for that shape
                    case 0:
                        cells[index].classList.add('projection-l');
                        break;
                    case 1:
                        cells[index].classList.add('projection-j');
                        break;
                    case 2:
                        cells[index].classList.add('projection-z');
                        break;
                    case 3:
                        cells[index].classList.add('projection-s');
                        break;
                    case 4: 
                        cells[index].classList.add('projection-t');
                        break;
                    case 5:
                        cells[index].classList.add('projection-square');
                        break;
                    case 6:
                        cells[index].classList.add('projection-line');
                        break;
                    default:
                        break;
                }
            });
        }

        let timer = setInterval(moveDown, DROP_INTERVAL);

        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(moveDown, DROP_INTERVAL);
        }
        
        function rotate(){
            let atLeftWall;
            let atRightWall;
            let blockedByAnotherShape;
            let shapeCopy;
            switch(random){ 
                case 0:  // L shape
                    atLeftWall = (currentShape[1] % width === 0)
                    atRightWall = (currentShape[1] % width === 9)
                    shapeCopy = [...currentShape];
                    undraw();
                    if(atLeftWall){
                        blockedByAnotherShape = currentShape.some(index => {
                            return cells[index+1] && cells[index+1].classList.contains('active');
                        });
                        if(!blockedByAnotherShape){
                            currentPosition += 1;
                            currentShape = currentShape.map(index => index + 1);
                        }
                        else {
                            draw();
                            break;
                        }
                    }
                    if(atRightWall){
                        blockedByAnotherShape = currentShape.some(index => {
                            return cells[index-1] && cells[index-1].classList.contains('active');
                        });
                        if(!blockedByAnotherShape){
                            currentPosition -= 1;
                            currentShape = currentShape.map(index => index - 1);
                        }
                        else {
                            draw();
                            break;
                        }
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
                case 1:  // J shape
                    atLeftWall = (currentShape[1] % width === 0)
                    atRightWall = (currentShape[1] % width === 9)
                    shapeCopy = [...currentShape];
                    
                    undraw();
                    if(atLeftWall){
                        blockedByAnotherShape = currentShape.some(index => {
                            return cells[index+1] && cells[index+1].classList.contains('active');
                        });
                        if(!blockedByAnotherShape){
                            currentPosition += 1;
                            currentShape = currentShape.map(index => index + 1);
                        }
                        else {
                            draw();
                            break;
                        }
                    }
                    if(atRightWall){
                        blockedByAnotherShape = currentShape.some(index => {
                            return cells[index-1] && cells[index-1].classList.contains('active');
                        });
                        if(!blockedByAnotherShape){
                            currentPosition -= 1;
                            currentShape = currentShape.map(index => index - 1);
                        }
                        else {
                            draw();
                            break;
                        }
                    }
                    switch(rotation){
                        case 0:  // 0 -> 1
                            shapeCopy[0] = currentPosition + 1 + width;
                            shapeCopy[1] = currentPosition + width;
                            shapeCopy[2] = currentPosition - 1 + width;
                            shapeCopy[3] = currentPosition - 1;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                
                                currentShape[0]=currentPosition + 1 + width;
                                currentShape[1]=currentPosition + width;
                                currentShape[2]=currentPosition -1 + width;
                                currentShape[3]=currentPosition - 1;
                                rotation++;
                            }
                            break;
                        case 1:  // 1 -> 2
                            shapeCopy[0] = currentPosition + 2 * width;
                            shapeCopy[1] = currentPosition + width;
                            shapeCopy[2] = currentPosition;
                            shapeCopy[3] = currentPosition + 1;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                
                                currentShape[0]=currentPosition + 2 * width;
                                currentShape[1]=currentPosition + width;
                                currentShape[2]=currentPosition;
                                currentShape[3]=currentPosition + 1;
                                rotation++;
                            }
                            break;
                        case 2:  // 2 -> 3
                            shapeCopy[0] = currentPosition - 1 + width;
                            shapeCopy[1] = currentPosition + width;
                            shapeCopy[2] = currentPosition + 1 + width;
                            shapeCopy[3] = currentPosition + 1 + 2 * width;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                
                                currentShape[0]=currentPosition - 1 + width;
                                currentShape[1]=currentPosition + width;
                                currentShape[2]=currentPosition + 1 + width;
                                currentShape[3]=currentPosition + 1 + 2 * width;
                                rotation++;
                            }
                            break;
                        case 3:  // 3 -> 0
                            shapeCopy[0] = currentPosition;
                            shapeCopy[1] = currentPosition + width;
                            shapeCopy[2] = currentPosition + 2 * width;
                            shapeCopy[3] = currentPosition - 1 + 2* width;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                
                                currentShape[0]=currentPosition;
                                currentShape[1]=currentPosition + width;
                                currentShape[2]=currentPosition + 2 * width;
                                currentShape[3]=currentPosition - 1 + 2 * width;
                                rotation=0;
                            }
                            break;
                    }
                    draw();
                    break;
                case 2:  // Z shape
                    if(currentPosition <= 9){
                        return;
                    }
                    atRightWall = (currentShape[1] % width === 9);
                    shapeCopy = [...currentShape];
                    
                    undraw();
                    if(atRightWall){
                        blockedByAnotherShape = currentShape.some(index => {
                            return cells[index-1] && cells[index-1].classList.contains('active');
                        });
                        if(!blockedByAnotherShape){
                            currentPosition -= 1;
                            currentShape = currentShape.map(index => index - 1);
                        }
                        else {
                            draw();
                            break;
                        }
                    }

                    switch(rotation){
                        case 0: // 0 -> 1
                            shapeCopy[0] = currentPosition + 1 - width;
                            shapeCopy[1] = currentPosition + 1;
                            shapeCopy[2] = currentPosition;
                            shapeCopy[3] = currentPosition + width;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0] = currentPosition + 1 - width;
                                currentShape[1] = currentPosition + 1;
                                currentShape[2] = currentPosition;
                                currentShape[3] = currentPosition + width;
                                rotation++;
                            }
                            break; 
                        case 1:
                            shapeCopy[0] = currentPosition;
                            shapeCopy[1] = currentPosition + 1;
                            shapeCopy[2] = currentPosition + width + 1;
                            shapeCopy[3] = currentPosition + width +2;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0] = currentPosition;
                                currentShape[1] = currentPosition + 1;
                                currentShape[2] = currentPosition + width + 1;
                                currentShape[3] = currentPosition + width +2;
                                rotation = 0;
                            }
                            break;
                        
                    }
                    draw();
                    break;
                case 3:  // S shape
                    if(currentPosition <= 9){
                        return;
                    }
                    atRightWall = (currentShape[1] % width === 9);
                    shapeCopy = [...currentShape];
                    
                    undraw();
                    if(atRightWall){
                        blockedByAnotherShape = currentShape.some(index => {
                            return cells[index-1] && cells[index-1].classList.contains('active');
                        });
                        if(!blockedByAnotherShape){
                            currentPosition -= 1;
                            currentShape = currentShape.map(index => index - 1);
                        }
                        else {
                            draw();
                            break;
                        }
                    }

                    switch(rotation){
                        case 0: // 0 -> 1
                            shapeCopy[0] = currentPosition - 1 + width;
                            shapeCopy[1] = currentPosition - 1;
                            shapeCopy[2] = currentPosition - 2;
                            shapeCopy[3] = currentPosition - 2 - width;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0] = currentPosition - 1 + width;
                                currentShape[1] = currentPosition - 1;
                                currentShape[2] = currentPosition - 2;
                                currentShape[3] = currentPosition - 2 - width;
                                rotation++;
                            }
                            break; 
                        case 1:
                            shapeCopy[0] = currentPosition;
                            shapeCopy[1] = currentPosition - 1;
                            shapeCopy[2] = currentPosition + width - 1;
                            shapeCopy[3] = currentPosition + width -2;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0] = currentPosition;
                                currentShape[1] = currentPosition - 1;
                                currentShape[2] = currentPosition + width - 1;
                                currentShape[3] = currentPosition + width -2;
                                rotation = 0;
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
                        blockedByAnotherShape = currentShape.some(index => {
                            return cells[index+1] && cells[index+1].classList.contains('active');
                        });
                        if(!blockedByAnotherShape){
                            currentPosition += 1;
                            currentShape = currentShape.map(index => index + 1);
                        }
                        else {
                            draw();
                            break;
                        }
                    }
                    if(atRightWall){
                        blockedByAnotherShape = currentShape.some(index => {
                            return cells[index-1] && cells[index-1].classList.contains('active');
                        });
                        if(!blockedByAnotherShape){
                            currentPosition -= 1;
                            currentShape = currentShape.map(index => index - 1);
                        }
                        else {
                            draw();
                            break;
                        }
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
                case 6:  // I shape
                    atLeftWall = (currentShape[2] % width === 0)
                    atRightWall = (currentShape[2] % width === 9)
                    shapeCopy = [...currentShape];
                    
                    undraw();
                    if(atLeftWall && rotation!==2){
                        blockedByAnotherShape = currentShape.some(index => {
                            return cells[index+1] && cells[index+1].classList.contains('active');
                        });
                        if(!blockedByAnotherShape){
                            currentPosition += 1;
                            currentShape = currentShape.map(index => index + 1);
                        }
                        else {
                            draw();
                            break;
                        }
                    }
                    else if(atLeftWall && rotation===2)
                    {   
                        blockedByAnotherShape = currentShape.some(index => {
                            return cells[index+2] && cells[index+2].classList.contains('active');
                        });
                        if(!blockedByAnotherShape){
                            currentPosition += 2;
                            currentShape = currentShape.map(index => index + 2);
                        }
                        else {
                            draw();
                            break;
                        }
                    }
                    if(atRightWall && rotation!==0){
                        blockedByAnotherShape = currentShape.some(index => {
                            return cells[index-1] && cells[index-1].classList.contains('active');
                        });
                        if(!blockedByAnotherShape){
                            currentPosition -= 1;
                            currentShape = currentShape.map(index => index - 1);
                        }
                        else {
                            draw();
                            break;
                        }
                    }
                    else if(atRightWall && rotation===0)
                    {
                        blockedByAnotherShape = currentShape.some(index => {
                            return cells[index-2] && cells[index-2].classList.contains('active');
                        });
                        if(!blockedByAnotherShape){
                            currentPosition -= 2;
                            currentShape = currentShape.map(index => index - 2);
                        }
                        else {
                            draw();
                            break;
                        }   
                    }
                    switch(rotation){
                        case 0:  // 0 -> 1
                            shapeCopy[0] = currentPosition + 2 + width;
                            shapeCopy[1] = currentPosition + 1 + width;
                            shapeCopy[2] = currentPosition + width;
                            shapeCopy[3] = currentPosition - 1 + width;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0]=currentPosition + 2 + width;
                                currentShape[1]=currentPosition + 1 + width;
                                currentShape[2]=currentPosition + width;
                                currentShape[3]=currentPosition - 1 + width;
                                rotation++;
                            }
                            break;
                        case 1:  // 1 -> 2
                            shapeCopy[0] = currentPosition + 1;
                            shapeCopy[1] = currentPosition + 1 + width;
                            shapeCopy[2] = currentPosition + 1 + 2 * width;
                            shapeCopy[3] = currentPosition + 1 + 3 * width;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0]=currentPosition + 1;
                                currentShape[1]=currentPosition + 1 + width;
                                currentShape[2]=currentPosition + 1 + 2 * width;
                                currentShape[3]=currentPosition + 1 + 3 * width;
                                rotation++;
                            }
                            break;
                        case 2:  // 2 -> 3
                            shapeCopy[0] = currentPosition + 2 + 2 * width;
                            shapeCopy[1] = currentPosition + 1 + 2 * width;
                            shapeCopy[2] = currentPosition + 2 * width;
                            shapeCopy[3] = currentPosition - 1 + 2 * width;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0]=currentPosition + 2 + 2 * width;
                                currentShape[1]=currentPosition + 1 + 2 * width;
                                currentShape[2]=currentPosition + 2 * width;
                                currentShape[3]=currentPosition - 1 + 2 * width;
                                rotation++;
                            }
                            break;
                        case 3:  // 3 -> 0
                            shapeCopy[0] = currentPosition;
                            shapeCopy[1] = currentPosition + width;
                            shapeCopy[2] = currentPosition + 2 * width;
                            shapeCopy[3] = currentPosition + 3 * width;

                            blockedByAnotherShape = shapeCopy.some(index => {
                                return cells[index] && cells[index].classList.contains('active');
                            });

                            if(!blockedByAnotherShape){
                                currentShape[0]=currentPosition;
                                currentShape[1]=currentPosition + width;
                                currentShape[2]=currentPosition + 2 * width;
                                currentShape[3]=currentPosition + 3 * width;
                                rotation=0;
                            }
                            break;
                    }
                    draw();
                    break; 
            }
            drawShapeProjection();
            const overlapWithProjection = currentShape.filter(index => shapeProjection.includes(index));
            if (overlapWithProjection.length > 0) {
                overlapWithProjection.forEach(value => {
                    cells[value].classList.forEach(cls => {
                        if (cls.startsWith('projection-')) {
                            cells[value].classList.remove(cls);
                        }
                    });
                });
            }
        }
        
        function checkForFullRow() {
            const width = 10;
            var rows = 0;
        
            for (let row = 0; row < cells.length; row += width) {
                let isFullRow = true;
        
                for (let i = 0; i < width; i++) {
                    if (!cells[row + i].classList.contains('active')) {
                        isFullRow = false;
                        break;
                    }
                }
        
                if (isFullRow) {
                    //console.log("Full row at index: " + row);
        
                    //remove row
                    for (let i = 0; i < width; i++) {
                        const cell = cells[row + i];
                        cells[row + i].classList.remove('active');
                        //remove all classes that end in '-shape'
                        cell.classList.forEach(cls => {
                            if (cls.endsWith('-shape')) {
                                cell.classList.remove(cls);
                            }
                        });
                    }
        
                    //Move all else down
                    dropBlocksAbove(row);
                }
                

                function dropBlocksAbove(startIndex) {
                    const width = 10;
                
                    for (let i = startIndex - 1; i >= 0; i--) {
                        const current = cells[i];
                        const below = cells[i + width];
                
                        //Get the shape class
                        const shapeClass = ['l-shape', 'j-shape', 'z-shape', 's-shape', 't-shape', 'square-shape', 'line-shape']
                            .find(cls => current.classList.contains(cls));
                
                        if (current.classList.contains('active')) {
                            below.classList.add('active');
                            if (shapeClass) below.classList.add(shapeClass);
                        } else {
                            below.classList.remove('active');
                            //Clean up any previous shape class
                            ['l-shape', 'j-shape', 'z-shape', 's-shape', 't-shape', 'square-shape', 'line-shape'].forEach(cls => {
                                below.classList.remove(cls);
                            });
                        }
                
                        //Clear the current cell
                        current.classList.remove('active');
                        if (shapeClass) current.classList.remove(shapeClass);

                        
                    }
                    rows++;
                }
            }

            //Check how many rows were deleted
            switch(rows){
                case 1:
                    currentScore += 40;
                    break;
                case 2:
                    currentScore += 100;
                    break;
                case 3:
                    currentScore += 300;
                    break;
                case 4:
                    currentScore += 1200;
                    break;
                default:
                    currentScore += 0;
                    break;
            }
            updateScoreElement();
        }
            
        /*Test*/
        //TODO: Change to user set keybinds
        document.addEventListener('keydown', (e)=>{
            if(e.key === 'ArrowLeft'){
                moveLeft();
            }else if(e.key === 'ArrowRight'){
                moveRight();
            }else if(e.key === 'ArrowDown'){
                moveDown(); 
                resetTimer();
            }else if(e.key === 'ArrowUp'){
                rotate();
            }else if(e.key === ' ' || e.key === 'Spacebar'){
                drop();
            }
            else if(e.key === 'c'){
                hold();
            }
        });
        
        return () => clearInterval(timer); //Cleanup on unmount
        
        
    }, []);

    return (
        <>
        <Header />
        <div className="container col">
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
                        <div className="hold-block">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="mini-cell" />
                        ))}
                        </div>
                    </div>
                    <div className="score-container">
                        <p>Score</p>
                        <h2 id="current-score"></h2>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Play;
