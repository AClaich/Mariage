<template>
    <div class="container">
        <a-row justify="space-around">
            <a-col :span="4">
                <a-card style="width: 300px">
                    Mairie : Nous vous donnons rendez-vous à 13h devant la mairie de Lanester.
                    Vous avez la possibilité de vous garer soit sur le parking du Leclerc,
                    soit sur la parking devant la piscine municipale (à 2 minutes à pieds) maps adresse
                </a-card>
            </a-col>
            <a-col :span="8">
                <iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJyQNQvZJeEEgRcQkVoMvTkD0&key=AIzaSyDkYnm0pK44ibW_DNlPGgzNo5VN1weAONg">
                </iframe>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="8">
                <a-card style="width: 300px">
                    Balade : Programme en cours de réflexion. Revenez plus tard
                </a-card>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="8">
                <a-card style="width: 300px">
                    La réception : Le cortège des marié.e.s vous mènera ensuite, à travers les routes de campagne, au lieu
                    de
                    réception.
                    Les
                    festivités débuteront à 17h30 avec un vin d’honneur au Village de gîtes le Rémoulin, 56 690 Nostang
                    (pour
                    plus
                    de
                    détails sur l'hébergement, veuillez consulter la rubrique correspondante). Le repas commencera quant à
                    lui
                    vers
                    20h.
                    Finalement, vers 23h, arrivera la très attendue ouverture de bal.
                </a-card>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="8">
                <a-card style="width: 300px">

                    Retour de noce : La fête continue le lendemain!
                    Laissons nous porter par l’ambiance dominicale, avec un repas en extérieur à 12h, et de quoi passer la
                    journée
                    dans
                    la
                    joie, le confort et la simplicité. Merci également de préciser si vous serez de la partie. Au programme,
                    crêpe
                    partie !
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vw;
    /* background: linear(90deg, #F7D08A, white, #F7D08A); */
}
</style>