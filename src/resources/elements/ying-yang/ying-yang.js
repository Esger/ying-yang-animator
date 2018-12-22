
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator, Element)
export class YingYangCustomElement {

    constructor(eventAggregator, element) {
        this._element = element;
        this._animate = false;
        this._cycleTime = 10000;
        this._rotationTime = this._cycleTime / 2;
        this.timingClass = 'ease-in';
        this.duration = this._rotationTime / 2;
        this._stepCounter = 0;
        this.angle = 0;
        this._done = true;
        this.paths = [
            "M197.419,399.968C88.153,398.583,0,309.594,0,200C0,89.543,89.543,0,200,0c0.863,0,1.721,0.021,2.581,0.033 C256.616,1.401,300,45.634,300,100c0,55.229-44.771,100-100,100c-55.229,0-100,44.771-100,100 C100,354.365,143.383,398.599,197.419,399.968z M200,66.666c-18.226,0-33,14.774-33,33s14.774,33,33,33c18.227,0,33-14.774,33-33 S218.227,66.666,200,66.666z",
            "M202.581,0.033C256.616,1.4,300,45.634,300,100c0,55.229-44.771, 100-100,100s-100,44.771-100,100 c0,54.365,43.383,98.6,97.419,99.968c0.86,0.011,1.718,0.032,2.581,0.032c110.457,0,200-89.543,200-200 C400,90.406,311.848,1.417,202.581,0.033z"
        ];
        this.parts = [
            {
                d: this.paths[0].slice(),
                classNames: 'part whiteLeft ',
                layer: 0,
                id: 0
            },
            {
                d: this.paths[1].slice(),
                classNames: 'part whiteRight ',
                layer: 1,
                id: 1
            },
            {
                d: this.paths[0].slice(),
                classNames: 'part blackLeft ',
                layer: 2,
                id: 2
            },
            {
                d: this.paths[1].slice(),
                classNames: 'part blackRight ',
                layer: 3,
                id: 3
            },
        ];
        this.handleTransitionEnd = (event) => {
            this._setSortIndexes();
            setTimeout(() => {
                this._rotate();
            });
        };
    }

    attached() {
        this._setSortIndexes();
        this._transitionEndListener = document.addEventListener('transitionend', (event) => {
            let $element = $(event.target);
            let trigger = $element.hasClass('blackLeft') && !$element.hasClass('aurelia-hide');
            if (trigger) {
                this.handleTransitionEnd(event);
            }
        });
        setTimeout(() => {
            this._rotate();
        });
    }

    detached() {
        if (this._transitionEndListener) {
            document.removeEventListener('transitionend', this.handleTransitionEnd);
        }
    }

    _setSortIndexes() {
        let stageSortOrders = [
            [3, 1, 2, 0],
            [2, 0, 3, 1],
            [0, 2, 1, 3],
            [1, 3, 0, 2]
        ];
        let sortOrder = stageSortOrders[this._stepCounter % 4];
        for (let i = 0; i < this.parts.length; i++) {
            const part = this.parts[i];
            part.layer = sortOrder[part.id];
        }
    }

    _rotate() {
        this._stepCounter++;
        this.timingClass = (this._stepCounter % 2 == 1) ? 'ease-in' : 'ease-out';
        this.angle = this._stepCounter * 180;
    }

    toggleAnimation() {
        // this.angle = 0;
        // this._stepCounter = 0;
        this._rotate();
    }

}