String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
import vueUtils from '../utils.js';

function setctrl(payload,utils) {
 
  console.log(utils);
  console.log(payload);
  const pkList = payload.items.filter((item) => item.pk_flag === "Y").map((item) => vueUtils.toCamelCase(item.column_name));
  const projectName=vueUtils.toCamelCase(payload.tb.table_name);
  const tableName=payload.tb.table_comment;
  console.log(pkList);
  const vhtml=`
  <template>
  <div>
    <!-- 생성 -->
    ${vueUtils.inputForm(payload,pkList,"create")}
    <!-- ref 버튼 클릭 트리서를 이용하여 페이지 열기 -->
    <div style="display:none">
        <a data-bs-toggle="offcanvas" href="#createModal"   ref="createModal" aria-controls="offcanvasTop">생성 offcanvas</a>
    </div>
  </div>
</template>

<script>
${
vueUtils.needFileUpload(payload.items)?(
`
import FileUpload from "@/components/file/FileUpload.vue";
import utils from "@/components/file/utils.js"
`):(
``
)
}
import { besigMixin } from '../../../Utils.js';
export default {
  mixins: [besigMixin],
  components: {
    ${
      vueUtils.needFileUpload(payload.items)?(
      `
      FileUpload
      `):(
      ``
      )
      }      
  },
  props:{
    apiUrl: String,
    onSuccess: Function,
  },
  data() {
    return {
        createObj:{ 
            ${pkList[0]}:"",
            value:{
              ${payload.insertTabledobj.map((item) => (
              `${vueUtils.toCamelCase(item.column_name)} : "" \n\t\t\t\t`
               ))}
            }
        },
    }
  },
  mounted() {
  },
  methods: {
      ${
        vueUtils.needFileUpload(payload.items)?(
        `
        hasFile(item){
          return item.fileSelector!==""&&item.fileSelector!=="NONE";
        },
        `
        ):(
        ``
        )
      }
      clickModal: function () {
        this.$refs.createModal.click();
      },
      closeModal: function () {
        this.$refs.closeModal.click();
      },
      /**
       * @description : 생성 오브젝트 초기화
       */
      initCreateObj: function (){
        this.createObj.value={
          ${payload.insertTabledobj.map((item) => (
            ` 
            ${vueUtils.toCamelCase(item.column_name)} : ""`
          ))}
        };
        this.createObj.${pkList[0]}="";
      },
      /**
       * @description : 생성 폼에서 변경된 오브젝트로 생성 api 호출
       */
      createItem:function() {
        console.log("create form",this.createObj);
        const params=this.createObj.value;
        ${
          vueUtils.needFileUpload(payload.insertTabledobj)?(
        `
        if(this.$refs.createFileModal.readyFileCount!==0){
          params.fileSelector=utils.randomUUID();
        }else{
          params.fileSelector="NONE";
        }
        `
          ):(
            ``
          )
        }
        this.$axios.post(this.apiUrl, params)
            .then((response)=> {
                console.log(response,this);
                ${
                  vueUtils.needFileUpload(payload.insertTabledobj)?(
                `
                if(this.hasFile(params)){
                  this.$refs.createFileModal.uploadAllFiles();
                }
                `
                  ):(
                    ``
                  )
                }
                alert("success createObj");
                this.onSuccess();
                this.initCreateObj();
                this.closeModal();
            })
            .catch((error)=>{
              if(error.response?.data?.error_message){
                alert(error.response.data.error_message);
              }
              console.log("error at create",error);
            });
      },
  },
  computed: {
      
  },
  watch:{
    resourceId(){
      this.selectUpdateItem();
    } 
  },
}
</script>

<style>

.pagination {
margin-top: 10px;
float: right;
}
.${projectName}{

}
.cmp-list{

}
.cmp-update{

}
.cmp-create{
  
}
.cmp-search{
  
}
.cmp-update-form{

}
.cmp-create-form{
  
}
.cmp-search-form{
  
}
</style>

`
  return vhtml;
}

export default { getCtrl: setctrl };
