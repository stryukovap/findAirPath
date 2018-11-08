export function InitSearchModel(departure_code,
    arrival_code,
    date,
    adult_qnt,
    class_) {
    this.adult_qnt = adult_qnt;
    this.class = class_;
    this.directions = [{
        departure_code,
        arrival_code,
        date
    }];
}

// initSearch: {
//     directions: [
//         {
//             departure_code: "ODS",
//             arrival_code: "IEV",
//             date: "2018-12-21",
//             time: "M"
//         }
//     ],
//     adult_qnt: 1,
//     child_qnt: 0,
//     infant_qnt: 0,
//     passenger_category: "ADT",
//     class: "E",
//     direct: true,
//     flexible: true,
//     max_price: 50,
//     airlines: [
//         //"SU",
//        // "HR"
//     ],
//     fare_types: [
//         "PUB",
//         "NEG"
//     ]
// },
// }