let voice = new webkitSpeechRecognition()

voice.lang = "en-EN"

let words = {
    "a": [['apple'], 0],
    "b": [['blue'], 0],
    "c": [['class'], 0],
    "d": [['danger'], 0],
    "e": [['empty'], 0],
    "f": [['false'], 0],
    "g": [['generation'], 0],
    "h": [['hello'], 0],
    "i": [['index'], 0],
    "j": [['json'], 0],
    "k": [['key'], 0],
    "l": [['lemon'], 0],
    "m": [['monday'], 0],
    "n": [['narrow'], 0],
    "o": [['order'], 0],
    "p": [['phone'], 0],
    "q": [['query'], 0],
    "r": [['registration'], 0],
    "s": [['situation'], 0],
    "t": [['table'], 0],
    "u": [['under'], 0],
    "v": [['voice'], 0],
    "w": [['wonder'], 0],
    "x": [['xylophone'], 0],
    "y": [['yellow'], 0],
    "z": [['zebra'], 0]
}

words = JSON.parse(window.localStorage.getItem("words")) || words

btn_v.onclick = () => {
    voice.start()
}

btn_r.onclick = () => {
    for (let val in words) {
        words[val][1] = 0
    }
    window.localStorage.setItem('words', JSON.stringify(words))
    window.location.reload();
}

voice.onresult = (res) => {

    let firstletter = res.results[0][0].transcript.split("").shift()
    let lastletter = res.results[0][0].transcript.split("").pop()
    let voice_word = res.results[0][0].transcript

    voice_word = voice_word.toLowerCase()
    firstletter = firstletter.toLowerCase()
    
    let index = words[lastletter][1]
    let word = words[lastletter][0][index]


    if (!words[firstletter][0].includes(voice_word)) {
        words[firstletter][0].push(voice_word)
    }

    if (!word) {
        const utterThis = new SpeechSynthesisUtterance("I lose, Press the restart button")
        window.speechSynthesis.speak(utterThis)
        container.children[0].className = null
        container.children[0].innerHTML = null
    }

    else {
        words[lastletter][1]++
        window.localStorage.setItem('words', JSON.stringify(words))
        const utterThis = new SpeechSynthesisUtterance(word)
        window.speechSynthesis.speak(utterThis)
        window.speechSynthesis.pending
    }
}
