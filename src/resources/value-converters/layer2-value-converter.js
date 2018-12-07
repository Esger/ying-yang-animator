export class Layer2ValueConverter {
    toView(value) {
        let parts = value.slice(-2);
        return parts;
    }
}