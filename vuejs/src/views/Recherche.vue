<template>
  <div class="about">
    <h1>Page de recherche</h1>
    <input type="text" v-model="searchText">
    <ul>
      <li v-for="data in searchResult" :key="data.id">{{ data.label }} <span :style="{display:'inline-block',backgroundColor: data.color, borderRadius: '100%', width:'10px', height:'10px'}"></span></li>
    </ul>
  </div>
</template>
<script>
import {searchByLabel} from "../api/categorie";

export default {
  name: 'Recherche',
  data: () => {
    return {
      searchResult:null,
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
                this.searchResult = res.data['hydra:member']
              })
        }, 300)
      }
    }
  },
  watch:{
    searchText: function(){
      this.getSearchResult()
    }
  }
}
</script>
