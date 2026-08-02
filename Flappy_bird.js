let i=0, j=0;
let body=document.querySelector("body");
let pillarHeight;
let trig=false;
let pillars=[];
let pillarWidth=[];//-----------NEW
let latest=0;


//---------------CREATING FIRST TWO PILLARS-------------------
function createPillars(){

    pillars[i]=document.createElement("div");
    pillarHeight=Math.floor(Math.random()*(60-20+1))+20;
    pillars[i].style=
       `height:${pillarHeight}vh;
        width: 5vw;
        background-color: red;
        position: absolute;
        left: 110vw;`;
    body.append(pillars[i]);

    i++;
    pillars[i]=document.createElement("div");
    secondPillarHeight=100-(pillarHeight+30);
    pillars[i].style=
        `height:${secondPillarHeight}vh;
        width: 5vw;
        background-color: red;
        position: absolute;
        top: ${pillarHeight+30}vh;
        left: 110vw;`;
    pillars[i-1].after(pillars[i]);
    i++;

    pillarWidth.push(110);//-----------NEW
    pillarWidth.push(110);//-----------NEW

}
createPillars();
//____________________________________________________________

//--- MOVING BOTH PILLARS AND CREATING MORE PILLARS ------------------------------------
function movePillars(){

    for(let k=0; k<pillarWidth.length; k++){
        pillarWidth[k]-=0.2;
    }

    for(let m=0; m<pillars.length; m+=2){
    pillars[m].style.left=pillars[m+1].style.left=pillarWidth[m]+"vw";
    }

    if(pillarWidth[latest]<60){
       latest+=2;
        createPillars();
    }

    //-------------------Extra code to remove pillars which are out of screen------- 
    // for(let n=0; n<pillars.length-1; n+=2){ 
    //     if(pillarWidth[n]<-10){ 
    //         pillars[n].remove(); 
    //         pillars[n+1].remove(); 
    //         pillars.splice(n, 2); 
    //         pillarWidth.splice(n, 2); 
    //     } 
    // } 
    //__________________________________________________________________________________

}
setInterval(movePillars, 10);

//__________________________________________________________________________________________



//------------------------BEE-------------------------------
let height=0;
function moveBee(){
    height+=0.5;
    let fly=document.getElementById("fly");
    fly.style.top=height+"vh";
    if(height>100){
        height=0;
    }
}
setInterval(moveBee, 20);

//-----------JUMP FUNCTION FOR BEE--------------
let count=0;                                        
let tap=()=>{                                       //creating lambda func tap 
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

window.addEventListener("pointerdown",tap);             //Adding pointerdown event on window to click

//__________________________________________________________