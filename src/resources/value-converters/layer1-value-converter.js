export class Layer1ValueConverter {
    toView(value) {
        let parts = value.slice(0, 2);
        return parts;
    }
}