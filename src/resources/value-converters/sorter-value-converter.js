export class SorterValueConverter {
    toView(array, propertyName, direction) {

        // console.log('sort: prop: ' + propertyName + " direction: " + direction); 
        return array.slice();
        // let factor = direction === 'ascending' ? 1 : -1;
        // let sortedArray = array.slice(0).sort((a, b) => {
        //     return (a[propertyName] - b[propertyName]) * factor;
        // });
        // return sortedArray;
    }
} 