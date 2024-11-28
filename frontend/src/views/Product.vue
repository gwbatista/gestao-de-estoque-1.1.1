<template>
  <div>
    <h3 class="title-product">Produtos</h3>
    <hr>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="filter-data">
            <div class="field-date">
              <p class="title-data">Selecione o período de datas:</p>
              <div class="input-date">
                <label for="start-date" class="label-text">Início:</label>
                <input type="date" id="start-date" v-model="startDate" class="input-data">
                <label for="end-date" class="label-text">Término:</label>
                <input type="date" id="end-date" v-model="endDate" class="input-data">
              </div>
            </div>
            <div class="field-rest">
              <div class="field-filters">
                <label for="pid" class="label-text pid-text">Nº Produto:</label>
                <input type="text" id="pid" v-model="pid" class="input-data accnumber-input">
              </div>
              <v-btn class="button-buscar" color="primary" @click="searchDatabase">Localizar</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-divider class="divider-integration"></v-divider>
      <p class="text-h6 font-weight-bold">Lista de produtos</p>
        <div class="group-button-reprocess">
          <p class="title-reprocess">Adicionar ou excluir produtos:</p>
          <div class="group-buttons">
            <div>
              <v-btn color="green" class="button-reprocess" @click="confirmReprocessar">ADICIONAR</v-btn>
            </div>  
            <div>
              <v-btn color="red" class="button-reprocess" @click="confirmReprocessar">EXCLUIR</v-btn>
            </div>
          </div>
        </div>

    <v-data-table
      class="border custom-table"
      v-model="selected"
      :headers="headers"
      :items="desserts"
      item-value="name"
      items-per-page="10"
      :search="search"
      :items-per-page-text="'Itens por página'"
      return-object
      show-select
    >

      <template v-slot:item.status="{ value }">
        <v-chip :color="getColor(value)"> {{ value }} </v-chip>
      </template>

      <template v-slot:item.details="{ item }">
          <v-icon @click="showDetailCard(item)">mdi-information</v-icon>
        </template>

    </v-data-table>

   

    <v-dialog v-model="detailCardVisible" max-width="600">
      <v-card  :color="getColor(detailCardValue.status)" flat >
        <v-card-title class="font-weight-bold">{{ detailCardValue.description }} - {{ detailCardValue.type }}</v-card-title>
        <v-card-subtitle>{{ detailCardValue.reqprocdescription }}</v-card-subtitle>
        <v-card-text></v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          Item: {{ detailCardValue.item }}
        </v-card-text>
        <v-card-text>
          Nº Produto: {{ detailCardValue.id }}
        </v-card-text>
        <v-card-text>
          Tipo: {{ detailCardValue.type }}
        </v-card-text>
        <v-card-text v-if="detailCardValue.errormsg">
          Erro: {{ detailCardValue.errormsg }}
        </v-card-text>
        <v-card-text>
          Mapeamento Interno: {{ 'Corredor 4 / Gaveta 13' }}
        </v-card-text>
        <v-card-text>
    
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="black" text @click="detailCardVisible = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  </div>

</template>

