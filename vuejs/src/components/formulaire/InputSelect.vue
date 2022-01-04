<template>
  <div>
    <label :for="id">{{ label }} <span v-if="required">*</span></label>
    <select :name="name" :id="id" :class="classe" :required="required">
      <option value="" v-if="!required"></option>
        <option v-for="(item, index) in donnees" :value="index" :key="index">{{ item }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'InputSelect',
  props: {
    label: String,
    name: String,
    id: String,
    classe: String,
    required: {
      type: Boolean,
      default: true
    },
    donnees: Array
  }
}
//un label, une zone de saisie, et une classe, si le champ est obligatoire ou non
</script>

<style scoped>

</style>
