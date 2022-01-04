<template>
  <div>
    <label :for="id">{{ label }} <span v-if="required">*</span></label>
    <input :type="type" :name="name" :id="id" :class="classe" :required="required" >
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    label: String,
    name: String,
    id: String,
    type: {
      type: String,
      default: 'text'
    },
    classe: String,
    required: {
      type: Boolean,
      default: true
    },
  }
}
//un label, une zone de saisie, et une classe, si le champ est obligatoire ou non
</script>

<style scoped>

</style>
