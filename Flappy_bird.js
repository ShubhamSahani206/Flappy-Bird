let i=0, j=0;
let body=document.querySelector("body");
let fly=document.getElementById("fly");
let pillars=[], pillarWidth=[], pillarbox=[];
let background=document.querySelector("#Background");
let pillarHeight;
let latest=0;
let trig=false;
let flybox;
let game=0;
let gameStarted=false;

//---------------CREATING FIRST TWO PILLARS-------------------
function createPillars(){

    pillars[i]=document.createElement("div");
    pillarHeight=Math.floor(Math.random()*(60-20+1))+20;
    pillars[i].style=
       `height:${pillarHeight}vh;
        width: 5vw;
        background-color: red;
        position: absolute;
        z-index:3;
        left: 110vw;`;
    body.append(pillars[i]);
    pillarbox.push(pillars[i].getBoundingClientRect());
    i++;


    pillars[i]=document.createElement("div");
    secondPillarHeight=100-(pillarHeight+30);
    pillars[i].style=
        `height:${secondPillarHeight}vh;
        width: 5vw;
        background-color: red;
        position: absolute;
        top: ${pillarHeight+30}vh;
        z-index:3;
        left: 110vw;`;
    pillars[i-1].after(pillars[i]);
    pillarbox.push(pillars[i].getBoundingClientRect());
    i++;

    pillarWidth.push(110);
    pillarWidth.push(110);
}
createPillars();


//--- MOVING BOTH PILLARS AND CREATING MORE PILLARS ------------------------------------
function movePillars(){

    for(let k=0; k<pillarWidth.length; k++){            //Moving pillars to left by reducing their width
            pillarWidth[k]-=0.2;
    }

    for(let m=0; m<pillars.length; m+=2){               //Assigning pillars' width
            pillars[m].style.left=pillars[m+1].style.left=pillarWidth[m]+"vw";
    }

    latest=pillars.length-1;                //Create pillars on 75%
    if(pillarWidth[latest]<60){
        createPillars();
    }

    //-------------------Deleting Extra Pillars------------------------
    for(let n=pillars.length-2; n>=0; n-=2){ 
        if(pillarWidth[n]<-10){ 
            pillars[n].remove(); 
            pillars[n+1].remove(); 
            pillars.splice(n, 2); 
            pillarWidth.splice(n, 2); 
            pillarbox.splice(n, 2);
            i-=2;
        } 
    } 

    //---------Calculating Bounds of all pillars-------------
    for(let i=0; i<pillars.length; i++){
        pillarbox[i]=pillars[i].getBoundingClientRect();
    }

}

//__________________________________________________________________________________________


function startGame(){                                     //Function to start the game
    pillarsarerunning=setInterval(movePillars, 10);
    beeismoving =setInterval(moveBee, 10);
    window.addEventListener("pointerdown",jump);             //Adding pointerdown event on window to click

    playbtn=document.querySelector("#Playbtn");
    playbtn.style.display="none";
    
    background.play();
    gameStarted=true;
}


//------------------------BEE-------------------------------
let height=0;
function moveBee(){
    flybox=fly.getBoundingClientRect();
    
    //-----------------COLLISION DETECTION----------------------
    for(let i=0; i<pillarbox.length; i+=1){
        if (!(flybox.top>pillarbox[i].bottom || 
            flybox.bottom<pillarbox[i].top || 
            flybox.left>pillarbox[i].right || 
            flybox.right<pillarbox[i].left)){

                if(game==0){
                let sound=document.querySelector("#GameOverSound").play()
                background.pause();
                clearInterval(beeismoving);
                clearInterval(pillarsarerunning);
                window.removeEventListener("pointerdown",jump);
                document.querySelector("#GameOver").style.display="block";
                game+=1;
                ;
                }

        }
    }

    //-----------------MOVING BEE-------------------------------
    height+=0.25;
    fly.style.top=height+"vh";
    if(height>100){
        height=0;
    }
}


//-----------JUMP FUNCTION FOR BEE--------------
let count=0;                                        
let jump=()=>{                                       //creating lambda func tap 
    let interval= setInterval(()=>{                 //lambda func interval which contains setInterval which runs functions after an interval of 10ms
        height-=1;                                     
        fly.style.top=height+"vh";                  //decreasing 1%
        count++;                                        

            if(count>20){
                clearInterval(interval);            //if setInterval ran 20 times then stop it
                count=0;
            }
    },10);
}

//_________________________________________________________


