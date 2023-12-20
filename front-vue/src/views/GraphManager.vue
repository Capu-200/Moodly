<template>
    <div class="treemap-container">
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </template>
  
  <script>
  import Highcharts from 'highcharts';
  import TreeMap from 'highcharts/modules/treemap';
  import VueHighcharts from 'vue-highcharts';
  import axios from 'axios';
  
  // Initialisation du module TreeMap
  TreeMap(Highcharts);
  
  export default {
    components: {
      highcharts: VueHighcharts
    },
    data() {
      return {
        chartOptions: {
          title: {
            text: 'Répartition des Humeurs des Employés'
          },
          series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            data: [] // Les données seront chargées ici
          }]
        }
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get('URL_DE_VOTRE_API_STRAPPI/humeurs');
          this.chartOptions.series[0].data = this.formatDataForTreeMap(response.data);
        } catch (error) {
          console.error("Erreur lors du chargement des données: ", error);
        }
      },
      formatDataForTreeMap(data) {
        // Transformez les données de Strappi en un format compatible avec le TreeMap
   
        return data.map(item => {
          return {
            name: item.nom, // Adaptez selon le format de vos données
            value: item.valeur // Adaptez selon le format de vos données
          };
        });
      }
    }
  };
  </script>
  
  <style>
  .treemap-container {
    /* // Appliquez vos styles ici, utilisez les classes Tailwind si nécessaire */
  }
  </style>
  