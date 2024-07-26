const transformCreatedAtValue = (arr) => {
    let newArr = arr.map((el, i) => {
        const date = new Date(el.createdAt);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        let result = `${day}-${month}-${year}`;

        return { ...el, createdAt: result, ordinal_number: i + 1, };
    });
    return newArr
}

export default transformCreatedAtValue