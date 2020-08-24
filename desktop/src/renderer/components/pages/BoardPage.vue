<template>
  <div :style="`${$global.backgroundStyle};height: ${window.height}px;width: ${window.width};display: flex;`">
    <navbar-board :board="board" />
    <horizontal-scroll>
      <Container
        style="padding: 20px"
        orientation="horizontal"
        @drop="onColumnDrop($event)"
        drag-handle-selector=".column-drag-handle"
        @drag-start="() => console.log('Drag start')"
        :drop-placeholder="upperDropPlaceholderOptions"
      >
        <Draggable v-for="column in listBoard" :key="column.id">
          <div class="card-container">
            <div class="card-column-header">
              <span class="column-drag-handle">&#x2630;</span>
              {{ column.title }}
            </div>
            <Container
              group-name="col"
              @drop="(e) => onCardDrop(column.id, e)"
              @drag-start="(e) => log('drag start', e)"
              @drag-end="(e) => log('drag end', e)"
              :get-child-payload="getCardPayload(column.id)"
              drag-class="card-ghost"
              drop-class="card-ghost-drop"
              :drop-placeholder="dropPlaceholderOptions"
              :style="`max-height: ${listHeight }px`"
            >
              <Draggable v-for="(card, index) in column.children" :key="card.id">
                <div class="card" :style="{backgroundColor: '#fff'}">
                  <p>{{ card.title }}</p>
                </div>
              </Draggable>
            </Container>
            <div class="card-column-footer">
              <b-button @click="openAddCardToggle(column.id)" icon-left="plus" expanded text type="is-light">
                Adicionar outro quadro
              </b-button>
            </div>
          </div>
        </Draggable>
        <div class="card" data-type="new">
          <b-button @click="addList('teste')" icon-left="plus" type="is-light" outlined expanded>Adicionar outra lista</b-button>
        </div>
      </Container>
    </horizontal-scroll>
    <div class="board-modals"></div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '../../utils/helpers'
import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'
import NavbarBoard from '../NavbarBoard'

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
      newCard: {
        visible: false,
        title: ''
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
  components: { Container, Draggable, NavbarBoard, HorizontalScroll },
  data () {
    return {
      id: {},
      board: {
        color: '#7957d5',
        featured: false,
        structure: '{}',
        title: '',
        user_id: null
      },
      cards: [],
      cardsByList: [],
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
  created () {
    window.addEventListener('resize', this.handleResize)
    document.body.classList.add('board')
    this.handleResize()
    this.id = this.$route.params.id

    this.$api.get(`/api/boards/${this.id}`).then(res => res.data).then(board => {
      this.board.id = board.id
      this.board.featured = board.featured
      this.board.color = board.color
      this.board.title = board.title
      this.board.user_id = board.user_id
      // console.groupCollapsed('board')
      // console.log(board)
      // console.groupEnd('board')
      this.$global.background = this.board.color = board.color
      this.$api.get(`/api/cards/board/${board.id}`).then(res => res.data).then(cards => {
        // console.groupCollapsed('cards')
        // console.log(cards)
        // console.groupEnd('cards')
        this.cards = cards
        console.log('board.structure', board.structure)
        this.board.structure = board.structure
      })
    })
  },
  computed: {
    listBoard () {
      const structure = this.board.structure
      if (typeof structure !== 'object') return []
      const cardsByList = this.separateCardsByList(structure)
      let lists = generateItems(structure.length, listIndex => {
        let list = structure[listIndex]
        let getCards = () => {
          let l = cardsByList.find(l => l.title === list.title)
          return l && l.cards ? l.cards : []
        }
        let cards = getCards()
        console.log('cards', cards)
        console.log('cards.length', cards.length)
        return {
          id: `list${listIndex}`,
          type: 'container',
          newCard: { visible: false, title: '' },
          title: list.title,
          props: {
            orientation: 'vertical',
            className: 'card-container'
          },
          children: generateItems(cards.length, cardIndex => {
            let card = cards[cardIndex]
            return {
              id: card.id,
              title: card.title,
              type: 'draggable'
            }
          })
        }
      })
      // console.groupCollapsed('listBoard computed')
      // console.log(lists)
      // console.groupEnd('listBoard computed')
      this.scene.children = lists
      return lists
    }
  },
  methods: {
    separateCardsByList (lists) {
      if (!lists.length) return []
      lists.forEach(list => {
        let cardIds = [...list.cards]
        list.cards = cardIds.map(cardId => this.cards.find(c => c.id === cardId))
      })
      return lists
    },
    openAddCardToggle (columnId = null) {
      // this.scene.children.forEach((list, index) => {
      //   list.newCard.visible = list.id === columnId
      // })
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
        onConfirm: (name) => {
          console.log('nome')
        }
      })
    },
    addCard (title) {
      this.$api.post('/api/cards', {
        title: title,
        description: '',
        board_id: this.board.id
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
        onConfirm: (name) => {
          const list = {
            id: Math.random().toString(36).substring(7),
            name,
            type: 'container',
            props: {
              orientation: 'vertical',
              className: 'card-container'
            },
            newCard: {
              visible: false,
              title: ''
            },
            children: []
          }
          this.updateStructure()
          this.scene.children.push(list)
        }
      })
    },
    updateStructure () {
      console.log(this.board)
      const lists = [
        {
          title: 'Teste',
          cards: []
        },
        {
          title: 'teste',
          cards: [1]
        }
      ]
      this.$api.put(`api/boards/${this.board.id}`, {
        structure: JSON.stringify(lists)
      })
    },
    handleResize () {
      this.window.height = window.innerHeight
      this.window.width = window.innerWidth
      this.listHeight = window.innerHeight - 205
    },
    onColumnDrop (dropResult) {
      const scene = Object.assign({}, this.scene)
      scene.children = applyDrag(scene.children, dropResult)
      this.scene = scene
    },
    onCardDrop (columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene)
        const column = scene.children.filter(p => p.id === columnId)[0]
        const columnIndex = scene.children.indexOf(column)
        const newColumn = Object.assign({}, column)
        newColumn.children = applyDrag(newColumn.children, dropResult)
        scene.children.splice(columnIndex, 1, newColumn)
        console.log(scene)
        this.scene = scene
      }
    },
    getCardPayload (columnId) {
      return index => {
        return this.scene.children.filter(p => p.id === columnId)[0].children[index]
      }
    }
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
    top: 75px;
    position: relative;
  }
</style>
<style lang="scss">
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

.card {
  margin: 5px;
  /* border: 1px solid #ccc */
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  padding: 10px;
  &[data-type="new"] {
    background-color: transparent;
    margin-top: 80px;
    box-shadow: none;
    padding: 0;
    width: 320px;
    justify-content: center;
    display: flex;
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