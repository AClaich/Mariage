<template>
    <div class="container">
        <a-row justify="space-around" align="middle" class="item-ligne">
            <a-col :span="8">
                <a-card class="box-shadow">
                    La réception du mariage se déroulera au Gîte de Rémoulin à Nostang.
                    Vous pourrez donc être hébergé.e.s sur place. Le site possède différents gîtes en pierre dans lesquels
                    vous serez répartis.es.
                    <br>
                    Vous avez la possibilité d’arriver dès le jeudi soir, jusqu’au dimanche après-midi (soit 3 nuits
                    maximum).
                    Pour cela nous vous demandons de nous indiquer vos besoins en termes de logement dans la <RouterLink
                        to="/reponse" class="lien">rubrique
                        Réponse
                        faire-part</RouterLink>.
                </a-card>
            </a-col>
            <a-col :span="4">
                <hr>
            </a-col>
            <a-col :span="8">
                <iframe width="400" height="300" style="border:0" loading="lazy" allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade" class="box-shadow"
                    src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJG1SGiFBCEEgRyc7an2Lf1L4&key=AIzaSyDkYnm0pK44ibW_DNlPGgzNo5VN1weAONg">
                </iframe>
            </a-col>
        </a-row>
        <a-row justify="space-around" align="middle">
            <a-col class="tarif">Tarif : 25 € / personne / nuit</a-col>
        </a-row>
        <a-row justify="space-around" align="middle" class="item-ligne">
            <a-col :span="7" class="text-align">
                <img width="300" src="../assets/8ebd5ac0f43d49ab9448e37b1c3423ad-1920w.jpg" class="box-shadow" />
            </a-col>
            <a-col :span="4">
                <hr>
            </a-col>
            <a-col :span="8">
                <a-card class="box-shadow">
                    <div class="titre">Composition des logements </div> Chaque gîte possède une salle de bain et un WC.
                    Certain possède une petite cuisine équipée. Ces derniers seront réservés pour les personnes qui arrivent
                    dès le jeudi/vendredi.
                    <br><br>
                    Par souci d’organisation, et que chacun.e puisse profiter pleinement du week-end, nous vous remerçions
                    de bien vouloir vous acquitter du montant de la réservation 2 semaines avant le début des festivités
                    (soit le 16 août au plus tard).
                    A compter du 31 mai, vous recevrez un RIB par mail pour effectuer le paiement.
                </a-card>
            </a-col>
        </a-row>

    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
</script>

<style scoped>
.tarif {
    font-family: Parisienne, serif;
    font-size: 28px;
    text-align: center;
    margin-bottom: 15px;
}

.titre {
    font-family: Parisienne, serif;
    font-size: 28px;
    text-align: center;
    margin-bottom: 15px;
}

.lien {
    color: #ff7875;
}

.container {
    padding-top: 36px;
    padding-left: 300px;
    padding-right: 300px;
    width: 100vw;
    height: 100vw;
}

.box-shadow {
    box-shadow: 10px 5px 5px #00000026;
}

.text-align {
    text-align: center;
}

.item-ligne {
    margin-bottom: 36px;
}
</style>