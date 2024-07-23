<template>
  <div class="container">
    <a-row justify="center" align="middle">
      <a-col class="rendez-vous">Rendez-vous le 31 août 2024</a-col>
    </a-row>
    <a-row justify="space-around" align="middle" class="item-ligne">
      <a-col :span="7">
        <a-card class="box-shadow">
          <h3 class="title-card">Mairie</h3>
          Nous vous donnons rendez-vous à 13h devant la mairie de Lanester. Vous
          avez la possibilité de vous garer soit sur le parking du Leclerc, soit
          sur le parking devant la piscine municipale (à 2 minutes à pieds).
        </a-card>
      </a-col>
      <a-col :span="4">
        <hr />
      </a-col>
      <a-col :span="7">
        <iframe
          width="400"
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
    <a-row justify="space-around" align="middle" class="item-ligne">
      <a-col :span="7" class="text-align">
        <img
          width="200"
          src="../assets/6a2b5c2e777f44abbbf8b4cf652aa16e-1920w.jpg"
          class="box-shadow"
        />
      </a-col>
      <a-col :span="4">
        <hr />
      </a-col>
      <a-col :span="7">
        <a-card style="width: 400px" class="box-shadow">
          <h3 class="title-card">Balade</h3>
          Après la mairie, le cortège se dirigera au gîte de Rémoulin, où vous pourrez prendre le temps de vous répartir dans vos chambres attitrées et de poser vos valises.<br>
          Pour ceux qui le souhaitent, il sera organisé une balade champêtre automobile, le long des côtes et du Golfe du Morbihan. 
          Les autres pourront profiter du site de Remoulin, en attendant.<br> Nous nous retrouverons pour le vin d'Honneur à 17h30.
        </a-card>
      </a-col>
    </a-row>
    <a-row justify="space-around" align="middle" class="item-ligne">
      <a-col :span="7">
        <a-card style="width: 400px" class="box-shadow">
          <h3 class="title-card">La réception</h3>
          Les festivités débuteront à 17h30 avec
          un vin d’honneur au Gîtes le Rémoulin, 56 690 Nostang (pour plus de
          détails sur l'hébergement,
          <RouterLink to="/hebergement" class="lien"
            >veuillez consulter la rubrique correspondante</RouterLink
          >). Le repas commencera quant à lui vers 20h. Et arrivera la très
          attendue ouverture de bal vers 23h.
        </a-card>
      </a-col>

      <a-col :span="4">
        <hr />
      </a-col>
      <a-col :span="7" class="text-align">
        <img
          width="300"
          src="../assets/03e2850fa59e40d19fd0604df2cb1658-1920w.jpg"
          class="box-shadow"
        />
      </a-col>
    </a-row>
    <a-row justify="space-around" align="middle" class="item-ligne">
      <a-col :span="7" class="text-align">
        <img
          width="200"
          src="../assets/12489e3e0c1a405f99eadac7a5a3685e-1920w.jpg"
          class="box-shadow"
        />
      </a-col>
      <a-col :span="4">
        <hr />
      </a-col>
      <a-col :span="7">
        <a-card style="width: 400px" class="box-shadow">
          <h3 class="title-card">Retour de noce</h3>
          La fête continue le lendemain! Laissons nous porter par l’ambiance
          dominicale, avec un repas en extérieur à 12h et des activités libres et diverses (pensez à rapportez vos boules de pétanques)          <br>
          Tout ce qu'il faut pour passer la journée dans la joie, le confort et la simplicité. 
          Merci également de préciser si vous serez des nôtres. Au programme, crêpe partie !
          <br>          <br>
          <bold>Ce jour, les enfants sont évidemment les bienvenus pour passer ce lendemain de noce avec nous.</bold>
        </a-card>
      </a-col>
    </a-row>
  </div>
  <div class="container-mobile">
    <a-row
      justify="center"
      align="middle"
      class="item-ligne"
      :gutter="[16, 16]"
    >
      <a-col :span="24">
        <a-card class="box-shadow">
          <h3 class="title-card">Mairie</h3>
          Nous vous donnons rendez-vous à 13h devant la mairie de Lanester. Vous
          avez la possibilité de vous garer soit sur le parking du Leclerc, soit
          sur le parking devant la piscine municipale (à 2 minutes à pieds).
        </a-card>
      </a-col>
      <a-col>
        <iframe
          height="300"
          style="border: 0"
          class="box-shadow"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJyQNQvZJeEEgRcQkVoMvTkD0&key=AIzaSyDkYnm0pK44ibW_DNlPGgzNo5VN1weAONg"
        >
        </iframe>
      </a-col>
      <a-col :span="24">
        <a-card class="box-shadow">
          <h3 class="title-card">Balade</h3>
          Après la mairie, le cortège se dirigera au gîte de Rémoulin, où vous pourrez prendre le temps de vous répartir dans vos chambres attitrées et de poser vos valises.<br>
          Pour ceux qui le souhaitent, il sera organisé une balade champêtre automobile, le long des côtes et du Golfe du Morbihan. 
          Les autres pourront profiter du site de Remoulin, en attendant.<br> Nous nous retrouverons pour le vin d'Honneur à 17h30.
        </a-card>
      </a-col>
      <a-col :span="24" class="text-align">
        <img
          width="200"
          src="../assets/6a2b5c2e777f44abbbf8b4cf652aa16e-1920w.jpg"
          class="box-shadow"
        />
      </a-col>
      <a-col :span="24">
        <a-card class="box-shadow">
          <h3 class="title-card">La réception</h3>
          Les festivités débuteront à 17h30 avec
          un vin d’honneur au Gîtes le Rémoulin, 56 690 Nostang (pour plus de
          détails sur l'hébergement,
          <RouterLink to="/hebergement" class="lien"
            >veuillez consulter la rubrique correspondante</RouterLink
          >). Le repas commencera quant à lui vers 20h. Et arrivera la très
          attendue ouverture de bal vers 23h.
        </a-card>
      </a-col>
      <a-col :span="24" class="text-align">
        <img
          width="300"
          src="../assets/03e2850fa59e40d19fd0604df2cb1658-1920w.jpg"
          class="box-shadow"
        />
      </a-col>
      <a-col :span="24">
        <a-card class="box-shadow">
          <h3 class="title-card">Retour de noce</h3>
          La fête continue le lendemain! Laissons nous porter par l’ambiance
          dominicale, avec un repas en extérieur à 12h et des activités libres et diverses (pensez à rapportez vos boules de pétanques)          <br>
          Tout ce qu'il faut pour passer la journée dans la joie, le confort et la simplicité. 
          Merci également de préciser si vous serez des nôtres. Au programme, crêpe partie !
          <br>          <br>
          <bold>Ce jour, les enfants sont évidemment les bienvenus pour passer ce lendemain de noce avec nous.</bold>
        </a-card>
      </a-col>
      <a-col :span="24" class="text-align">
        <img
          width="200"
          src="../assets/12489e3e0c1a405f99eadac7a5a3685e-1920w.jpg"
          class="box-shadow"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
</script>

<style scoped>
.rendez-vous {
  font-family: Parisienne, serif;
  font-size: 28px;
  text-align: center;
  margin-bottom: 15px;
}

.lien {
  color: #ff7875;
}

.text-align {
  text-align: center;
}

.item-ligne {
  @media (min-width: 1024px) {
    margin-bottom: 36px;
  }
}

.box-shadow {
  box-shadow: 10px 5px 5px #00000026;
}

.container {
  padding-top: 36px;
  padding-left: 300px;
  padding-right: 300px;
  width: 100vw;
  height: 100%;

  @media (max-width: 1537px) {
    padding-top: 36px;
    padding-left: 100px;
    padding-right: 100px;
    width: 100vw;
    height: 100%;
  }

  @media (max-width: 1023px) {
    display: none;
  }
}

.container-mobile {
  @media (min-width: 1024px) {
    display: none;
  }
  @media (max-width: 1023px) {
    padding: 0 0px;
  }
}

.title-card {
  font-family: Parisienne, serif;
  font-size: 28px;
  text-align: center;
  margin-bottom: 15px;
}

bold{
  font-weight: bold;
}
</style>
