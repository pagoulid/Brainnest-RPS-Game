/*GLOBAL OBJECTS*/
const rock ={"beats paper":0,"beats scissor":1,"beats rock":1}; /*score is 0 for false , 1 for true or same element*/
const paper ={"beats paper":1,"beats scissor":0,"beats rock":1};
const scissor ={"beats paper":1,"beats scissor":1,"beats rock":0};
const elements ={"paper": paper,"scissor":scissor,"rock":rock};

/*GLOBAL OBJECTS*/ 
/*Functions*/ 
let clickPromise = new Promise((resolve,reject)=>{resolve(`click event`)});


const userPlay = (s) => {
    let pSelection = s.getAttribute("id");
    console.log(`You picked ${pSelection}`);
    return pSelection;

}

const computerPlay = ()=>{
   /* console.log('Waiting for computer/s guess...')*/
    let condition =Math.round(Math.random()*2); /*Random Number between 0-2*/
    

    switch(condition){
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissor";
    }
}

const playRound = (pSelection,cSelection)=>{
    let userElement = elements[pSelection];
    let computerElement = elements[cSelection];

    let userScore = userElement["beats "+cSelection];
    let computerScore = computerElement["beats "+pSelection];

    if(userScore!=computerScore){/*If players have the same score , they selected the same element*/ 

        if(userScore>computerScore){
            return `${pSelection} beats ${cSelection}. You win!`;
        }
        else{
            return `${cSelection} beats ${pSelection}. You lose!`;
        }

    }
    return `The result is draw because both players selected ${pSelection}`;
}
/*Functions*/
/*MAIN*/ 
let selections = document.querySelectorAll('.selection');
selections.forEach((selection)=>{
 
    selection.addEventListener('click',(e)=>{

        clickPromise.then(
            (msg)=>{
                console.log(msg);
                let playerSelection = userPlay(selection);
                return playerSelection;
            }
        ).then((playerSelection)=>{
            console.log('Waiting for computer/s guess...');
            let computerSelection = computerPlay();
            return {"playerSelection":playerSelection,"computerSelection":computerSelection};

        }).then((choices)=>{
            let playerSelection = choices.playerSelection;
            let computerSelection = choices.computerSelection;
            let result = playRound(playerSelection,computerSelection);
            return result;
        }).then((Roundresult)=>{
            console.log(Roundresult);
        });
    });
});
/*MAIN*/


/*
function game(){
    let result;
    let userScore = 0;
    let computerScore = 0;
    console.log('Rock Paper Scissor Tournanment of 5 rounds');
    console.log('Game starting...');
    for(let i=0;i<5;i++){
        console.log(`ROUND ${i+1}`);

        const pSelection = userPlay();
        const cSelection = computerPlay();
        result = playRound(pSelection,cSelection);
        console.log(result);

        if(result.includes('win')){
            userScore+=1;
        }
        else if(result.includes('lose')){
            computerScore+=1;
        }


    }
    
    let gameCondition=userScore>computerScore?0:1;
    console.log(`Your score: ${userScore}, CPU score: ${computerScore}.`)

    switch(gameCondition){
        case 0:
            console.log('You lose!');
            break;
        case 1:
            
            if(userScore==computerScore){
                console.log('No one wins');
            }
            else{
                console.log('You win!');
            }

            
    }
    
}*/
/*Game*/ 