export default function correctFirstZero(item) {
    if (item < 10) {
        item = `0${item}`;
    }
    return item;
}
