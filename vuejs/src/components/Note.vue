<template>
  <span :class="couleurLigne"><!-- v-bind:class est équivalent à :class. Un v-bind (ou :) interpréte le contenu de la propriété comme une expression et l'évalue à chaque fois que la propriété est modifiée. -->
    Note sur {{ matiere }} : {{ note }} =
    <span v-if="note > 10">{{ matiere }} validé</span>
    <span v-else><b>{{ matiere }} non validé</b></span>
  </span>
</template>

<script>
export default {
  name: 'Note',
  props: {
    matiere: String,
    note: Number
  },
  computed: {
    couleurLigne: function () {
      if (this.note > 10) {
        return 'green'
      } else {
        return 'red'
      }
    }
  }
}
</script>

<style scoped>
.red {
  color:red;
}

.green {
  color:green;
}
</style>
