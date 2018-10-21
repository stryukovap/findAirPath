<template>
    <ul>
        <li v-for="(offer, index) in offers.offers" :key="index"
            @click="displayDetails">
            <img :src="offer.carrier_logo"
                 alt="carrier logo" width="100">
            <span>{{offer.carrier_name}}</span>
            <detailOffer v-bind:style="{display: display_details}" :offer="offer"/>
        </li>
    </ul>
</template>
<style>
    li:hover{
        cursor: pointer;
    }
</style>
<script>
    import DetailOffer from "./DetailOffer"

    export default {
        name: 'Offers',
        components: {DetailOffer},
        props: {
            displayDetails: {},
            display_details: {},
            offers: {}
        }
    }
</script>
