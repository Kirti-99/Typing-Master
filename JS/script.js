const autoText = document.querySelector("#autoText");
const typeText = document.querySelector("#typeText");
const Difficulty = document.querySelector("#Difficulty");
let timePause = null;
let startTime, endTime, totalTime;
function StartingTime() {
    let date = new Date;
    startTime = date.getTime();
    // console.log(startTime);
}
function endingTime() {
    let date = new Date;
    endTime = date.getTime();
    // console.log(endTime,"end time");
    totalTime = (endTime - startTime) / 1000;
    // console.log(totalTime ,"Total time");
    calculateSpeed(totalTime);
    document.getElementById("TestValues").style.display = "block";
    document.getElementById("btns").style.display = "none";
    document.getElementById("submitbtn").style.display = "none";
    document.getElementById("timer").style.display = "none";
    typeText.contentEditable = "false";
}
let TextArray = [
    'Technology has become an essential part of everyday life, influencing how people communicate, work, and learn.',
    'From smartphones to online education, modern tools have made information more accessible than ever before.',
    'While technology saves time and increases efficiency, it also challenges individuals to maintain a balance between digital and real-life interactions.',
    'Using technology wisely can help people grow personally and professionally without becoming overly dependent on it.'
];
let wordsArray = [
    "technology", "future", "learning", "growth", "to", "is", "this", "that", "success", "hardware", "security", "coding", "algorithm",
    "focus", "development", "innovation", "skills", "practice", "people", "money", "network", "function"
];

//Random sentence
function generateRandomText() {
    let arrayIndex = Math.floor(Math.random() * TextArray.length);
    //    console.log(arrayIndex);
    if (Difficulty.value !== "") {
        if (Difficulty.value === "4") {
            document.getElementById("custom").style.display = "block";
            autoText.value = "";
        }
        else {
            document.getElementById("custom").style.display = "none";
            autoText.value = TextArray[arrayIndex];
        }
        // typeText.contentEditable = "true";
        document.getElementById("pause").disabled = false;
        document.getElementById("resatbtn").disabled = false;
        document.getElementById("submitbtn").disabled = false;
    }
    else {
        autoText.value = "";
        typeText.innerHTML = "";
        document.getElementById("btns").style.display = "block";
        document.getElementById("submitbtn").style.display = "block";
        document.getElementById("timer").style.display = "block";
        document.getElementById("TestValues").style.display = "none";
        document.getElementById("pause").disabled = true;
        document.getElementById("resatbtn").disabled = true;
        document.getElementById("submitbtn").disabled = true;
        reset();
    }
    autoText.addEventListener("copy", e => e.preventDefault());
    autoText.addEventListener("cut", e => e.preventDefault());
    autoText.addEventListener("contextmenu", e => e.preventDefault());

    typeText.addEventListener("copy", e => e.preventDefault());
    typeText.addEventListener("cut", e => e.preventDefault());
    typeText.addEventListener("paste", e => e.preventDefault());
    typeText.addEventListener("contextmenu", e => e.preventDefault());
}

//ondigits can be typed
function onlyDigits() {
    let numberValue = document.getElementById("numberValue");
    numberValue.value = numberValue.value.replace(/[^0-9]/g, '');
}

//words generate
function generateWords() {
    let count = parseInt(document.getElementById("numberValue").value);
    if (isNaN(count) || count <= 0) {
        alert("Invalid Number!!");
    }
    let result = [];
    for (let i = 0; i < count; i++) {
        let randomText = Math.floor(Math.random() * wordsArray.length);
        result.push(wordsArray[randomText]);
    }
    autoText.value = result.join(" ");
}

