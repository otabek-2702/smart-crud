const transformProductsData = (arrProducts, arrCategories, categoryFilter) => {
    let newObjCategories = {};
    arrCategories.map(el => {
        newObjCategories[el._id] = el.name
    })

    let newArrProducts = arrProducts;
    if (categoryFilter) {
        newArrProducts = arrProducts.filter(el => el.category === categoryFilter)
    }

    let newArr = newArrProducts.map((el, i) => {
        const date = new Date(el.createdAt);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        let result = `${day}-${month}-${year}`;


        return { ...el, createdAt: result, category_name: newObjCategories[el.category], ordinal_number: i + 1, };
    });
    return newArr
}

export default transformProductsData