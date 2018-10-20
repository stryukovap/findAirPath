<template>
    <div id="app">
        <!--<div>{{authApp.etm_auth_key}}</div>-->
        <form autocomplete="off" @submit.prevent="" novalidate>
            <label for="departure_code">departure_code</label>
            <input type="text" name="departure_code" id="departure_code" v-model="this.initSearch.directions[0].departure_code">
            <label for="arrival_code">arrival_code</label>
            <input type="text" name="arrival_code" id="arrival_code" v-model="this.initSearch.directions[0].arrival_code">
            <label for="date">date</label>
            <input type="date" name="date" id="date" v-model="this.initSearch.directions[0].date">
            <label for="class">class</label>
            <input type="text" name="class" id="class" v-model="this.initSearch.class">
            <button v-if="this.authApp.etm_auth_key" @click="postInitSearch">getInitSearch</button>
        </form>
    </div>
</template>

<script>
    import {app_id} from './components/http-common';
    import axios from 'axios';

    export default {
        name: 'app',
        components: {},
        data() {
            return {
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
                searchRequest:{
                    "status": "ok",
                    "message": "Нет ошибок",
                    "request_id": 0
                }
            }
        },
        mounted(){
            this.getTokenApp()
        },
        methods: {
            getTokenApp: function () {
                axios
                    .get(`https://api-stage.etm-system.com/api/login/${app_id}`)
                    .then(response => {
                        window.console.log(response);
                        this.authApp = response.data;
                    })
                    .catch(error => {
                        window.console.log(error);
                    })
            }
            ,
            postInitSearch: function () {
                const HTTP_air = axios.create({
                    baseURL:'https://api-stage.etm-system.com/api/air',
                    headers: {
                        Authorization: this.authApp.etm_auth_key
                    },
                });
                HTTP_air.post('/search', this.initSearch)
                    .then(response=>{
                        window.console.log(response);
                        this.searchRequest = response.data;
                    })
                    .catch(error => {
                        window.console.log(error);
                    })
            },
            // postInitSearch: function () {
            //     const HTTP_air = axios.create({
            //         baseURL:'https://api-stage.etm-system.com/api/dictionaries/airports',
            //         headers: {
            //             Authorization: this.authApp.etm_auth_key
            //         },
            //     });
            //     HTTP_air.get('')
            //         .then(response=>{
            //             window.console.log(response);
            //             this.searchRequest = response.data;
            //         })
            //         .catch(error => {
            //             window.console.log(error);
            //         })
            // }
        }
    }
</script>

<style>

</style>