const errorCheckig = (words) => {
    let num = 0, count = 0, correctChar = 0, IncorrectChar = 0, skipped = 0, skipchar = 0;
    let totalWords = typeText.innerText.trim();
    let typedchar = totalWords.split("");
    let actualWordsAuto = autoText.value.split(" ");
    let actualcharsAuto = autoText.value.split("");
    for (let i = 0; i < actualWordsAuto.length; i++) {
        if (words[i] == null) {
            skipped++;
        }
    }
    for (let i = 0; i < actualcharsAuto.length; i++) {
        if (typedchar[i] == null) {
            skipchar++;
        }
    }
    for (let i = 0; i < typedchar.length; i++) {
        if (typedchar[i] === actualcharsAuto[i]) {
            correctChar++;
        }
        else {
            IncorrectChar++;
        }
    }
    for (let i = 0; i < words.length; i++) {
        if (words[i] === actualWordsAuto[i]) {
            num++;
        }
        else {
            count++;
        }
    }
    let accuracy = correctChar / (correctChar + IncorrectChar) * 100;
    accuracy = Math.round(accuracy);
    document.getElementById("ICW").value = count;
    document.getElementById("CC").value = correctChar;
    document.getElementById("ICC").value = IncorrectChar;
    document.getElementById("CW").value = num;
    document.getElementById("SW").value = skipped;
    document.getElementById("SC").value = skipchar;
    document.getElementById("TABOC").value = accuracy;
    return num;
}
//speed calculate
const calculateSpeed = (total_Time) => {
    let totalWords = typeText.innerText.trim();
    let actualWords = totalWords.split(" ");
    actualWords = errorCheckig(actualWords);
    // console.log(actualWords);
    if (actualWords !== 0) {
        // console.log(total_Time);
        let typingSpeed = (actualWords / total_Time) * 60;
        // console.log(typingSpeed);
        typingSpeed = Math.round(typingSpeed);
        document.getElementById("WPM").value = typingSpeed;
    }
}

//Sound play and pause 
function soundPlay() {
    let sound = document.getElementById("sound");
    let soundCheck = document.getElementById("soundCheck");
    if (soundCheck.checked) {
        sound.pause();
    }
    else {
        sound.currentTime = 0;
        sound.play();
    }
}

//Timer set 
let min = 5, sec = 59;
function timer() {
    if (timePause != null) {
        return;
    }
    let minutes = document.getElementById("min");
    let seconds = document.getElementById("sec");
    timePause = setInterval(() => {
        if (sec == 0 && min == 0) {
            alert("Time Over");
        }
        sec--;
        if (sec <= 0) {
            sec = 59;
            min--;
        }
        seconds.innerHTML = sec < 10 ? "0" + sec : sec;
        minutes.innerHTML = min < 10 ? "0" + min : min;

    }, 1000);
}

//pause button
function pause() {
    clearInterval(timePause);
    timePause = null;
}

//reset button 
function reset() {
    let minutes = document.getElementById("min");
    let seconds = document.getElementById("sec");

    typeText.innerHTML = "";
    sec = 0;
    min = 5;
    // seconds.innerHTML =  sec;
    // minutes.innerHTML = "0"+min;
    seconds.innerHTML = sec < 10 ? "0" + sec : sec;
    minutes.innerHTML = min < 10 ? "0" + min : min;
    clearInterval(timePause);
    timePause = null;
}

//Correct words color Change 
function correctWords() {
    let actual = autoText.value;
    let input = typeText;
    let typed = typeText.textContent;
    let color = "";
    if (typed.length > actual.length) 
    {
        typed = typed.substring(0,actual.length);
    }
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] == null) {
            color += `<span>${typed[i]}</span>`;
        }
        else if (typed[i] === actual[i]) {
            color += `<span style="color:green;">${typed[i]}</span>`;
        }
        else {
            color += `<span style="color:red;">${typed[i]}</span>`;
        }
    }

    input.innerHTML = color;
    placeCaretAtEnd(input);
}

function placeCaretAtEnd(e) {
    e.focus();
    if (window.getSelection && document.createRange) 
        {
        var range = document.createRange();
        range.selectNodeContents(e);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
