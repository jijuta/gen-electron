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
    <!-- 상세 및 수정 -->
    ${vueUtils.inputForm(payload,pkList,"update")}

    <!-- ref 버튼 클릭 트리서를 이용하여 페이지 열기 -->
    <div style="display:none">
        <a data-bs-toggle="offcanvas" href="#updateModal" ref="updateModal" aria-controls="offcanvasStart" >수정 offcanvas</a>
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
    resourceId: [String,Number],
    onSuccess: Function,
    onLoadItem: Function,
  },
  data() {
    return {
        loading: true,
        updateObj:{ 
            ${pkList[0]}:"",
            value:{
              ${payload.updateTabledobj.map((item) => (
              `${vueUtils.toCamelCase(item.column_name)} : "" \n\t\t\t\t`
            ))}
        }
      }
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
        this.$refs.updateModal.click();
      },
      closeModal: function () {
        this.$refs.closeModal.click();
      },
      /**
      * @description : 수정 오브젝트 초기화 , 값의 여부가 수정폼의 노출 여부를 결정
      */
      initUpdateObj: function (){
        this.updateObj.value={
          ${payload.updateTabledobj.map((item) => (
            ` 
            ${vueUtils.toCamelCase(item.column_name)} : "" `
        ))}
        };
        this.updateObj.${pkList[0]}=""; 
      },
      /**
       * @description : 상세보기버튼으로 수정 오브젝트 세팅
       */
      selectUpdateItem:function (){
        this.loading = true;
        this.$axios.get(\`\${this.apiUrl}/byId\`, {
          params: {
            ${pkList[0]}: this.resourceId
          }
        }).then((response) => {
          //result
          console.log("detail item",response);
          const detailItem = response.data.${projectName}s;
          this.updateObj.${pkList[0]} = this.resourceId;
          this.updateObj.value = detailItem;
          this.onLoadItem();
          this.loading = false;
          console.log(response.data);
        }).catch( (error) => {
          console.log(error);
          this.closeModal();
          this.initUpdateObj();
          this.onLoadItem();
          this.loading = false;
        });
        
      },
      /**
       * @description : 세팅되고 수정 폼에서 변경된 오브젝트로 수정 api 호출
       */
      updateItem:function() {
              console.log("update form",this.updateObj);
              const params=this.updateObj.value;
              ${
                vueUtils.needFileUpload(payload.updateTabledobj)?(
              `
              if(this.hasFile(params)&&this.$refs.updateFileModal.readyFileCount===0){
                //파일 셀렉터가 있는데 파일이 없을경우
                params.fileSelector="NONE";
              }else if(!this.hasFile(params)&&this.$refs.updateFileModal.readyFileCount!==0){
                //파일 셀렉터가 없는데 파일이 생길 경우
                params.fileSelector=utils.randomUUID();
              }
              `
                ):(
                  ``
                )
              }
              this.$axios.put(this.apiUrl, params,{
                params:{
                  ${pkList[0]}:this.updateObj.${pkList[0]}
                }
              })
                  .then((response)=> {
                      console.log(response);
                      ${
                        vueUtils.needFileUpload(payload.updateTabledobj)?(
                      `
                      if(this.hasFile(params)){
                        this.$refs.updateFileModal.uploadAllFiles();
                      }
                      `
                        ):(
                          ``
                        )
                      }
                      alert("success update");
                      this.onSuccess();
                      this.closeModal();
                  })
                  .catch((error)=> {
                    if(error.response?.data?.error_message){
                      alert(error.response.data.error_message);
                    }
                    console.log("error at update",error);
                  });
              // location.reload();
      },
  },
  computed: {
      
  },
  watch:{
    resourceId(val){
      if(val)
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
