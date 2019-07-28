export default class GameModel {
    constructor() {

    }

    getOutcome() {
        const spinOutcome = () => new Promise((resolve, reject) => {
            let xhttp = new XMLHttpRequest(), //create request to server
                method = "GET",
                url = "http://127.0.0.1:3000/getOutcome";

            xhttp.open(method, url, true);
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        const response = JSON.parse(xhttp.responseText);
                        resolve(response);
                    } else {
                        reject("Server is currently unavailable. Please reload the game or try it later!");
                    }
                }
            };
            xhttp.send(); // send request to server
        });
        return spinOutcome();
    }

}
