<template>
  <admin-layout>
    <div class="is-flex">
      <h1 class="title is-5">Auditoria</h1>
      <b-tooltip label="Exportar CSV" type="is-dark" position="is-left" style="margin-left: auto">
        <b-button @click="getCSV()" type="is-primary" icon-right="content-save"/>
      </b-tooltip>
    </div>
    <section class="filters columns">
      <b-field label="User Id" class="column is-one-fifth">
        <b-input @input="getData()" icon="account-search" v-model="filter.user_id" numeric />
      </b-field>
      <b-field label="Tabela" class="column">
        <div class="control is-flex">
          <b-select v-model="filter.affected_table">
            <option :value="''">Todas</option>
            <option value="users">Users</option>
            <option value="boards">Boards</option>
            <option value="lists">Lists</option>
          </b-select>
        </div>
      </b-field>
    </section>
    <b-table
      :data="data"
      :loading="loading"
      paginated
      backend-pagination
      searchable
      @page-change="onPageChange"
      :debounce-search="1000"
      :height="380"
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
        <b-table-column field="operation" label="Operação">{{ props.row.operation }}</b-table-column>
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
import electron from 'electron'
import fs from 'fs'
const {dialog} = electron.remote

export default {
  components: {
    AdminLayout
  },
  data () {
    return {
      filter: {
        user_id: '',
        affected_table: ''
      },
      modalCsv: false,
      csv: '',
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
    getCSV () {
      var options = {
        title: 'Salvar arquivo',
        defaultPath: `audit-${new Date().getTime()}`,
        buttonLabel: 'Salvar',

        filters: [
          {name: 'CSV Files', extensions: ['csv']},
          {name: 'All Files', extensions: ['*']}
        ]
      }
      this.$api('api/admin/export').then(res => {
        dialog.showSaveDialog(options, (filename) => {
          fs.writeFileSync(filename, res.data, 'utf-8')
        })
      })
    },
    getData () {
      let params = []
      if (this.page) params.push(`page=${this.page}`)
      if (this.filter.user_id) params.push(`user_id=${this.filter.user_id}`)
      if (this.filter.affected_table) params.push(`affected_table=${this.filter.affected_table}`)
      params = params.join('&')

      this.loading = true
      this.$api.get(`api/admin/audits?${params}`)
        .then(res => res.data)
        .then(data => {
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
    }
  },
  watch: {
    'filter.affected_table': function (newVal, oldVal) {
      if (newVal !== oldVal) this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  background: #f7f7f7;
  margin: 0 0 10px 0;
  border-radius: 3px;
  border: 1px solid #ddd;
}
</style>