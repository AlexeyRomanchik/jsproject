function addZero(num) {
    return (num >= 0 && num < 10) ? `0${num}` : num;
}

export default addZero;