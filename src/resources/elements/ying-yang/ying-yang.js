
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class YingYangCustomElement {

    constructor(eventAggregator) {
        this._animate = false;
        this._cycleTime = 10000;
        this._rotationTime = this._cycleTime / 2;
        this._halfRotationTime = this._rotationTime / 2;
        this._angle = 0;
        this._stepCounter = 0;
        this._done = true;
        this.paths = [
            "M197.419,399.968C88.153,398.583,0,309.594,0,200C0,89.543,89.543,0,200,0c0.863,0,1.721,0.021,2.581,0.033 C256.616,1.401,300,45.634,300,100c0,55.229-44.771,100-100,100c-55.229,0-100,44.771-100,100 C100,354.365,143.383,398.599,197.419,399.968z M200,66.666c-18.226,0-33,14.774-33,33s14.774,33,33,33c18.227,0,33-14.774,33-33 S218.227,66.666,200,66.666z",
            "M202.581,0.033C256.616,1.4,300,45.634,300,100c0,55.229-44.771, 100-100,100s-100,44.771-100,100 c0,54.365,43.383,98.6,97.419,99.968c0.86,0.011,1.718,0.032,2.581,0.032c110.457,0,200-89.543,200-200 C400,90.406,311.848,1.417,202.581,0.033z"
        ];
        this.parts = [
            {
                d: this.paths[0].slice(),
                classNames: 'part whiteLeft',
                id: 0
            },
            {
                d: this.paths[1].slice(),
                classNames: 'part whiteRight',
                id: 1
            },
            {
                d: this.paths[0].slice(),
                classNames: 'part blackLeft',
                id: 2
            },
            {
                d: this.paths[1].slice(),
                classNames: 'part blackLeft',
                id: 3
            }
        ];
        this.stageSortOrders = [
            [0, 1, 2, 3],
            [1, 3, 2, 0],
            [2, 3, 0, 1],
            [2, 0, 1, 3]
        ];
        this.handleTransitionEnd = e => {
            if (this._done) { // twee events door twee segmenten
                this._done = !this._done;
                window.requestAnimationFrame(() => {
                    this.rotate();
                    this._done = !this._done;
                });
            }
        };
    }

    attached() {
        document.addEventListener('transitionend', this.handleTransitionEnd);
    }

    detached() {
        document.removeEventListener('transitionend', this.handleTransitionEnd);
    }

    rotate() {
        if (this._animate) {
            this._stepCounter++;
            this.angle = this._stepCounter * 180;
            console.log(this._stepCounter, this.angle);
        }
    }

    get angle() {
        return this._angle;
    }

    set angle(angle) {
        this._angle = angle;
    }

    get duration() {
        return this._halfRotationTime;
    }

    get timing() {
        let timing = (this._stepCounter % 2 == 1) ? 'ease-in' : 'ease-out';
        return timing;
    }

    toggleAnimation() {
        this._animate = !this._animate;
        if (this._animate) {
            this._stepCounter = 0;
            this.rotate();
        }
    }

}