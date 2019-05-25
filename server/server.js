const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let winType = "No Win";

function getRandomNumber() {
    return Math.floor(Math.random() * 6);
}
function getRandomBoolean(){
    return Math.random() >= 0.5;
}

function generateOutcome() {
    let numbersArray = [];
    for (let i = 0; i < 3; i++) {
        numbersArray.push(getRandomNumber());
    }
    let flag = 0;
    for (let i = 0; i < numbersArray.length; i++) {
        for (let j = i + 1; j < numbersArray.length; j++) {
            if (numbersArray[i] === numbersArray[j]) {
                flag++;
            }
        }
    }
    switch (flag) {
        case 0:
            winType = "No Win";
            break;
        case 1:
            winType = "Small Win";
            break;
        case 3:
            winType = "Big Win";
            break;
        default:
            break;
    }
    return {
        outcome: numbersArray,
        winType: winType,
        isBonus: getRandomBoolean()
    };
}

app.get('/getOutcome', (req, res) => {
    res.json(generateOutcome());
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
