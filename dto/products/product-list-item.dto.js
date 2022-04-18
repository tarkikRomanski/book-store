function ProductListItemDto(id, price, title, image, category) {
    return {
        id,
        price,
        title,
        image,
        category: category || null,
    }
}

module.exports = ProductListItemDto
