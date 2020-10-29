<template>
  <article class="panel is-info">
    <p v-if="title" class="panel-heading">{{ title }}</p>
    <div class="panel-block-light">
      <cloud
        v-if="words"
        height="200"
        padding="0"
        font="sans-serif"
        :width="width"
        :data="words" 
        :fontSizeMapper="fontSizeMapper"
      />
    </div>
  </article>
</template>

<script>
import Cloud from 'vue-d3-cloud'
export default {
  props: ['width', 'title'],
  components: {
    Cloud
  },
  data () {
    return {
      cloud: null,
      fontSizeMapper: word => Math.log2(word.value) * 5
    }
  },
  created () {
    this.$api.post('/api/admin/dashboard/words-cloud').then(res => {
      this.cloud = res.data.cloud
    })
  },
  computed: {
    words () {
      let results = []
      if (!this.cloud) return results
      for (let word of this.cloud) {
        if (word[0].length < 4) continue
        let result = results.find(result => result.text === word[0])
        if (!result) results.push({ text: word[0], value: parseInt(word[1]) * 10 })
        else {
          let resultIndex = results.indexOf(result)
          results[resultIndex].value = (parseInt(word[1]) * 10) + results[resultIndex].value
        }
      }
      return results
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-block-light {
  border: 1px solid #ddd;
  border-top: none;
  pointer-events: none;
}
</style>