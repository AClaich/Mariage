<template>
  <div class="container">
    <a-row justify="space-between" align="middle">
      <a-col :span="4">
        <a-card style="width: 400px" class="box-shadow">
          <h3 class="title-card">Mairie</h3>
          Nous vous donnons rendez-vous à 13h devant la mairie de Lanester. Vous
          avez la possibilité de vous garer soit sur le parking du Leclerc, soit
          sur la parking devant la piscine municipale (à 2 minutes à pieds).
        </a-card>
      </a-col>
      <a-col :span="10">
        <iframe
          height="250"
          style="border: 0"
          class="box-shadow"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJyQNQvZJeEEgRcQkVoMvTkD0&key=AIzaSyDkYnm0pK44ibW_DNlPGgzNo5VN1weAONg"
        >
        </iframe>
      </a-col>
    </a-row>
    <a-row justify="space-between" align="middle">
      <a-col :span="8">
        <a-card style="width: 300px" class="box-shadow">
          <h3 class="title-card">Balade</h3>
          Programme en cours de réflexion. Revenez plus tard
        </a-card>
      </a-col>
    </a-row>
    <a-row justify="space-between" align="middle">
      <a-col :span="8">
        <a-card style="width: 300px" class="box-shadow">
          <h3 class="title-card">La réception</h3>
          Le cortège des marié.e.s vous mènera ensuite, à travers les routes de
          campagne, au lieu de réception. Les festivités débuteront à 17h30 avec
          un vin d’honneur au Village de gîtes le Rémoulin, 56 690 Nostang (pour
          plus de détails sur l'hébergement, veuillez consulter la rubrique
          correspondante). Le repas commencera quant à lui vers 20h. Finalement,
          vers 23h, arrivera la très attendue ouverture de bal.
        </a-card>
      </a-col>
    </a-row>
    <a-row justify="space-between" align="middle">
      <a-col :span="8">
        <a-card style="width: 300px" class="box-shadow">
          <h3 class="title-card">Retour de noce</h3>
          La fête continue le lendemain! Laissons nous porter par l’ambiance
          dominicale, avec un repas en extérieur à 12h, et de quoi passer la
          journée dans la joie, le confort et la simplicité. Merci également de
          préciser si vous serez de la partie. Au programme, crêpe partie !
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
</script>

<style scoped>
.box-shadow {
  box-shadow: 10px 5px 5px #00000026;
}
.container {
  padding-top: 36px;
  width: 100vw;
  height: 100vw;
}

.title-card {
  font-family: Parisienne, serif;
  font-size: 28px;
  text-align: center;
  margin-bottom: 15px;
}
</style>
