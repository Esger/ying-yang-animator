import { inject, bindable } from 'aurelia-framework';

@inject(Element)
export class PartCustomElement {
    @bindable angle;
    @bindable classNames;
    @bindable index;
    @bindable timingClass;

    constructor(element) {
        this._element = element;
    }

    attached() {
        if (this.classList) {
            this.classList = this.classNames.split(' ').pop().push(this.timingClass).join(' ');
        } else {
            this.classList = this.classNames;
        }
        this.type = (this.index % 2) ? 'closed' : 'open';
        console.log('attached', this.classList);
    }

    detached() {
        console.log('detached');
    }

}
