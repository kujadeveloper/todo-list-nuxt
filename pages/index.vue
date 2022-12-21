<template>
 <div class="todo-padding">
    <div class="todo-btn-padding">
      <b-button variant="success" @click="showModal">Ekle</b-button>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="getResults"
      :sort-options="{
        enabled: true,
        initialSortBy: {field: 'status', type: 'asc'}
        }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'status'">
          <b-badge variant="danger" v-if="props.row.status==1">Acil</b-badge>
          <b-badge variant="warning" v-if="props.row.status==2">Önemli</b-badge>
          <b-badge variant="info" v-if="props.row.status==3">Normal</b-badge>
        </span>
        <span v-else-if="props.column.field == 'progress'">
          <b-button variant="outline-primary" size="sm" @click="EditModal(props.row)">Düzenle</b-button>
           <b-button variant="outline-danger" size="sm" @click="deleteRow(props)">Sil</b-button>
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
    </vue-good-table>
    <ModalForm/>
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import ModalForm from '@/components/ModalForm';
import { mapActions, mapMutations, mapGetters } from 'vuex'


export default {
  name: 'IndexPage',
  layout: 'defaults',
  components: {
    ModalForm
  },
  computed: {
     ...mapGetters('todo-list',['getResults']),
  },
  data(){
    return {
      columns: [
        {
          label: 'Title',
          field: 'title',
          filterOptions: {
            styleClass: 'class1', // class to be added to the parent th element
            enabled: true, // enable filter for this column
            placeholder: 'Filter This Thing', // placeholder for filter input
            filterValue: '', // initial populated value for this filter
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
            filterFn: this.columnFilterFn, //custom filter function that
            trigger: 'enter', //only trigger on enter not on keyup 
          },
        },
        {
          label: 'Status',
          field: 'status',
          filterOptions: {
            styleClass: 'class1', // class to be added to the parent th element
            enabled: true, // enable filter for this column
            placeholder: 'Filter This Thing', // placeholder for filter input
            filterValue: '', // initial populated value for this filter
            filterDropdownItems: [{'value':1, 'text':'Acil'},{'value':2, 'text':'Önemli'},{'value':3, 'text':'Normal'}], // dropdown (with selected values) instead of text input
            filterFn: this.columnFilterFn, //custom filter function that
            trigger: 'enter', //only trigger on enter not on keyup 
          },
        },
        {
          label: 'Progress',
          field: 'progress',
          sortable: false
        }
      ],
    };
  },
  mounted(){
     var localdata = JSON.parse(localStorage.getItem('data'))
     console.log(localdata)
     this.setData(localdata)
  },
  methods: {
    ...mapActions('todo-list',['setData','deleteData']),
    showModal() {
      this.$children[1]._data.disabled = false
      this.$children[1].resetModal()
      this.$children[1].$refs['my-modal'].show()
      this.$children[1].id = null
    },
    EditModal(row) {
      this.$children[1]._data.disabled = true
      this.$children[1].$refs['my-modal'].show()
      this.$children[1].title_ = row.title
      this.$children[1].status = row.status
      this.$children[1].id = row.id
    },
    deleteRow(row){
      var ths = this;
      this.$dialog
      .confirm('Please confirm to continue')
      .then(function(dialog) {
        ths.deleteData(row)
        console.log('Clicked on proceed');
      })
      .catch(function() {
        console.log('Clicked on cancel');
      });

    }
  }
}
</script>
