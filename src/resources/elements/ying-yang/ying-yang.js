import { inject } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator, BindingSignaler)
export class YingYangCustomElement {

    constructor(eventAggregator, bindingSignaler) {
        this._bindingSignaler = bindingSignaler;
        this.animate = false;
        this._cycleTime = 10000;
        this._rotationTime = this._cycleTime / 2;
        this._halfRotationTime = this._rotationTime / 2;
        this.angle = 0;
        this._stepCounter = 0;
        this._done = true;
        this._stageSortOrders = [
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
        this.parts = [
            {
                classNames: 'part whiteLeft ',
                index: 0,
                id: 0
            },
            {
                classNames: 'part whiteRight ',
                index: 1,
                id: 1
            },
            {
                classNames: 'part blackLeft ',
                index: 2,
                id: 2
            },
            {
                classNames: 'part blackRight ',
                index: 3,
                id: 3
            }
        ];
        document.addEventListener('transitionend', this.handleTransitionEnd);
        console.log(this.parts);
    }

    detached() {
        document.removeEventListener('transitionend', this.handleTransitionEnd);
    }

    type(i) {
        return this.parts[i].type;
    }

    _restore() {
        this.parts = this._backupParts.slice();
    }

    _setSortIndexes() {
        let sortOrder = this._stageSortOrders[this._stepCounter % 4];
        for (let i = 0; i < this.parts.length; i++) {
            const part = this.parts[i];
            part.index = sortOrder[part.id];
        }
        this._bindingSignaler.signal('sortOrder-changed');
    }

    rotate() {
        // this._animate = !this._animate;
        this._bindingSignaler.signal('sortOrder-changed');
        this._setSortIndexes();
        if (this.animate) {
            this._stepCounter++;
            this.angle = this._stepCounter * 180;
            console.log(this._stepCounter, this.angle);
        }
    }

    get duration() {
        return this._halfRotationTime;
    }

    get timing() {
        let timing = (this._stepCounter % 2 == 1) ? 'ease-in' : 'ease-out';
        return timing;
    }


}