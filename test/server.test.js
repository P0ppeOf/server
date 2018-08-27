import should from 'should'

function add(a, b) {
    return a+b
}
function concat(a, b) {

}



describe('Mon premier groupe de test', () => {
    describe('test add with numbers', () => {
    it('should be succesful', () => {
        should.equal(add(2, 2), 4)
    })})
    describe('test add with strings', () => {
        it('should be succesful', () => {
    should.equal(add("mer", "guez"), "merguez")
        })})

})