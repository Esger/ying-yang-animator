import { inject, bindable } from 'aurelia-framework';

@inject(Element)
export class PartCustomElement {
    @bindable angle;
    @bindable classNames;
    @bindable path;

    constructor(Element) {
        this._element = Element;
        this._$element = $(this._element);
    }

    attached() {
        console.log(this.angle, this.classNames, this.path);
    }

}