<script>

  import axios from 'axios';

  export default {
    data() {
        return {
          search: '',
          selected: [],
          headers: [
            {
              align: 'start',
              key: 'description',
              sortable: false,
              title: 'Descrição',
            },
            { key: 'item', title: 'Item' },
            { key: 'id', title: 'Numero Produto' },
            { key: 'type', title: 'Tipo' },
            { key: 'status', title: 'Status' },
            { key: 'details', title: 'Detalhes' },
          ],
          desserts: [],
          detailCardVisible: false,
          detailCardValue: '',
        }
      },

      methods: {

        async searchDatabase() {
          
          if (!this.startDate || !this.endDate) {
            alert('Por favor, selecione o período de datas.');
            return;
          }

          // Formatar as datas para o formato yyyyMMdd
          const formattedStartDate = this.startDate.split('-').join('');
          const formattedEndDate = this.endDate.split('-').join('');

          // Prepara os dados dos inputs
          const requestData = {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            item: this.item,
            id: this.id,
            description: this.description,
            type: this.type,
            status: this.status
          };

          try {
    
            const response = await axios.post('http://localhost:4000/data/get-data', requestData);
            console.log ('Dados enviados: ', requestData);
            console.log('Resposta do servidor:', response.data);

            this.desserts = response.data.data.map(item => ({
              ...item,
              status: this.getStatusLabel(item.status),
            }));

          } catch (error) {
            console.error('Erro ao enviar a requisição:', error);
          }
        },

        getStatusLabel(status) {

          switch (status) {
            case 'in_stock':
              return 'EM ESTOQUE';
            case 'reserved':
              return 'RESERVADO';
            case 'out_of_stock':
              return 'SEM ESTOQUE';
            default:
              return 'Desconhecido';
          }
        },

        getColor(status) {
          if (status === 'SEM ESTOQUE') return 'red'
          else if (status === 'EM ESTOQUE') return 'green'
          else return 'blue'
        },

        showDetailCard(item) {
          this.detailCardValue = item;
        // Exiba o card
        this.detailCardVisible = true;
        },

        confirmReprocessar() {
          if (confirm('Deseja realmente reprocessar a entrada? Esse processo é irreversível!')) {
            
            const selectedItem = this.selected[0]; 
            const selectedIndex = this.desserts.findIndex(item => item.id === selectedItem.id);
            if (selectedIndex !== -1) {
              this.desserts.splice(selectedIndex, 1); 
            }

            // Envia a solicitação de reprocessamento apenas se houver um item selecionado
            if (selectedItem) {
              this.reprocessar(selectedItem);
            }
          } else {
            // Se o usuário clicou em "Cancelar", não faz nada
          }
        },

        async reprocessar(selectedItem) {
          try {
            // Enviar apenas os dados relevantes ao backend
            const data = {
              id: selectedItem.id,
              accessionnumber: selectedItem.accessionnumber,
              cmdtype: selectedItem.cmdtype,
            };

            // Enviar os dados ao backend
            const response = await axios.post('URL_DO_BACKEND', data);
            console.log('Dados enviados com sucesso:', response.data);
          } catch (error) {
            console.error('Erro ao enviar os dados:', error);
          }
        },
    },
  };
</script>

<style scoped>
  .title-product {
    margin-bottom: 5px;
  }

  .divider-integration {
    margin-top: 5px;
    margin-bottom: 15px;
  }

  .button-buscar {
    margin-left: 50px;
    font-size: 12px;
  }

  .title-data {
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 20px;
  }

  .filter-data {
    display: flex;
    align-items: center;
    gap: 25px; 
    margin-bottom: 15px;
  }

  .field-date {
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
  }

  .field-date label {
    margin-right: 10px;
    margin-left: 20px;
  }

  .input-date {
    display: flex;
    align-items: center;
  }
  .input-data {
    border: 1px solid #ccc;
    border-radius: 5px; 
    padding: 5px;
    font-size: 12px;
    width: 100%; 
  }

  .field-rest {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 40px;
  }

  .field-filters {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .label-text {
    font-size: 12px;
    margin-left: 25px;
    font-weight: bold;
  }

  .pid-text {
    margin-right: 15px;
  }

  .title-reprocess {
    font-weight: bold;
    font-size: 15px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .button-reprocess {
    font-size: 11px;
  }
  .group-button-reprocess {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 30px;
  }

  .group-buttons {
    display: flex;
    gap: 20px;
  }

   /* Estilos para deixar o nome das colunas em negrito */
   .v-table > .v-table__wrapper > table > tbody > tr > th, .v-table > .v-table__wrapper > table > thead > tr > th, .v-table > .v-table__wrapper > table > tfoot > tr > th {
    font-weight: bold !important;
  }

</style>
