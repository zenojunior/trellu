<template>
  <app-layout :board="board">
    <div :style="{'background-color': $global.background, height: '100%'}">
      <horizontal-scroll>
        <Container
          style="padding: 20px"
          orientation="horizontal"
          @drop="onColumnDrop($event)"
          drag-handle-selector=".column-drag-handle"
          :drop-placeholder="upperDropPlaceholderOptions"
        >
          <Draggable v-for="list in listBoard" :key="list.id">
            <div class="card-container">
              <div class="card-column-header">
                <span class="column-drag-handle">&#x2630;</span>
                {{ list.title }}
                <b-dropdown aria-role="list" position="is-bottom-left" style="float: right;margin-right: 5px;">
                  <b-button type="is-light" size="is-small" slot="trigger" slot-scope="{ active }">
                    <b-icon icon="dots-horizontal"></b-icon>
                  </b-button>
                  <b-dropdown-item custom aria-role="menuitem" class="list-menu">
                    <b-menu>
                      <b-menu-list label="Ações da lista">
                        <b-menu-item @click="archiveList(list.id)" icon="archive" label="Arquivar"></b-menu-item>
                      </b-menu-list>
                    </b-menu>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
              <Container
                group-name="col"
                @drop="(e) => onCardDrop(list.id, e)"
                @drag-start="(e) => draggingCard = true"
                @drag-end="(e) => draggingCard = false"
                :get-child-payload="getCardPayload(list.id)"
                drag-class="card-ghost"
                drop-class="card-ghost-drop"
                :drop-placeholder="dropPlaceholderOptions"
                :style="`max-height: ${listHeight }px;width: 100%`"
              >
                <Draggable v-for="(card, index) in list.children" :key="card.id">
                  <div @click="openCard(card)" class="card-item" :style="{backgroundColor: '#fff'}">
                    <p>{{ card.title }}</p>
                    <b-tag v-if="card.date" :type="checkColorClass(card.date, card.concluded)">
                      <b-icon icon="clock-outline" size="is-small" style="margin-right: -3px"></b-icon>
                      {{ card.date | moment("from", "now") }}
                    </b-tag>
                  </div>
                </Draggable>
              </Container>
              <div class="card-column-footer">
                <b-button @click="addCard(list.id)" icon-left="plus" expanded text type="is-light">
                  Adicionar outro quadro
                </b-button>
              </div>
            </div>
          </Draggable>
          <div class="card-item" data-type="new">
            <b-button @click="addList('teste')" icon-left="plus" type="is-light" outlined expanded>Adicionar outra lista</b-button>
          </div>
        </Container>
      </horizontal-scroll>
      <div class="board-modals"></div>
    </div>
  </app-layout>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '../../utils/helpers'
import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'
import ModalCard from '../modals/ModalCard'
import AppLayout from '../layout/AppLayout'
// import WsBoards from '../../utils/WsBoards'

const scene = {
  type: 'container',
  props: {
    orientation: 'horizontal'
  },
  children: [
    {
      id: 23,
      type: 'container',
      name: 'teste',
      props: {
        orientation: 'vertical',
        className: 'card-container'
      },
      children: [
        {
          data: 'teste'
        }
      ]
    }
  ]
}

