<template>
    <v-form v-model="valid">
      <v-text-field
        label="Nombre"
        v-model="crop.name"
        :rules="[rules.required]"
      />
      <v-text-field
        label="Tipo"
        v-model="crop.type"
        :rules="[rules.required]"
      />
      <v-text-field
        label="Fecha de siembra"
        v-model="crop.sowingDate"
        type="date"
        :rules="[rules.required]"
      />
      <v-text-field
        label="Fecha de cosecha"
        v-model="crop.harvestDate"
        type="date"
        :rules="[rules.required]"
      />
      <v-btn
        color="primary"
        @click="updateCrop"
      >
        Actualizar cultivo
      </v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    data () {
      return {
        valid: true,
        crop: {
          name: '',
          type: '',
          sowingDate: '',
          harvestDate: ''
        },
        rules: {
          required: value => !!value || 'Este campo es obligatorio'
        }
      }
    },
    methods: {
      updateCrop () {
        // Validar el formulario
        if (!this.valid) {
          return
        }
  
        // Actualizar el cultivo
        axios.put(`/api/crops/${this.crop.id}`, this.crop)
          .then(response => {
            // Redireccionar al listado de cultivos
            this.$router.push('/crops')
          })
          .catch(error => {
            // Mostrar un error
            console.log(error)
          })
      }
    }
  }
  </script>
  