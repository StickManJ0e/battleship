function checkLength(length) {
    if (length < 1) return 1;
    if (length > 5) return 5;
    return length;
}

let Ship = (inputLength, nameInput) => {
    let length = checkLength(inputLength);
    let name = nameInput;
    let hits = [];

    return {
        length,
        name,
        hits,
        hit(position) {
            if ((this.hits).every(element => element.toString() !== position)) {
                this.hits.push(position);
                return;
            }
            return;
            // position = position.toString();
            // if ((this.hits).some(element => element.toString() === position)) {
            //     let index = (this.hits).findIndex(element => element.toString() === position);
            //     this.hits.splice(index, 1);
            //     return this.hits;
            // }
            // return this.hits;
        },
        isSunk() {
            let sunkStatus = (this.hits.length === this.length) ? true : false
            return (sunkStatus);
        }
    };
};

export default Ship;