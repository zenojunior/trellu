<template>
  <div :style="$global.backgroundStyle">
    <navbar-board :board="board" />
    <Container
      style="margin-top: 50px;padding: 20px"
      orientation="horizontal"
      @drop="onColumnDrop($event)"
      drag-handle-selector=".column-drag-handle"
      @drag-start="dragStart"
      :drop-placeholder="upperDropPlaceholderOptions"
    >
      <Draggable v-for="column in scene.children" :key="column.id">
        <div :class="column.props.className">
          <div class="card-column-header">
            <span class="column-drag-handle">&#x2630;</span>
            {{ column.name }}
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
          >
            <Draggable v-for="card in column.children" :key="card.id">
              <div :class="card.props.className" :style="card.props.style">
                <p>{{ card.data }}</p>
              </div>
            </Draggable>
          </Container>
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '../../utils/helpers'
import NavbarBoard from '../NavbarBoard'

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
const columnNames = ['Lorem', 'Ipsum', 'Consectetur', 'Eiusmod']
const scene = {
  type: 'container',
  props: {
    orientation: 'horizontal'
  },
  children: generateItems(4, i => ({
    id: `column${i}`,
    type: 'container',
    name: columnNames[i],
    props: {
      orientation: 'vertical',
      className: 'card-container'
    },
    children: generateItems(+(Math.random() * 10).toFixed() + 5, j => ({
      type: 'draggable',
      id: `${i}${j}`,
      props: {
        className: 'card',
        style: {backgroundColor: '#fff'}
      },
      data: lorem.slice(0, Math.floor(Math.random() * 150) + 30)
    }))
  }))
}

export default {
  name: 'Cards',
  components: { Container, Draggable, NavbarBoard },
  created () {
    this.id = this.$route.params.id
    this.$api.get(`/api/boards/${this.id}`).then(res => res.data).then(board => {
      this.board = board
      this.$global.background = this.board.color = board.color
    })
  },
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
  methods: {
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
        this.scene = scene
      }
    },
    getCardPayload (columnId) {
      return index => {
        return this.scene.children.filter(p => p.id === columnId)[0].children[index]
      }
    },
    dragStart () {
      console.log('drag started')
    },
    log (...params) {
      console.log(...params)
    }
  }
}
</script>

<style lang="scss">
.smooth-dnd-container {
  background: inherit;
}
.draggable-item {
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: block;
    background-color: #fff;
    outline: 0;
    border: 1px solid rgba(0, 0, 0, .125);
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
    /* width : 200px; */
    display: block;
    background-color: #fff;
    outline: 0;
    border: 1px solid rgba(0, 0, 0, .125);
    margin-right: 4px;
    cursor: default;
}

.dragging {
    background-color: yellow;
}

.card-scene {
    padding: 50px;
    /* background-color: #fff; */
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
    /* border: 1px solid #ccc; */
    background-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
    padding: 10px;
}

.card-column-header {
    font-size: 18px;
}

.column-drag-handle {
    cursor: move;
    padding: 5px;
}

.card-ghost {
    transition: transform 0.18s ease;
    transform: rotateZ(5deg)
}

.card-ghost-drop {
    transition: transform 0.18s ease-in-out;
    transform: rotateZ(0deg)
}

.opacity-ghost {
    transition: all .18s ease;
    opacity: 0.8;
    /* transform: rotateZ(5deg); */
    background-color: cornflowerblue;
    box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.3);
}

.opacity-ghost-drop {
    opacity: 1;
    /* transform: rotateZ(0deg); */
    background-color: white;
    box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.0);
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