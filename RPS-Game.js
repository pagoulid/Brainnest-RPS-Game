/*GLOBAL */
const rock ={"beats paper":0,"beats scissor":1,"beats rock":1}; /*score is 0 for false , 1 for true or same element*/
const paper ={"beats paper":1,"beats scissor":0,"beats rock":1};
const scissor ={"beats paper":1,"beats scissor":1,"beats rock":0};
const elements ={"paper": paper,"scissor":scissor,"rock":rock};
let playerScoreBoard = 0;
let computerScoreBoard = 0;
let fiveTimesScore = false;


/*GLOBAL */ 
/*Main Functions*/ 
let clickPromise = new Promise((resolve,reject)=>{resolve(`click event`)});


const userPlay = (s) => {
    let pSelection = s.getAttribute("id");
    let userText = `You picked ${pSelection}.Waiting for computer's guess...`;
    clickOutput(userText,0);
    console.log(userText);
    return pSelection;

}

const computerPlay = ()=>{
   
    let condition =Math.round(Math.random()*2); /*Random Number between 0-2*/
    
    let CPUText;
    let timeTowait = 1000;/*Wait first for player selection message to appear...*/ 
    switch(condition){
        case 0:
            CPUText = 'Computer picked rock...';
            clickOutput(CPUText,timeTowait);
            return "rock";
        case 1:
            CPUText = 'Computer picked paper...';
            clickOutput(CPUText,timeTowait);
            return "paper";
        case 2:
            CPUText = 'Computer picked scissor...';
            clickOutput(CPUText,timeTowait);
            return "scissor";
    }
}

const playRound = (pSelection,cSelection)=>{
    let userElement = elements[pSelection];
    let computerElement = elements[cSelection];

    let userScore = userElement["beats "+cSelection];
    let computerScore = computerElement["beats "+pSelection];

    let timeTowait = 2000;
    let resultText;

    if(userScore!=computerScore){/*If players have the same score , they selected the same element*/ 

        if(userScore>computerScore){
            playerScoreBoard+=1;
            if(playerScoreBoard<5){
                resultText = `${pSelection} beats ${cSelection}. You win!`;
            }
            else{
                fiveTimesScore=true;
                resultText = `Your Score:${playerScoreBoard}, Computer score:${computerScoreBoard}. You win!`;
            }
            
            
        }
        else{
            computerScoreBoard+=1;
            if(computerScoreBoard<5){
                resultText = `${cSelection} beats ${pSelection}. You lose!`;
            }
            else{
                fiveTimesScore=true;
                resultText = `Your Score:${playerScoreBoard}, Computer score:${computerScoreBoard}. You lose!`;
            }
            
        }

    }
    else{
        resultText = `The result is draw because both players selected ${pSelection}`;
    }
    clickOutput(resultText,timeTowait);
    return resultText;
    
}
/*Main Functions*/
/*MAIN*/ 
let selections = document.querySelectorAll('.selection');
selections.forEach((selection)=>{
    /*Promise chaining :
    when element clicked retrieve player selection [userPlay()] then 
    retrieve computer random selection [computerPlay()]
     then finally define the result of the round [playRound()]*/ 
    selection.addEventListener('click',(e)=>{

        clickPromise.then(
            (msg)=>{
                console.log(msg);
                let playerSelection = userPlay(selection);
                return playerSelection;
            }
        ).then((playerSelection)=>{
            /*console.log('Waiting for computer/s guess...');*/
            let computerSelection = computerPlay();
            return {"playerSelection":playerSelection,"computerSelection":computerSelection};

        }).then((choices)=>{
            let playerSelection = choices.playerSelection;
            let computerSelection = choices.computerSelection;
            let result = playRound(playerSelection,computerSelection);
            return result;
        }).then((roundResult)=>{
            setScore(roundResult);
            console.log(roundResult);
        });
    });
});
/*MAIN*/

function clickOutput(text,timeTowait){
    const headerNode = document.querySelector('.message');
    
    
    headerNode.setAttribute('style','color:blue;');
    setTimeout(()=>{headerNode.textContent = text;},timeTowait);
    
}
async function setScore(result){
    /*If not draw then change score*/ 
    if(!fiveTimesScore){
        if(!result.includes('draw')){
            let condition = result.includes('win')?0:1;
            let scoreNode;
            switch(condition){
                case 0:

                    scoreNode = document.querySelector('.player-score');
                    setTimeout(()=>{scoreNode.textContent=playerScoreBoard;},2500);

                    break;
                case 1:
  
                    scoreNode = document.querySelector('.computer-score');
                    setTimeout(()=>{scoreNode.textContent=computerScoreBoard;},2500);
                    break;
            }
    
        }

    }
    else{
        resetScore();
    }
    
}
function resetScore(){
    let scores = document.querySelectorAll('.score');
    fiveTimesScore=false;
    playerScoreBoard=0;
    computerScoreBoard=0;

    setTimeout(()=>{scores.forEach((score)=>{
        score.textContent=0;
    })},2500);
    
}
