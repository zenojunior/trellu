<template>
  <div class="add-board-box">
    <div>
      <div class="board-title create-board-tile">
        <input type="text" v-model="data.title" placeholder="Adicionar título do quadro">
        <b-button @click="close()" class="close-modal" icon-right="close"></b-button>
      </div>
      <ul class="background-grid"></ul>
    </div>
    <div>
      <b-button @click="add()" type="is-success" :disabled="!data.title.length">Criar quadro</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        title: '',
        featured: false,
        structure: '{}',
        color: '#ddd'
      }
    }
  },
  methods: {
    add () {
      this.$api.post('/api/boards', this.data).then(res => {
        this.$store.dispatch('ADD_BOARD', res.data)
        this.close()
      })
    },
    close () {
      this.$parent.close()
    }
  }
}
</script>

<style lang="scss">
.modal-add-board {
  justify-content: flex-start;
  .modal-close {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
  .add-board-box {
    position: relative;
    z-index: 2;
    max-width: 400px;
    top: 6rem;
    p {
      color: #fff;
    }
  }
  .create-board-tile {
    background-color: #fff;
    box-sizing: border-box;
    height: 96px;
    margin: 0;
    padding: 10px 10px 10px 16px;
    position: relative;
    width: 296px;
    border-radius: 3px;
    margin-bottom: 5px;

    input {
      background: transparent;
      border: none;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      margin: 0;
      min-height: 0;
      outline: 0;
      position: relative;
      left: -8px;
      padding: 2px 8px;
      box-shadow: none;
    }
  }

  button.close-modal {
    right: 10px;
    position: absolute;
  }
</style>