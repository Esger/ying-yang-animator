import { inject, bindable } from 'aurelia-framework';

@inject(Element)
export class PartCustomElement {
    @bindable angle;
    @bindable classNames;
    @bindable index;

    constructor(element) {
        this._element = element;
    }

    attached() {
        this.type = (this.index % 2) ? 'closed' : 'open';
    }

}
