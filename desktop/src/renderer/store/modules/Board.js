const state = {
  boards: []
}

const actions = {
  ADD_BOARD ({commit}, board) {
    commit('ADD_BOARD', board)
  },
  DELETE_BOARD ({commit}, id) {
    commit('DELETE_BOARD', id)
  },
  SET_BOARDS ({commit}, boards) {
    commit('SET_BOARDS', boards)
  },
  CLEAR_BOARDS ({commit}) {
    commit('CLEAR_BOARDS')
  }
}

const mutations = {
  ADD_BOARD (state, board) {
    state.boards = [...state.boards, { ...board }]
  },
  DELETE_BOARD (state, id) {
    const i = state.boards.map(board => board.id).indexOf(id)
    state.boards.splice(i, 1)
  },
  SET_BOARDS (state, boards) {
    state.boards = [...boards]
  },
  CLEAR_BOARDS (state) {
    state.boards = []
  }
}

export default {
  state,
  actions,
  mutations
}
