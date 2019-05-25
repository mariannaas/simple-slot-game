function getElementById(element) {
    return document.getElementById(element);
}
function eventListener(selector, event, callback) {
    document.querySelector(selector).addEventListener(event, function(e) {
        e.preventDefault();
        callback();
    })
}


function drawImage(context, canvas, sourceImage, index) {
    let img = new Image();
    let newImgWidth = canvas.width / 3;
    img.onload = () => {
        if (canvas.width / 2 > img.width * 3) {
            context.drawImage(img, index * img.width, 0);
        } else {
            context.drawImage(img, index * newImgWidth, 0, newImgWidth, canvas.height);
        }
    };
    img.src = sourceImage;
}

function loadImages(context, canvas, randomNumbers) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < randomNumbers.length; i++) {
        const sourceImage = "src/multimedia/images/Symbol_" + randomNumbers[i] + ".png";
        console.log(i);
        drawImage(context, canvas, sourceImage, i)
    }
}

function resize(canvas) {
    let wrapperElement = document.getElementById("wrapper");
    canvas.width = wrapperElement.clientWidth;
    canvas.height = wrapperElement.clientHeight;
    let winTypeElement = document.getElementById("winType");
    winTypeElement.setAttribute("width", canvas.width);
}

function getOutcome() {
    return new Promise(resolve => {
        getServerData(resolve);
    });
}

function getServerData(callback) {
    let xhttp = new XMLHttpRequest(),
        method = "GET",
        url = "http://127.0.0.1:3000/getOutcome";

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(xhttp.responseText);
        } //error handler!!
    };
    xhttp.open(method, url, true);
    xhttp.send();
}



function initAnimation(){
    document.addEventListener("DOMContentLoaded", (event) => {
        const canvas = getElementById("gameCanvas");
        const context = canvas.getContext("2d");
        if (window.innerWidth < canvas.width) {
            resize(canvas);
        }
        loadImages(context, canvas, [0, 1, 0]);
         document.getElementById("spinButton").addEventListener("click", async (event) => {
                getOutcome().then(response => {

                    let responseText = JSON.parse(response);
                    let winTypeText = responseText.winType + ".";

                    if (JSON.parse(responseText.isBonus) === true) {
                        winTypeText += " And you have got a bonus spin!!!";
                        getOutcome().then(bonus => {

                            let bonusText = JSON.parse(bonus);
                            winTypeText += " " + bonusText.winType + ".";
                            loadImages(context, canvas, bonusText.outcome);

                        });
                    } else {
                        loadImages(context, canvas, responseText.outcome);
                    }
                    getElementById("winType").innerHTML = winTypeText;
                });
            });
    });
}

initAnimation();
