<template>
  <admin-layout>
    <h1 class="title is-5">Auditoria</h1>
    <b-table
      :data="data"
      :loading="loading"
      paginated
      backend-pagination
      searchable
      @page-change="onPageChange"
      :debounce-search="1000"
      :height="510"
      sticky-header
      :per-page="perPage"
      :current-page="page"
      :total="total"
      sort-icon="arrow-up"
      default-sort="name"
      aria-next-label="Próxima"
      aria-previous-label="Anterior"
      aria-page-label="Página"
      aria-current-label="Página atual"  
    >
      <template v-slot="props">
        <b-table-column field="operation" width="20">
          <b-icon v-if="props.row.operation === 'D'" type="is-danger" icon="trash-can"/>
          <b-icon v-else-if="props.row.operation === 'I'" icon="plus-circle-outline"/>
          <b-icon v-else-if="props.row.operation === 'U'" icon="update"/>
        </b-table-column>
        <b-table-column field="operation" label="Operação">{{ getOperationName(props.row.operation) }}</b-table-column>
        <b-table-column field="affected_table" label="Tabela">{{ props.row.affected_table }}</b-table-column>
        <b-table-column field="affected_id" label="Item">{{ props.row.affected_id }}</b-table-column>
        <b-table-column field="created_at" label="Horário">
          <span class="tag">
            {{ new Date(props.row.created_at).toLocaleDateString() }}
            {{ new Date(props.row.created_at).toLocaleTimeString() }}
          </span>
        </b-table-column>
      </template>
    </b-table>
  </admin-layout>
</template>

<script>
import AdminLayout from '../../layout/AdminLayout'

export default {
  components: {
    AdminLayout
  },
  data () {
    return {
      operations: {
        I: 'Inserção',
        D: 'Exclusão',
        U: 'Atualização'
      },
      data: [],
      page: 1,
      perPage: 20,
      total: 0,
      loading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const params = [`page=${this.page}`].join('&')
      this.loading = true
      this.$api.get(`api/admin/audits?${params}`)
        .then(res => res.data)
        .then(data => {
          console.log(data)
          this.data = data.data
          this.perPage = data.perPage
          this.total = parseInt(data.total)
          this.loading = false
        }).catch(() => {
          this.data = []
          this.total = 0
          this.loading = false
        })
    },
    onPageChange (page) {
      this.page = page
      this.getData()
    },
    getOperationName (key) {
      return this.operations[key]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>