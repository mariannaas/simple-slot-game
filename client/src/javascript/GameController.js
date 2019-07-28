import GameModel from "./GameModel.js";
import GameView from "./GameView.js";

export default class GameController {
    constructor() {
        this.gameModel = new GameModel();
    }


    processOutcome() {
        this.gameModel.getOutcome().then(response => {
            console.log('Got response: ', response);

            setTimeout(function () {
                this.gameView.loadImages(response.outcome);

                if (response.isBonus) {
                    this.gameView.showSpinOutcome(response.winType + "\n Bonus Spin!");
                    this.processOutcome();

                } else {
                    this.gameView.showSpinOutcome(response.winType);
                    this.gameView.toggleButtonState(this.spinButton);
                }
            }.bind(this), 1000);

            console.log("Final response after resolving", response);
        }).catch(error => {
            this.gameView.showSpinOutcome(error.toString(), "#ff3a29");
        });
    }

    initAnimation() {
        document.addEventListener("DOMContentLoaded", (event) => {
            const canvas = document.getElementById("gameCanvas");
            const context = canvas.getContext("2d");
            this.spinButton = document.getElementById("spinButton");

            this.gameView = new GameView(canvas, context, this.spinButton);
            if (window.innerWidth < canvas.width) {
                this.gameView.resizeCanvas();
            }
            this.gameView.loadImages([0, 1, 0]);
            this.spinButton.addEventListener("click", async (event) => {
                this.gameView.toggleButtonState(this.spinButton);
                console.log('CLiked on spin button');
                this.processOutcome();
            });
        });
    }
}
