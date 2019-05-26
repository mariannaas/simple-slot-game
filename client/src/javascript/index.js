const notificationBarElement = getElementById("notificationBar");

function getElementById(element) {
    return document.getElementById(element);
}

function drawImage(context, canvas, sourceImage, index) {
    let img = new Image();
    img.onload = () => {
        let newImgWidth = canvas.width / 3;
        context.drawImage(img, index * newImgWidth, 0, newImgWidth, canvas.height);
    };
    img.src = sourceImage;
}

function loadImages(context, canvas, randomNumbers) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < randomNumbers.length; i++) {
        const sourceImage = "src/multimedia/images/Symbol_" + randomNumbers[i] + ".png";
        drawImage(context, canvas, sourceImage, i)
    }
}

function resize(canvas) {
    let wrapperElement = document.getElementById("wrapper");
    canvas.width = wrapperElement.clientWidth;
    canvas.height = wrapperElement.clientHeight;
}

function showSpinOutcome(message, color = "green") {
    notificationBarElement.innerHTML = message;
    notificationBarElement.style.backgroundColor = color;
}

function getOutcome() {
    const canvas = getElementById("gameCanvas");
    const context = canvas.getContext("2d");

    const spinOutcome = () => new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest(),
            method = "GET",
            url = "http://127.0.0.1:3000/getOutcome";

        xhttp.open(method, url, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    setTimeout(function () {
                        const response = JSON.parse(xhttp.responseText);
                        console.log("Spin response", response);
                        loadImages(context, canvas, response.outcome);
                        if (response.isBonus) {
                            console.log("Bonus Spin");
                            showSpinOutcome(response.winType + "\n Bonus Spin!");
                            resolve(spinOutcome());
                        } else {
                            showSpinOutcome(response.winType);
                            resolve(response);
                        }
                    }, 1000);
                } else {
                    showSpinOutcome("Server is currently unavailable. Please try later!", "#ff3a29");
                    reject("Server is currently unavailable. Please reload the game or try it later!");
                }
            }
        };
        xhttp.send();
    });

    return spinOutcome();
}

function initAnimation() {
    document.addEventListener("DOMContentLoaded", (event) => {
        const canvas = getElementById("gameCanvas");
        const context = canvas.getContext("2d");
        if (window.innerWidth < canvas.width) {
            resize(canvas);
        }
        loadImages(context, canvas, [0, 1, 0]);
        document.getElementById("spinButton").addEventListener("click", async (event) => {
            getOutcome().then(response => {
                console.log("Final response after resolving", response);
            }).catch(error => {
                console.log(error);
            });
        });
    });
}

initAnimation();
