<template>
  <admin-layout>
    <h1 class="title is-5">Log de erros</h1>
    <b-table
      :data="data"
      :loading="loading"
      paginated
      backend-pagination
      searchable
      @page-change="onPageChange"
      :height="510"
      sticky-header
      :per-page="perPage"
      :current-page="page"
      :total="total"
      sort-icon="arrow-up"
      :opened-detailed="defaultOpenedDetails"
      detailed
      detail-key="id"
      default-sort="name"
      aria-next-label="Próxima"
      aria-previous-label="Anterior"
      aria-page-label="Página"
      aria-current-label="Página atual"  
    >
      <template v-slot="props">
        <b-table-column field="id" label="Id" width="20">{{ props.row.id  }}</b-table-column>
        <b-table-column field="level" label="Level">
          <b-tag type="is-danger is-light">
            {{ props.row.level }}
          </b-tag>
        </b-table-column>
        <b-table-column field="event" label="Evento">{{ props.row.event }}</b-table-column>
        <b-table-column field="created_at" label="Horário">
          <span class="tag">
            {{ new Date(props.row.created_at).toLocaleDateString() }}
            {{ new Date(props.row.created_at).toLocaleTimeString() }}
          </span>
        </b-table-column>
      </template>
      <template slot="detail" slot-scope="props">
        <article class="columns">
          <div class="column is-one-quarter">
            <small><b>Id</b>: {{ props.row.user.id }}</small><br>
            <small><b>Nome</b>: {{ props.row.user.name }}</small><br>
            <small><b>Username</b>: {{ props.row.user.username }}</small><br>
            <small><b>Email</b>: {{ props.row.user.email }}</small>
          </div>
          <div class="column">
            <p class="code select-text">
              {{ props.row.description }}
            </p>
          </div>
        </article>
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
      defaultOpenedDetails: [],
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
      this.$api.get(`api/admin/logs?${params}`)
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
.code {
  background: #646464;
  max-width: 80%;
  overflow: scroll;
  border-radius: 6px;
  padding: 10px;
  font-size: 13px;
  color: #ffffff;
  line-height: 13px;
  font-family: inherit;
  min-height: 95px;
}
</style>