<template>
  <div class="modal-card not-overflow">
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
      <main class="column">
        
        <div v-if="card.date">
          <p class="modal-title">
            <b-icon icon="calendar" type="is-primary" />
            <span class="title">Entrega:</span>
            <div class="date">
              <b-checkbox @input="setConcluded" v-model="card.concluded"></b-checkbox>
              <span :class="{'concluded': card.concluded}">
                <span class="datetime">{{ date }}</span>
                <b-tag :type="card.concluded ? 'is-success' : 'is-warning'">{{ card.concluded ? 'Concluído' : 'Para entregar' }}</b-tag>
              </span>
            </div>
          </p>
        </div>
        <p class="modal-title">
          <b-icon icon="text" type="is-primary" />
          <span class="title">Descrição</span>
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
      <aside class="column is-one-third">
        <small class="aside-title">DATA ENTREGA</small>
        <b-datetimepicker
          v-model="card.date"
          @input="setDate"
          placeholder="Escolher"
          locale="pt-BR"
          :min-datetime="new Date()"
          :icon="card.date ? null : 'calendar-today'"
          :timepicker="{ enableSeconds: true, hourFormat: '24' }"
        >
            <template slot="left">
                <button class="button is-primary"
                    @click="card.date = new Date()">
                    <b-icon icon="clock"></b-icon>
                    <span>Agora</span>
                </button>
            </template>
            <template slot="right">
                <button class="button is-danger"
                    @click="card.date = null">
                    <b-icon icon="close"></b-icon>
                    <span>Limpar</span>
                </button>
            </template>
        </b-datetimepicker>
        
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
    this.card.date = new Date(this.card.date)
  },
  methods: {
    updateTitle (title) {
      this.$api.put(`api/cards/${this.card.id}`, { title })
    },
    updateDescription (description) {
      this.$api.put(`api/cards/${this.card.id}`, { description })
    },
    setConcluded (concluded) {
      this.$api.put(`api/cards/${this.card.id}`, { concluded })
    },
    setDate (date) {
      this.$api.put(`api/cards/${this.card.id}`, { date: date.toLocaleString() })
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
  },
  computed: {
    date () {
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
      return this.card && this.card.date ? this.card.date.toLocaleString('pt-BR', options) : ''
    }
  }
}
</script>
<style lang="scss">
.modal-title {
  margin-bottom: 10px;
}
.modal-card {
  &.not-overflow {
    overflow: initial;
    .modal-card-body {
      overflow: initial;
      margin: 0;
    }
  }
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
.datepicker .datepicker-footer {
  margin-top: 0;
  padding-top: 5px;
  button {
    margin-bottom: 0;
  }
}
</style>
<style lang="scss" scoped>
  .modal-title { 
    .title {
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
  main  {
    .date {
      margin-left: 40px;
      margin-bottom: 15px;
      span {
        font-weight: 400;
        text-transform: capitalize;
        &.concluded {
          .datetime {
            text-decoration: line-through;
          }
        }
      }
    }
  }
  aside {
    .aside-title {
      display: block;
      margin-bottom: 3px;
      font-weight: 600;
      color: #6943d0;

      &:not(:first-of-type) {
        margin-top: 15px;
      }
    }
    .button {
      margin-bottom: 7px;
      justify-content: flex-start;
    }
  }
</style>