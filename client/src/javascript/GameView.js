export default class GameView {
    constructor(canvas, context, spinButton) {
        this.canvas = canvas;
        this.context = context;
        this.spinButton = spinButton;
        this.firstImageWasLoaded = false;
        this.notificationBarElement = document.getElementById("notificationBar")
    }

    loadImages(randomNumbers) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < randomNumbers.length; i++) {
            const sourceImage = "src/multimedia/images/Symbol_" + randomNumbers[i] + ".png";
            this.drawImage(sourceImage, i)
        }
    }

    drawImage(sourceImage, index) {
        let img = new Image();
        img.onload = () => {
            let newImgWidth = this.canvas.width / 3;
            let newImgHeight = newImgWidth * (img.height / img.width);

            if (this.firstImageWasLoaded === false) {
                this.setCanvasHeight(newImgHeight);
            }

            this.firstImageWasLoaded = true;
            this.context.drawImage(img, index * newImgWidth, 0, newImgWidth, newImgHeight);

        };
        img.src = sourceImage;
    }

    setCanvasHeight(newImgHeight) {
        this.canvas.height = newImgHeight;
    }

    resizeCanvas() {
        const wrapperElement = getElementById("wrapper");
        this.canvas.width = wrapperElement.clientWidth;
        this.canvas.height = wrapperElement.clientHeight;
    }

    showSpinOutcome(message, color = "green") {
        this.notificationBarElement.innerHTML = message;
        this.notificationBarElement.style.backgroundColor = color;
    }

    toggleButtonState() {
        let disabledStatus,
            filterValue;

        if (this.spinButton.disabled === true) {
            disabledStatus = false;
            filterValue = "none";
        } else {
            disabledStatus = true;
            filterValue = "grayscale(100%)";
        }
        this.spinButton.disabled = disabledStatus;
        this.spinButton.style.filter = filterValue;
    }
}
