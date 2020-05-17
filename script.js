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
const completedIndices = []
const maxDict = dictionary.words.length
function getAWord(){
    if(completedIndices.length<=maxDict)
    {
        let index = Math.floor(Math.random() * maxDict);
        while(index in completedIndices){
            index = Math.floor(Math.random() * maxDict);
        }
        word = dictionary.words[index].toLowerCase(); clue = dictionary.clues[index]
        completedIndices.push(index)
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

usedLetters = []
function screamer(key){
    keyLetter = String.fromCharCode(key.which).toLowerCase()
    document.getElementById(keyLetter).disabled = true
    console.log(keyLetter)
    checkLetter(keyLetter)
    usedLetters.push(keyLetter)
}
function scream(){
    this.disabled=true
    console.log(this.id)
    checkLetter(this.id)
}

window.onload = attachClickEvent;
window.onload = getAWord;
