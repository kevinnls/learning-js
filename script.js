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

const dictionary = {
    words:['hello','world','goodbye','javaScript'],
    clues:['a salutation','we live in this','said when you take leave','a language for computing']
}
const completedIndices = []
const maxDict = dictionary.words.length
if(completedIndices.length<=maxDict)
{
    let index = Math.floor(Math.random() * maxDict);
    while(index in completedIndices){
        index = Math.floor(Math.random() * maxDict);
    }
    word = dictionary.words[index]; clue = dictionary.clues[index]
    completedIndices.push(index)
    dashes = []
    wordArray = []
    console.log("hi")
    for(i in word){
        console.log(i)
        dashes.push("_")
        wordArray.push(word.toLowerCase().charAt(i))
    }
}

function scream(key){
    keyLetter = String.fromCharCode(key.which).toLowerCase()
    console.log(keyLetter)
    document.getElementById(keyLetter).disabled=true
}
