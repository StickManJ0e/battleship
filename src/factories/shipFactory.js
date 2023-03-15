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
            }
        },
        isSunk() {
            let sunkStatus = (this.hits.length === this.length) ? true : false
            return sunkStatus;
        }
    };
};

export default Ship;
