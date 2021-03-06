class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.intervalId = null;
        this.isPlaying = false;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        this.view.renderStartScreen();
    }

    update() {
        this.game.movePieceDown();
        this.updateView();
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }

    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }

    updateView() {
        if(!this.isPlaying){
            this.view.renderPauseScreen();
        } else {
            this.view.renderMainScreen(this.game.getState());
        }
    }

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100;

        if(!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update();
             }, speed > 0 ? speed : 100);
        }
    }

    stopTimer() {
        if(this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    handleKeyDown(event) {
        switch (event.keyCode){
            case 13: // Enter arrow
                if (this.isPlaying){
                    this.pause();
                } else {
                    this.play();
                }
                break;
            case 37: // Left arrow
                this.game.movePieceLeft();
                this.view.renderMainScreen(game.getState());
                break;
            case 38: // Up arrow
                this.game.rotatePiece();
                this.view.renderMainScreen(game.getState());
                break;
            case 39: // Right arrow
                this.game.movePieceRigth();
                this.view.renderMainScreen(game.getState());
                break;
            case 40: // Down arrow
                this.game.movePieceDown();
                this.view.renderMainScreen(game.getState());
                break;
        }
    }
}

export default Controller;