export default {
  name: 'Cards',
  components: { Container, Draggable, HorizontalScroll, AppLayout },
  data () {
    return {
      id: null,
      board: {
        color: '#7957d5',
        featured: false,
        lists: [],
        title: '',
        user_id: null
      },
      card: {},
      listHeight: 0,
      window: {
        width: 0,
        height: 0
      },
      scene,
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      }
    }
  },
  watch: {
    'board.lists': function (newlists, oldLists) {
      if (newlists === oldLists) return
      if (JSON.stringify(oldLists) === '[]') return
      let lists = JSON.parse(JSON.stringify(newlists))
      for (let list of lists) list.cards = list.cards.map(card => card.id)
      lists = lists.map(list => Object.assign({}, {id: list.id, cards: list.cards}))
      this.$api.post(`/api/boards/${this.id}/ordenate`, {lists})
    }
  },
  async created () {
    // await WsBoards()
    window.addEventListener('resize', this.handleResize)
    document.body.classList.add('board')
    this.handleResize()
    this.id = this.$route.params.id

    this.$api.get(`/api/boards/${this.id}`).then(res => res.data).then(board => {
      this.board.id = board.id
      this.board.featured = board.featured
      this.board.title = board.title
      this.board.user_id = board.user_id
      this.board.lists = board.lists
      this.$global.background = this.board.color = board.color
    })
  },
  computed: {
    listBoard () {
      let lists = generateItems(this.board.lists.length, listIndex => {
        let list = this.board.lists[listIndex]
        let cards = list.cards
        return {
          id: list.id,
          type: 'container',
          title: list.title,
          props: {
            orientation: 'vertical',
            className: 'card-container'
          },
          children: generateItems(cards.length, cardIndex => {
            let card = cards[cardIndex]
            return {
              ...card,
              type: 'draggable'
            }
          })
        }
      })
      this.scene.children = lists
      return lists
    }
  },
  methods: {
    openCard (card) {
      this.$buefy.modal.open({
        parent: this,
        component: ModalCard,
        hasModalCard: true,
        customClass: 'modal-card-board',
        trapFocus: true,
        events: {
          'deleteCard': cardId => this.deleteCard(cardId)
        },
        props: {
          card
        }
      })
    },
    checkColorClass (date, concluded) {
      const oneDay = 24 * 60 * 60 * 1000
      const diffDays = Math.round(Math.abs((new Date() - new Date(date)) / oneDay))
      if (concluded) {
        return 'is-success'
      } else if (!diffDays) {
        return 'is-danger'
      } else if (diffDays <= 1) {
        return 'is-warning'
      } else {
        return 'is-light'
      }
    },
    deleteCard (cardId) {
      let list = this.board.lists.find(list => list.cards.find(card => card.id === cardId))
      let listIndex = this.board.lists.indexOf(list)
      let card = list.cards.find(card => card.id === cardId)
      let cardIndex = list.cards.indexOf(card)
      list.cards.splice(cardIndex, 1)
      this.$set(this.board.lists[listIndex], 'cards', list.cards)
    },
    addCard (listId) {
      this.$buefy.dialog.prompt({
        hasIcon: true,
        icon: 'card-plus',
        confirmText: 'Adicionar',
        cancelText: 'Cancelar',
        container: '.board-modals',
        message: `Qual o nome do card?`,
        inputAttrs: {
          placeholder: 'Nome',
          maxlength: 25
        },
        trapFocus: true,
        onConfirm: (title) => {
          this.$api.post('/api/cards', {
            title,
            list_id: listId,
            description: 'teste'
          }).then(res => res.data).then(card => {
            let list = this.board.lists.find(list => list.id === listId)
            let listIndex = this.board.lists.indexOf(list)
            let cards = list && list.cards ? list.cards : []
            this.$set(this.board.lists[listIndex], 'cards', Array.concat(cards, card))
          })
        }
      })
    },
    addList (name) {
      this.$buefy.dialog.prompt({
        hasIcon: true,
        icon: 'table-column-plus-after',
        confirmText: 'Adicionar',
        cancelText: 'Cancelar',
        container: '.board-modals',
        message: `Qual o nome da lista?`,
        inputAttrs: {
          placeholder: 'Nome',
          maxlength: 15
        },
        trapFocus: true,
        onConfirm: (title) => {
          const list = {
            id: Math.random().toString(36).substring(7),
            name,
            type: 'container',
            props: {
              orientation: 'vertical',
              className: 'card-container'
            },
            children: []
          }
          this.$api.post(`api/lists`, {
            board_id: this.id,
            title,
            order: this.board.lists.length + 1
          }).then(res => res.data).then(list => {
            list['cards'] = []
            let lists = this.board.lists
            this.$set(this.board, 'lists', [...lists, list])
          })
          this.scene.children.push(list)
        }
      })
    },
    archiveList (listId) {
      this.$api.put(`/api/lists/${listId}`, {archived: true}).then(res => res.data).then(console.log)
      let list = this.board.lists.find(list => list.id === listId)
      let totalCards = list.cards.length
      let listIndex = this.board.lists.indexOf(list)
      this.board.lists.splice(listIndex, 1)
      let message = ''
      if (!totalCards) message = 'Lista arquivada'
      else message = `Lista e ${totalCards} ${totalCards > 1 ? 'cartões' : 'cartão'} foram arquivados`
      this.$buefy.toast.open({ message, position: 'is-bottom-right' })
    },
    handleResize () {
      this.window.height = window.innerHeight
      this.window.width = window.innerWidth
      this.listHeight = window.innerHeight - 205
    },
    onColumnDrop (dropResult) {
      const board = Object.assign({}, this.board)
      board.lists = applyDrag(board.lists, dropResult)
      this.board = board
    },
    onCardDrop (listId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const lists = [...this.board.lists]
        const list = lists.find(list => list.id === listId)
        const listIndex = lists.indexOf(list)
        const newList = Object.assign({}, list)
        newList.cards = applyDrag(newList.cards, dropResult)
        lists.splice(listIndex, 1, newList)
        this.board.lists = lists
      }
    },
    getCardPayload (columnId) {
      return index => {
        return this.scene.children.filter(p => p.id === columnId)[0].children[index]
      }
    },
    log (...params) {
      console.log(...params)
    }
  },
  mounted () {
  //   this.$ws.$emitToServer('trellu', 'message', {message: this.message})
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
    document.body.classList.remove('board')
  }
}
</script>

