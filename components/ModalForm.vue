<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="my-modal"
      title="ADD NEW TASK"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
          :state="titleState"
        >
          <b-form-input
            id="title-input"
            v-model="title_"
            :state="titleState"
            maxlength=255
            required
            :disabled="disabled"
          ></b-form-input>

          
        </b-form-group>

        <b-form-group
          label="Status"
          label-for="status-input"
          invalid-feedback="Status is required"
          :state="statusState"
        >
        <b-form-select v-model="status" :state="statusState" :options="options" sclass="mt-3"></b-form-select>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        disabled:false,
        title: 'ModalForm',
        status: 1,
        id:null,
        submittedNames: [],
        title_:'',
        titleState: null,
        statusState:null,
        options: [
          { value: 1, text: 'Acil' },
          { value: 2, text: 'Önemli' },
          { value: 3, text: 'Normal' }
        ]
      }
    },
    computed: {
     ...mapGetters('todo-list',['getResults']),
    },
    methods: {
      ...mapActions('todo-list',['setData','addData']),
      checkFormValidity() {

        const valid = this.$refs.form.checkValidity()
        this.titleState = valid
        
        if (this.status==='')
        {
          this.statusState = false
          return false
        }
        else
        {
          this.statusState = valid
        }
        return valid
      },
      resetModal() {
        this.title_ = ''
        this.titleState = null
        this.status = ''
        this.titleState = null
      },
      handleOk(bvModalEvent) {
        bvModalEvent.preventDefault()
        this.handleSubmit()
      },
      handleSubmit() {
        if (!this.checkFormValidity()) {
          return
        }
        
        var arr = JSON.parse(localStorage.getItem('data'));
        if(arr==null)
          arr= []
        if(arr.length==0)
          var index = arr.length
        else
          var index = arr.length+1

        if(this.id==null)
        {
          this.addData({'id':index, 'title':this.title_,'status':this.status})
        }
        else
        {
          for(var item in arr)
          {
            if(arr[item].id==this.id)
            {
              arr[item].title = this.title_
              arr[item].status = this.status
            }
          }
          this.setData(arr)
        }
      
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
  }
</script>
