<template>
  <div class="form_group">
    <input class="form_field" id="searchbar" type="text" placeholder="Rechercher" v-model="searchText">
    <label class="form_label" for="searchbar">Rechercher</label>
  </div>
</template>

<script>
import {searchByLabel} from "../api/categorie";

export default {
  name: "Searchbar",
  data(){
    return{
      searchResult: null,
      searchText: null,
      searchByLabelTimeout: null
    }
  },
  methods:{
    getSearchResult(){
      this.tempSearchText = this.searchText.toString()
      if (this.searchText) {
        clearTimeout(this.searchByLabelTimeout)
        this.searchByLabelTimeout = setTimeout(()=>{
          searchByLabel(this.searchText)
              .then(res => {
                this.searchResult = res.data['hydra:member'].length?res.data['hydra:member']:null
              })
        }, 300)
      }
    },
    watch:{
      searchText: function(){
        console.log("suce")
        this.getSearchResult()
      }
    }
  }
}
</script>

<style scoped>
.form_group {
  position: relative;
  padding: 0;
  margin: 0 0 0 2rem;
  width: 8rem;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}

.form_field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1rem;
  padding: 0;
  background: transparent;
  transition: border-color 0.2s;
}
.form_field::placeholder {
  color: transparent;
}

.form_field:placeholder-shown ~ .form_label {
  font-size: 1rem;
  cursor: text;
  top: 0;
}

.form_label {
  position: absolute;
  top: -20px;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
}
.form_field:focus ~ .form_label {
  position: absolute;
  top: -20px;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #11998e;
  font-weight:700;
}

.form_field:focus{
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #11998e,#38ef7d);
  border-image-slice: 1;
}
</style>