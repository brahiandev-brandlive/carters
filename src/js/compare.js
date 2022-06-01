// Search Products Compare
const productsCompare = () => {
    const containerCompare = $(document).find('#compare .corpo-comparacao table')
    const productsCompare = $(containerCompare).find('thead tr th')
    const compareValues = $(containerCompare).find('tbody')
    const elementPriceCompare = $(compareValues).find('tr:nth-child(16)')
    setTimeout(() => {
        productsCompare.each(( index, element) => {
            const productID = $(element).attr('class')
            if (productID != undefined) {
                const priceCompare = $(elementPriceCompare).find(`td.${productID}`)
                const product = $(element).find('.produto ul li .price span.best-price').text()
                const price = product.split('Desde ')[1].replace('m²', '')

                priceCompare.text(price)
            }
        });
    }, 3000)
}

$(document).ready( () => {
    productsCompare()
})