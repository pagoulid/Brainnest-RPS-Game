/*MAIN FUNCTIONS*/ 
    /*userPlay(selection) : returns player selection*/ 
    /*computerPlay(selection): returns computer selection */
    /* playRound(selection1,selection2,maxScore) return score result given 2 selections.If one player reaches maxScore return 
        final results*/
/*MAIN FUNCTIONS*/ 
/* NESTED FUNCTIONS */
    /* DOMOutput(className,text,timeToWait) : Save text to textContent of className's Node to appear to the DOM. timeToWait describes 
    how long the text will wait before it appears on the DOM */
    /*setScore for DOM*/
    /*resetScore for DOM*/

/* NESTED FUNCTIONS */
/*NOTE: ScoreBoard global vars for DOM manipulation*/
/*NOTE: Score local vars to define which selection will be beaten*/

/*GLOBAL */
const rock ={"beats paper":0,"beats scissor":1,"beats rock":1}; /*score is 0 for false , 1 for true or same element*/
const paper ={"beats paper":1,"beats scissor":0,"beats rock":1};
const scissor ={"beats paper":1,"beats scissor":1,"beats rock":0};
const elements ={"paper": paper,"scissor":scissor,"rock":rock};
let P_SCORE_BOARD = 0;
let C_SCORE_BOARD = 0;
let IF_MAX_SCORE = false;
/*GLOBAL */ 

/*Main Functions*/ 



const userPlay = (s) => {
    let pSelection = s.getAttribute("id");
    let userText = `You picked ${pSelection}.Waiting for computer's guess...`;
    DOMOutput('.message',userText,0);
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
            DOMOutput('.message',CPUText,timeTowait);
            return "rock";
        case 1:
            CPUText = 'Computer picked paper...';
            DOMOutput('.message',CPUText,timeTowait);
            return "paper";
        case 2:
            CPUText = 'Computer picked scissor...';
            DOMOutput('.message',CPUText,timeTowait);
            return "scissor";
    }
}

const playRound = (pSelection,cSelection,maxScore)=>{
    let userElement = elements[pSelection];
    let computerElement = elements[cSelection];

    let userScore = userElement["beats "+cSelection];
    let computerScore = computerElement["beats "+pSelection];

    let timeTowait = 2000;
    let resultText;

    if(userScore!=computerScore){/*If players have the same score , they selected the same element*/ 
        if(userScore>computerScore){
            
            P_SCORE_BOARD+=1;
            if(P_SCORE_BOARD<maxScore){
                resultText = `${pSelection} beats ${cSelection}. You win!`;
            }
            else{/* If end of the game */
                IF_MAX_SCORE=true;
                resultText = `Your Score:${P_SCORE_BOARD}, Computer score:${C_SCORE_BOARD}. You win!`;
            }   
        }
        else{
            C_SCORE_BOARD+=1;
            if(C_SCORE_BOARD<maxScore){
                resultText = `${cSelection} beats ${pSelection}. You lose!`;
            }
            else{/* If end of the game */
                IF_MAX_SCORE=true;
                resultText = `Your Score:${P_SCORE_BOARD}, Computer score:${C_SCORE_BOARD}. You lose!`;
            }  
        }
    }
    else{
        resultText = `The result is draw because both players selected ${pSelection}`;
    }

    DOMOutput('.message',resultText,timeTowait);
    return resultText;
    
}

let clickPromise = new Promise((resolve,reject)=>{resolve(`click event`)});
/*Main Functions*/

/*MAIN*/ 
/*Implement main with Promise chaining :
    when element clicked retrieve player selection [userPlay()] then 
    retrieve computer random selection [computerPlay()]
     then finally define the result of the round [playRound()]
     and then finally set the relative score [setScore()]*/

let selections = document.querySelectorAll('.selection');

selections.forEach((selection)=>{
     
    selection.addEventListener('click',(e)=>{

        clickPromise.then((msg)=>{
                console.log(msg);
                let playerSelection = userPlay(selection);
                return playerSelection;
            }
        ).then((playerSelection)=>{
            let computerSelection = computerPlay();
            return {"playerSelection":playerSelection,"computerSelection":computerSelection};
        }).then((choices)=>{
            let playerSelection = choices.playerSelection;
            let computerSelection = choices.computerSelection;
            let result = playRound(playerSelection,computerSelection,5);
            return result;
        }).then((roundResult)=>{
            let timeToWait = 2500;
            setScore(roundResult,timeToWait);
            console.log(roundResult);
        });
    });
});
/*MAIN*/

function DOMOutput(className,text,timeTowait){
    const Node = document.querySelector(className);
    setTimeout(()=>{Node.textContent = text;},timeTowait);   
}
async function setScore(result,timeToWait){
    /*If not draw then change score*/ 
    
    if(!IF_MAX_SCORE){
        if(!result.includes('draw')){
            let condition = result.includes('win')?0:1;
            switch(condition){
                case 0:
                    DOMOutput('.player-score',P_SCORE_BOARD,timeToWait);
                    break;
                case 1:
                    DOMOutput('.computer-score',C_SCORE_BOARD,timeToWait);
                    break;
            }
        }
    }
    else{
        IF_MAX_SCORE=false;
        P_SCORE_BOARD=0;
        C_SCORE_BOARD=0;
        resetScore(timeToWait);   
    }
    
}
function resetScore(timeToWait){
    let scores = document.querySelectorAll('.score');
    setTimeout(()=>{
        scores.forEach((score)=>{
            score.textContent=0;
        });
    },timeToWait);
    
}
