<template>
    <div class="container">
        <h1 class="bienvenue">
            Bienvenue
        </h1>
        <p>
            Il nous tarde de vous retrouver pour célébrer ces années d’amour déjà passées et celles encore à venir.
            Ce site internet est à votre disposition pour retrouver toutes les informations relatives au mariage.
        </p>
        <p>
            N’oubliez pas de répondre au faire-part (pour nous éviter une crise cardiaque de la mariée).
        </p>
        <p>
            Ce site est évolutif, n’hésitez pas à vérifier régulièrement les informations, notamment au niveau de la
            programmation.
        </p>
        <p class="message-important">
            En raison du grand nombre d’invités, le mariage se fera sans enfant. Mais nous aurons l’occasion de retrouver vos
            petits
            bouts de choux pour d’autres festivités !
        </p>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
</script>

<style scoped>

.bienvenue {
    text-align: center; 
    margin-bottom: 36px;
    font-family: Parisienne, serif;
    font-size: 60px;
}
.container {
    height: calc(100vh - 135px);
    width: 100vw;
    padding: 0 570px;
    background-image: url('../assets/Accueil.jpeg'), url('../assets/coeur.jpeg');
    background-position: top left, top right;
    background-size: 500px, 500px;
    background-repeat: no-repeat, no-repeat;
}

p {
    font-size: 1.2rem;
    font-weight: 350;
    line-height: 1.6;
    color: #333;
    margin: 0 0 1.5rem 0;
    text-align: center;
}

.message-important {
    font-weight: bolder;
}

.img {
    width: 200px;
}
</style>