<style>
  .board .container-after-titlebar {
    top: unset!important;
  }
  .smooth-dnd-container.horizontal > .smooth-dnd-draggable-wrapper {
    display: inline-table;
    position: relative;
  }
</style>
<style lang="scss">
.list-menu {
  padding-right: 10px;
  padding-left: 10px;
}
.board-modals {
  .modal-background {
    background-color: transparent;
    .modal-card {
      box-shadow: 0 0 20px 0px #797979;
    }
  }
}
.smooth-dnd-container {
  background: inherit;
  overflow-y: scroll;
}
.draggable-item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  display: block;
  background-color: #fff;
  outline: 0;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin-bottom: 2px;
  margin-top: 2px;
  cursor: default;
  user-select: none;
}

.draggable-item-horizontal {
  height: 300px;
  padding: 10px;
  line-height: 100px;
  text-align: center;
  /* width : 200px */
  display: block;
  background-color: #fff;
  outline: 0;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin-right: 4px;
  cursor: default;
}

.dragging {
  background-color: yellow;
}

.card-scene {
  padding: 50px;
  /* background-color: #fff */
}

.card-container {
  width: 320px;
  padding: 10px;
  margin: 5px;
  margin-right: 15px;
  background-color: #f3f3f3;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
}

.card-item {
  margin: 5px;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  padding: 10px;
  cursor: pointer;
  &:hover {
    opacity: .7;
  }
  &[data-type="new"] {
    background-color: transparent;
    box-shadow: none;
    padding: 0;
    width: 320px;
    justify-content: center;
    display: inline-table;
  }
}

.card-column {
  &-header {
    font-size: 18px;
  }
  &-footer {
    padding: 6px 4px 0px 4px;
    position: relative;
    .visible {
      bottom: 30px;
    }
  }
}

.column-drag-handle {
  cursor: move;
  padding: 5px;
}

.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}

.opacity-ghost {
  transition: all 0.18s ease;
  opacity: 0.8;
  /* transform: rotateZ(5deg) */
  background-color: cornflowerblue;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.3);
}

.opacity-ghost-drop {
  opacity: 1;
  /* transform: rotateZ(0deg) */
  background-color: white;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0);
}

.drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px;
}

.cards-drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px 45px 5px 5px;
}
</style>