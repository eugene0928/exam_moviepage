
function createEl (...elems) {
    return elems.map( el => document.createElement(el) )
}