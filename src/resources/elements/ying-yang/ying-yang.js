export class YingYangCustomElement {

    constructor() {
        this._animationId = null;
        this._animate = false;
        this._rotationTime = 5000;
        this._halfRotationTime = 2500;
        this.angle = 0;
    }

    attached() {
        this.rotate();
    }

    toggleAnimation() {
        this._animate = !this._animate;
        this._startMillis = Date.now();
        this.rotate();
    }

    rotate() {
        if (this._animate) {
            let millisPassed = Date.now() - this._startMillis;
            this.angle = (millisPassed % this._rotationTime) / this._rotationTime * 360;
            // console.log(this.angle);
            this._animationId = requestAnimationFrame(() => { this.rotate(); });
        } else {
            cancelAnimationFrame(this._animationId);
        }
    }

}