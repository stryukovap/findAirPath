<template>
    <ul>
        <li v-for="(off, index) in offer.offers" class="detail" :key="index">
            <ul>
                <li v-for="(segment, index) in off.segments" :key="index">
                    <ul>
                        <ul v-for="(flightInfo, index) in segment.flights_info" :key="index">
                            <li>date departure: {{flightInfo.departure_date}}</li>
                            <li>date arrival: {{flightInfo.arrival_date}}</li>
                            <li>departure airport: {{flightInfo.departure_airport}}</li>
                            <li>arrival airport: {{flightInfo.arrival_airport}}</li>
                            <li>duration: {{flightInfo.duration_formated}}</li>
                        </ul>
                        <li>price: {{segment.price}}</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</template>
<style lang="scss" scoped>
    ul {
        padding: 0;
        display: contents;
    }

    li {
        list-style: none;
        display: inline-flex;
    }
    .detail{
        display: block;
        & li{
            margin:5px;
        }
    }
</style>
<script>
    import correctFirstZero from './correctFirstZero';

    export default {
        name: 'detailOffer',
        props: {
            offer: {}
        },
        data() {
            return {}
        },
        methods: {
            calcDateArrival: function (date_departure,
                                       departure_local_time,
                                       departure_timezone,
                                       duration) {
                // window.console.log(date_departure,
                //     departure_local_time,
                //     departure_timezone,
                //     duration);
                const departure = new Date(
                    `${date_departure} ${departure_local_time} ${departure_timezone}`);
                // window.console.log(departure);
                const temp_arrival =
                    new Date(departure.setMinutes(departure.getMinutes() + duration));
                const year = temp_arrival.getFullYear();
                const day = correctFirstZero(temp_arrival.getDate());
                const month = correctFirstZero(temp_arrival.getMonth() + 1);
                // window.console.log(temp_arrival);
                return `${year}-${month}-${day}`
            }
        }
    }
</script>
