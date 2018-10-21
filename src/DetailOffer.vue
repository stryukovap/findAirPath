<template>
    <ul>
        <li v-for="off in offer.offers">
            <ul>
                <li v-for="segment in off.segments">
                    <!--<span>{{segment.departure_airport}}</span>-->
                    <!--<span>{{segment.arrival_airport}}</span>-->
                    <!--<span>{{segment.duration_minutes}}</span>-->
                    <ul>
                        <ul v-for="flightInfo in segment.flights_info">
                            <li>date departure: {{flightInfo.date}}</li>
                            <li>date arrival: ***</li>
                            <li>departure_airport: {{flightInfo.departure_airport}}</li>
                            <li>arrival_airport: {{flightInfo.arrival_airport}}</li>
                            <li>duration_formated: {{flightInfo.duration_formated}}</li>
                        </ul>
                        <li>{{segment.price}}</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</template>
<style lang="scss" scoped>
    ul{
        padding: 0;
        display: contents;
    }
    li{
        list-style: none;
    }
</style>
<script>
    export default {
        name: 'detailOffer',
        props: {
            offer: {}
        }
    }
</script>
