const prompt = require('prompt-sync')({sigint:true})

// creates the 2d array 
const createEmptyBoard = (boardSize) => {
    const board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(" "))
    console.log(board);
    return board
}

const generateCollisionPoints = (board, points) => {
    for(let i = 1; i <= points; i++){
        let x = Math.floor(Math.random() * board.length)
        let y = Math.floor(Math.random() * board[0].length)
        //so that the player starting point does not become a collision point
        if (x === 0 && y === 0) {
            continue;
        }
        board[x][y] = 'collision'
    }
    //console.table(board)
    return board
}

function generateWinningPoint(board) {
    let x = Math.floor(Math.random() * (board.length - 1));
    let y = Math.floor(Math.random() * (board[0].length - 1));
    board[x][y] = 'WIN';
    return [x,y];
}

const isCollision = (board, x, y) => {
    return board[x][y] === 'collision'
}

const checkForWinningSpot = (board, x, y) => {
    return board[x][y] === 'WIN';
}

const getPlayerMove = () => {
    const move = prompt('Where would you like to move next? (up, down, left, or right): ')
    return move
}

const movePlayer = (board, currentPoint, direction) => {
    let [x,y] = currentPoint;

    // depending on the direction the player choses, the coordinates 
    // update to match their new position on the board
    if (direction === 'up' && y > 0 ) {
        x--
    } else if (direction === 'down' && y < 4) {
        x++
    } else if (direction === 'left' && x > 0) {
        y--
    } else if (direction === 'right' && x < 4) {
        y++
    } else {
        console.log('Invalid move. Please choose up, down, left, or right.');
    }

    // check point, if null is returned break out loop
    if(isCollision(board, x, y)) {
        console.log('Oh no! You set off an alarm. The police are on the way');
        return null
    } else if (checkForWinningSpot(board,x,y)) {
        console.log("Congratulations! You have successfully stolen the prized jewel");
        return null
    }

    // return current point if theres no collision
    return [x,y]
}

// 2. start new game
const start = () => {
    // 1. generate new board
    let board = createEmptyBoard(4)
    // generate winning point
    generateWinningPoint(board);
    // 2. generate collision points
    let collisionBoard = generateCollisionPoints(board,5)
    // 3. starting point 
    let currentPoint = [0,0];
    // 4. while cp is truthy, continue moving along board
    while(currentPoint) {
        console.log('current point', currentPoint);
        let direction = getPlayerMove()
        // current point gets updated to the new position the player moved into,
        // which is the value returned by movePlayer
        currentPoint = movePlayer(collisionBoard, currentPoint, direction)
    }

}

start()