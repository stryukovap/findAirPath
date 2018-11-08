<template>
    <div id="app">
        <form autocomplete="off" @submit.prevent="" novalidate
              style="display: flex; flex-direction: column;align-items: stretch;
        margin: 0 auto; width: 50%;">
            <label for="departure_code">departure_code</label>
            <input type="text" name="departure_code" id="departure_code"
                   v-model="departure_code">
            <label for="arrival_code">arrival_code</label>
            <input type="text" name="arrival_code" id="arrival_code"
                   v-model="arrival_code">
            <label for="date">date</label>
            <input type="date" name="date" id="date"
                   v-model="date">
            <label for="class">class</label>
            <input type="text" name="class" id="class"
                   v-model="class_">
            <label for="adult_qnt">adult_qnt</label>
            <input type="text" name="adult_qnt" id="adult_qnt"
                   v-model="adult_qnt">
            <button v-if="this.authApp.etm_auth_key" @click="postInitSearch()">getInitSearch</button>
            <!--<button @click="getOffers()">getOffers</button>-->
        </form>
        <Offers :display-details="displayDetails" :display_details="display_details" :offers="offers"/>
    </div>
</template>

<script>
    import {APPID, BASEURL, BASEURLAIR, HTTP_AIR} from './components/http-common';
    import axios from 'axios';
    import Offers from "./components/Offers";
    import {InitSearchModel} from './components/models';

    export default {
        name: 'app',
        components: {Offers},
        data() {
            return {
                display_details: 'none',
                authApp: {
                    etm_auth_key: "string",
                    locale: "string",
                    currency: "string",
                    max_expiry_time: 0,
                    max_timeout: 0
                },
                departure_code: "", arrival_code: "", date: "", class_: "", adult_qnt:"",
                // initSearch: {},
                searchRequest: {},
                offers: {}
            }
        },
        mounted() {
            this.getTokenApp()
        },
        methods: {
            displayDetails: function () {
                this.display_details = (this.display_details === 'none') ? 'block' : 'none';
            },
            getTokenApp: function () {
                // fetch(`${BASEURL}/login/${APPID}`);
                axios
                    .get(`${BASEURL}/login/${APPID}`)
                    .then(response => {
                        window.console.log(response.data);
                        this.authApp = response.data;
                        HTTP_AIR.defaults.headers.common["etm-auth-key"] =
                            `${this.authApp.etm_auth_key}`;
                    })
                    .catch(error => {
                        window.console.log(error);
                    })
            },
            postInitSearch: function () {
                const initSearch = new InitSearchModel(
                    this.departure_code,
                    this.arrival_code,
                    this.date,
                    this.adult_qnt,
                    this.class_
                );
                window.console.log(initSearch);
                HTTP_AIR.post('/search', initSearch)
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
                HTTP_AIR.get(`/offers/?request_id=${this.searchRequest.request_id}`, {
                    // _method: "GET"
                })
                    .then(response => {
                        window.console.log(response);
                        if (response.data.status === "InProcess"){
                            window.console.log('InProgress');
                            const timerId = setTimeout(this.getOffers(), 1000);
                            clearTimeout(timerId);
                        } else {
                            this.offers = response.data;
                        }
                    })
                    .catch(error => {
                        window.console.log(error);
                    })
            }
        }
    }

</script>

