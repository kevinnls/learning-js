let playing = false
let wins=0
let losses=0
function changeFrame() {
    if(playing)
    {
        playing = false
        document.getElementById('ctrlButton').innerHTML = "Start Playing"
        document.getElementById('ctrlButton').style.color="black"
        document.getElementById('frame').src="intro frame.html"
    }else{
        playing = true
        document.getElementById('ctrlButton').innerHTML = "Stop Playing"
        document.getElementById('ctrlButton').style.color="red"
        document.getElementById('frame').src="game.html"
    }
}

function attachClickEvent(){
    let keyboardList = document.getElementsByClassName('keyboard')
    for(i=0;i<keyboardList.length;i++){
        keyboardList[i].addEventListener("click", scream)
    }
}

const dictionary = {
    words:['hello','world','goodbye','javaScript'],
    clues:['a salutation','we live in this','said when you take leave','a language for computing']
}
let completedIndices = [undefined]
const maxDict = dictionary.words.length
function getAWord(){
    if(completedIndices.length<=maxDict)
    {
         while(completedIndices.some(function(value){
             return value==getAWord.index || getAWord.index==undefined
         })){
             getAWord.index = Math.floor(Math.random() * maxDict);
             console.log("index is: " + getAWord.index)
         };

        word = dictionary.words[getAWord.index].toLowerCase(); clue = dictionary.clues[getAWord.index]
        completedIndices.push(getAWord.index)
        dashes = []
        wordArray = []
        usedLetters = []
        chances = 6
        document.getElementById('stick').innerHTML=stick[0]
        console.log("hi")
        for(i in word){
            console.log(i)
            dashes.push("_")
            wordArray.push(word.toLowerCase().charAt(i))
        }
        let keyboardList = document.getElementsByClassName('keyboard')
        for(i in keyboardList){
            keyboardList[i].disabled = false
        }
        document.getElementById('clue').innerHTML = clue
        printWord()
        document.getElementById('word').style.color="inherit"
    } else {
        window.alert("You have beaten the game!")
    }
}


async function printWord(){
    outWord = ''
    for(i in dashes) outWord += dashes[i] + " "
    document.getElementById('word').innerHTML = outWord
}

function checkLetter(letter){
    let count = 0
    if(chances>0){
        for(i in wordArray){
            if(wordArray[i] == letter){
                dashes[i] = letter
                count++
            } else continue
        }
        if(count>0){
                printWord()
        } else {
            --chances
            if(chances>0){
            document.getElementById('stick').innerHTML=stick[6-chances]
            window.alert("Try again, mate. You have " + chances + " left.")
        }else{
            window.alert("You have lost. You are out of chances")
            dashes = wordArray
            document.getElementById('word').style.color="red"
            printWord()
        }
        }
    } else {
        window.alert("You have lost. You are out of chances")
    }
}

function screamer(key){
    keyLetter = String.fromCharCode(key.which).toLowerCase()
    document.getElementById(keyLetter).disabled = true
    console.log(keyLetter)
    if(usedLetters.some(function(value){return value==keyLetter})){
        window.alert("You've already used \"" + keyLetter + "\" try another!")
    } else {
        usedLetters.push(keyLetter)
        checkLetter(keyLetter)
    }
}
function scream(){
    this.disabled=true
    console.log(this.id)
    checkLetter(this.id)
}

function completionCheck(){
    if(JSON.stringify(wordArray)!==JSON.stringify(dashes)){
        return
    } else {
        if(chances!=0){
        playAgain = confirm("You have saved your life! Congrats!\nWould you like to play another word?")
        wins++
        document.getElementById('win_counter').innerHTML=wins
    }else{
        playAgain = confirm("Alas! You have lost your life! \nWould you like to play another word?")
        losses++
        document.getElementById('loss_counter').innerHTML=losses
    }
        if(playAgain == true){
            getAWord()
            return false
        } else {
            window.alert("Byeee!")
        }

    }
}

window.onload = function(){
    attachClickEvent();
    getAWord();
}
observer = new MutationObserver(function(mutationsList, observer) {
    console.log(mutationsList)
    setTimeout(function(){completionCheck()}, 500);
})
observer.observe(document.getElementById('word'), {characterData: false, childList: true, attributes: false});

const stick = [
"&emsp;_____<br>\
&emsp;|&emsp;&ensp;[ ]<br>\
&emsp;|<br>\
&emsp;|<br>\
&emsp;|<br>\
••••••••••••••",
"&emsp;_____<br>\
&emsp;|&emsp;&ensp;[o]<br>\
&emsp;|<br>\
&emsp;|<br>\
&emsp;|<br>\
••••••••••••••",
"&emsp;_____<br>\
&emsp;|&emsp;&ensp;[o]<br>\
&emsp;|&emsp;&emsp;|<br>\
&emsp;|<br>\
&emsp;|<br>\
••••••••••••••",
"&emsp;_____<br>\
&emsp;|&emsp;&ensp;[o]<br>\
&emsp;|&emsp;&ensp; /|<br>\
&emsp;|<br>\
&emsp;|<br>\
••••••••••••••",
"&emsp;_____<br>\
&emsp;|&emsp;&ensp;[o]<br>\
&emsp;|&emsp;&ensp; /|\\<br>\
&emsp;|<br>\
&emsp;|<br>\
••••••••••••••",
"&emsp;_____<br>\
&emsp;|&emsp;&ensp;[o]<br>\
&emsp;|&emsp;&ensp; /|\\<br>\
&emsp;|&emsp;&ensp; /ᵔ<br>\
&emsp;|<br>\
••••••••••••••",
"&emsp;_____<br>\
&emsp;|&emsp;&ensp;[o]<br>\
&emsp;|&emsp;&ensp; /|\\<br>\
&emsp;|&emsp;&ensp; /ᵔ\\<br>\
&emsp;|<br>\
••••••••••••••"]
