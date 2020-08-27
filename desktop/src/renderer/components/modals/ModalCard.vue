<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        <b-icon icon="card" type="is-primary" />
        <b-field class="card-title">
            <b-input size="is-medium" v-model="card.title" @input="updateTitle"></b-input>
        </b-field>
      </p>
      <button
        type="button"
        class="delete"
        @click="$emit('close')"/>
    </header>
    <section class="modal-card-body columns">
      <main class="column is-three-quarters">
        <p class="modal-title">
          <b-icon icon="text" type="is-primary" />
          <span>Descrição</span>
        </p>
        <b-field class="card-description">
          <b-input type="textarea"
                minlength="10"
                maxlength="100"
                @input="updateDescription"
                v-model="card.description"
                placeholder="Adicione uma descrição mais detalhada...">
            </b-input>
        </b-field>
      </main>
      <aside class="column">
        <small class="aside-title">AÇÕES</small>
        <b-button type="is-primary" outlined iconLeft="arrow-right" expanded disabled>
          Mover
        </b-button>
        <b-button type="is-primary" outlined iconLeft="trash-can" expanded @click="deleteCard()">
          Excluir
        </b-button>
        <b-button type="is-primary" outlined iconLeft="archive" expanded disabled>
          Arquivar
        </b-button>
      </aside>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      card: this.$attrs.card,
      editDescription: false
    }
  },
  created () {
  },
  methods: {
    updateTitle (title) {
      this.$api.put(`api/cards/${this.card.id}`, { title })
    },
    updateDescription (description) {
      this.$api.put(`api/cards/${this.card.id}`, { description })
    },
    deleteCard () {
      this.$buefy.dialog.confirm({
        message: 'Deseja excluir o cartão?',
        cancelText: 'Cancelar',
        confirmText: 'Sim',
        onConfirm: () => {
          this.$emit('deleteCard', this.card.id)
          this.$api.delete(`/api/cards/${this.card.id}`)
          this.$emit('close')
          this.$buefy.toast.open({ message: 'Cartão excluído do quadro', position: 'is-bottom-right' })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.modal-title {
  margin-bottom: 10px;
}
.card-title {
  display: inline-flex;
  top: -10px;
  position: relative;
  input {
    height: 35px;
    font-weight: 500;
    &:not(:focus) {
      background: transparent;
      border: none;
      outline: none;
      box-shadow: none;
    }
  }
}
.card-description {
  margin-left: 2.5rem;
}
</style>
<style lang="scss" scoped>
  .modal-title { 
    span:last-of-type {
      margin-left: 12px;
      display: inline-flex;
      font-size: 1.05rem;
      font-weight: 500;
      color: #363636;
    }
  }
  .modal-card {
    &-body {
      background: whitesmoke;
    }
    &-head {
      padding-bottom: 5px;
      padding-top: 15px;
    }
  }
  aside {
    .aside-title {
      display: block;
      margin-bottom: 3px;
      font-weight: 600;
      color: #6943d0;
    }
    .button {
      margin-bottom: 7px;
      justify-content: flex-start;
    }
  }
</style>