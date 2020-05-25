let playing = false
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
    } else {
        window.alert("You have beaten the game!")
    }
}


function printWord(){
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
            //TODO CHANGE STICK
            window.alert("Try again, mate. You have " + chances + " left.")
        }
    } else {
        window.alert("You have lost. You are out of chances")
    }
}

function screamer(key){
    keyLetter = String.fromCharCode(key.which).toLowerCase()
    document.getElementById(keyLetter).disabled = true
    console.log(keyLetter)
    if(keyLetter in usedLetters){
        window.alert("You've already used " + keyLetter + " try another!")
    } else {
        usedLetters.push(keyLetter)
        completionCheck(keyLetter)
    }
}
function scream(){
    this.disabled=true
    console.log(this.id)
    completionCheck(this.id)
}

function completionCheck(key){
    if(JSON.stringify(wordArray)!==JSON.stringify(dashes)){
        if(completionCheck.arguments.length === 1){
            checkLetter(key)
        } else return

    } else {
        playAgain = confirm("You have saved your life! Congrats!\nWould you like to play another word?")
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
