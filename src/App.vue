<template>
    <div id="app">
        <form autocomplete="off" @submit.prevent="" novalidate
              style="display: flex; flex-direction: column;align-items: stretch;
        margin: 0 auto; width: 50%;">
            <label for="departure_code">departure_code</label>
            <input type="text" name="departure_code" id="departure_code"
                   v-model="this.initSearch.directions[0].departure_code">
            <label for="arrival_code">arrival_code</label>
            <input type="text" name="arrival_code" id="arrival_code"
                   v-model="this.initSearch.directions[0].arrival_code">
            <label for="date">date</label>
            <input type="date" name="date" id="date"
                   v-model="this.initSearch.directions[0].date">
            <label for="class">class</label>
            <input type="text" name="class" id="class"
                   v-model="this.initSearch.class">
            <button v-if="this.authApp.etm_auth_key" @click="postInitSearch">getInitSearch</button>
            <button v-if="this.authApp.etm_auth_key" @click="getParamsSearch">getProviders</button>
        </form>
        <Offers :display-details="displayDetails" :display_details="display_details" :offers="offers"/>
    </div>
</template>

<script>
    import {APPID, BASEURL, HTTP_AIR} from './components/http-common';
    import axios from 'axios';
    import Offers from "./components/Offers";

    export default {
        name: 'app',
        components: {Offers},
        data() {
            return {
                display_details:'none',
                authApp: {
                    etm_auth_key: "string",
                    locale: "string",
                    currency: "string",
                    max_expiry_time: 0,
                    max_timeout: 0
                },
                initSearch: {
                    directions: [
                        {
                            departure_code: "MOW",
                            arrival_code: "LED",
                            date: "2018-12-21",
                            time: "M"
                        }
                    ],
                    adult_qnt: 1,
                    child_qnt: 0,
                    infant_qnt: 0,
                    passenger_category: "ADT",
                    class: "E",
                    direct: true,
                    flexible: true,
                    max_price: 50,
                    airlines: [
                        "SU",
                        "HR"
                    ],
                    fare_types: [
                        "PUB",
                        "NEG"
                    ]
                },
                searchRequest: {
                    "status": "ok",
                    "message": "Нет ошибок",
                    "request_id": 0
                },
                offers: {
                    status: "inProcess",
                    message: "Нет ошибок",
                    is_round: true,
                    is_multy: false,
                    currency: "RUB",
                    available_currencies: [
                        "EUR",
                        "RUB"
                    ],
                    sort: "price",
                    directions: [
                        {
                            dir_number: 1,
                            date: "2018-04-28",
                            departure_code: "MOW",
                            departure_name: "Москва",
                            departure_country: "RU",
                            arrival_code: "LED",
                            arrival_name: "Санкт-Петербург",
                            arrival_country: "RU"
                        }
                    ],
                    offers: [
                        {
                            carrier_code: "SU",
                            carrier_name: "Аэрофлот",
                            carrier_logo: "https://crm.etm-system.com/images/airline/SU.png",
                            min_price: 5320,
                            offers: [
                                {
                                    min_price: 5320,
                                    segments: [
                                        {
                                            segment_id: 881516214,
                                            buy_id: "839493372_881516214",
                                            dir_number: 1,
                                            flight_number: "205",
                                            flight_carrier_code: "SU",
                                            flight_carrier_name: "Аэрофлот",
                                            departure_airport: "VKO",
                                            departure_timestamp: 1524888600,
                                            arrival_airport: "LED",
                                            arrival_timestamp: 1524888600,
                                            duration_formated: "1 ч 20 мин",
                                            duration_minutes: 80,
                                            stops: 0,
                                            flights_info: [
                                                {
                                                    date: "2018-04-28",
                                                    departure_country: "RU",
                                                    departure_city: "Москва",
                                                    departure_airport: "VKO",
                                                    departure_terminal: "string",
                                                    departure_local_time: "08:20",
                                                    departure_timezone: "GMT+03:00",
                                                    arrival_country: "RU",
                                                    arrival_city: "Санкт-Перебург",
                                                    arrival_airport: "LED",
                                                    arrival_terminal: "string",
                                                    arrival_local_time: "09:40",
                                                    arrival_timezone: "GMT+03:00",
                                                    flight_number_print: "SU-205",
                                                    duration_formated: "1 ч 20 мин",
                                                    stop_time: "9 ч 40 мин"
                                                }
                                            ],
                                            tarif: "NVUR",
                                            class: "N",
                                            price: 6975,
                                            baggage: "1PC"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        },
        mounted() {
            this.getTokenApp()
        },
        methods: {
            displayDetails: function(){
                this.display_details = (this.display_details === 'none') ? 'block' : 'none';
            },
            getTokenApp: function () {
                axios
                    .get(`${BASEURL}/login/${APPID}`)
                    .then(response => {
                        window.console.log(response.data);
                        this.authApp = response.data;
                        HTTP_AIR.defaults.headers.common["etm_auth_key"] =
                            `${this.authApp.etm_auth_key}`;
                        HTTP_AIR.defaults.headers.common['accept'] =
                            "application/json";
                    })
                    .catch(error => {
                        window.console.log(error);
                    })
            },
            getParamsSearch:function(){
                HTTP_AIR.get('/providers')
                    .then(response => {
                        window.console.log(response);
                        // this.searchRequest = response.data;
                    })
                    .catch(error => {
                        window.console.log(error);
                    })
            },
            postInitSearch: function () {
                HTTP_AIR.post('/search', this.initSearch)
                    .then(response => {
                        window.console.log(response.data);
                        this.searchRequest = response.data;
                        this.getOffers()
                    })
                    .catch(error => {
                        window.console.log(error);

                    })
            },
            getOffers: function () {
                HTTP_AIR.get(`/offers/${this.searchRequest.request_id}`, {
                    _method: "GET"
                })
                    .then(response => {
                        // window.console.log(response);
                        this.offers = response.data;
                    })
                    .catch(error => {
                        window.console.log(error);
                    })
            },
        }
    }
</script>

