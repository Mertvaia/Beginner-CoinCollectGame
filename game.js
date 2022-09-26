const gameBoard = document.getElementById("gameboard")
const ctx = gameBoard.getContext("2d")
const gameBoardX = gameBoard.width
const gameBoardY = gameBoard.height
let keysPressed = {name: "keylistener"}
window.addEventListener("keydown", (event) => {keysPressed[ event.key ] = true})
window.addEventListener("keyup", (event) => {delete keysPressed[ event.key ]})
let charSpeed = 7
let charPosX = 500
let charPosY = 250
let coinRadius = 12
let moneySize = [25, 16]
let rand_arr = []
let CashDecider = false
let score = 0
let cashChance = 7
const resetButton = document.getElementById("resetButton")
const scoreDisp = document.getElementById("score")


gameStart()

function gameStart(){
    NewMoney()
    DrawCharacter()
    ChooseMoney()
    gameTick()
}

function gameTick(){
    setTimeout(()=>{
        boardClear()
        ChooseMoney()
        moveChar(keysPressed)
        DrawCharacter()
        gameTick()
    }, 30)
}

function boardClear(){
    ctx.fillStyle = "#6FDBD4"
    ctx.fillRect(0,0,gameBoardX,gameBoardY)
}

function moveChar(keyPressed){
    if(keyPressed.ArrowLeft && 0 < charPosX){
        charPosX += -charSpeed
    }
    else if(charPosX < 0){
        charPosX = 0
    }
    if(keyPressed.ArrowUp && 0 < charPosY){
        charPosY += -charSpeed
    }
    else if(charPosY < 0){
        charPosY = 0
    }
    if(keyPressed.ArrowRight && charPosX < 975){
        charPosX += charSpeed
    }
    else if(975 < charPosX){
        charPosX = 975
    }
    if(keyPressed.ArrowDown && charPosY < 475){
        charPosY += charSpeed
    }
    else if(475 < charPosY){
        charPosY = 475
    }

    GrabMoney()

    function GrabMoney(){
        if(rand_arr[2]){
            for(let i=0; i<=25; i += 12.5){
                for(let j=0; j<=25; j+=12.5){
                    if((charPosX+i < randX+moneySize[0])&&(randX<charPosX+i)&&(charPosY+j<randY+moneySize[1])&&(randY<charPosY+j)){
                        NewMoney()
                        score += 5
                        scoreDisp.innerHTML = `score:${score}`
                    }
                }
            }
        }

        else{
            function DistanceCalculator(a,b){
                return Math.sqrt(((charPosX-randX+a)**2)+((charPosY-randY+b)**2))
            }
            for(let i=0; i<=25; i += 12.5){
                for(let j=0; j<=25; j+=12.5){
                    if(DistanceCalculator(i,j) <= coinRadius){
                        NewMoney()
                        score += 1
                        scoreDisp.innerHTML = `score:${score}`
                    }
                }
            }
        }
    }

}

function DrawCharacter(){

    ctx.fillStyle = "#ff66ff"
    ctx.fillRect(charPosX,charPosY,25,25)
}

function NewMoney(){
    rand_arr = []
    randX = Math.floor(Math.random()*(gameBoardX-2*moneySize[0]))+moneySize[0]
    randY = Math.floor(Math.random()*(gameBoardY-2*coinRadius))+coinRadius
    rand_arr.push(randX,randY,IsCash())
    CashDecider = false

    function IsCash(){
        randCash = Math.floor(Math.random()*100)
        if(randCash<cashChance){
            CashDecider = true
        }
        return CashDecider
    }
}

function DrawCash(){
    ctx.fillStyle = "green"
    ctx.fillRect(rand_arr[0],rand_arr[1],moneySize[0],moneySize[1])
}

function DrawCoin(){
    ctx.beginPath()
    ctx.arc(rand_arr[0],rand_arr[1],coinRadius,0,2*Math.PI)
    ctx.fillStyle = "#FFD700"
    ctx.fill()
}

function ChooseMoney(){
    if(rand_arr[2]){
        DrawCash()
    }
    else{
        DrawCoin()
    }
}

resetButton.onclick = ()=>{
    charPosX = 500
    charPosY = 250
    score = 0
    NewMoney()
    scoreDisp.innerHTML = `score:${score}`
}