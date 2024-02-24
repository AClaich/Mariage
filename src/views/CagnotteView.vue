<template>
     <div class="container">
    <a-row justify="center" align="middle" class="item-ligne">
      <a-col :span="18">
        <a-card class="box-shadow">
          <h1 class="titre">La cagnotte de noce</h1>
          <p class="text-align">
            Une cagnotte de noce sera disponible dans la salle de réception le jour J. 
            Si vous souhaitez participer, vous pourrez également le faire en ligne à partir du mois de juillet.
          </p>
        </a-card>
      </a-col>
    </a-row>
  </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from "vue";
  </script>

<style scoped>
  .tarif {
    font-family: Parisienne, serif;
    font-size: 21px;
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
    @media (min-width: 1024px) {
      padding-top: 36px;
      padding-left: 300px;
      padding-right: 300px;
      width: 100vw;
      height: 100vw;
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

  .box-shadow {
    box-shadow: 10px 5px 5px #00000026;
  }

  .text-align {
    text-align: center;
  }

  .item-ligne {
    @media (min-width: 1024px) {
      margin-bottom: 36px;
    }
  }
</style>