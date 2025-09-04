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
    ${vueUtils.inputForm(payload,pkList,"detail")}

    <!-- ref 버튼 클릭 트리서를 이용하여 페이지 열기 -->
    <div style="display:none">
        <a data-bs-toggle="offcanvas" data-bs-target="#detailModal" ref="detailModal" style="display:none">상세보기</a>
    </div>
  </div>
</template>

<script>
${
vueUtils.needFileUpload(payload.items)?(
`
import FileUpload from "@/components/file/FileUpload.vue";
`):(
``
)
}
import { besigMixin } from '../../../Utils.js';
//import AgGridPage from "@/changemenu/changemeAgGridPage.vue" // aggrid page import
export default {
  mixins: [besigMixin],
  components: {
    //AgGridPage // aggrid page import
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
    selectUpdateItem: Function,
    onLoadItem: Function,
  },
  data() {
    return {
        loading: true,
        detailObj:{ 
            ${pkList[0]}:"",
            value:{ // console.log("detail item",response); => 현재 선언되어있는 필드보다 많이 나옴 (리스트랑 같은 필드값을 불러온다)
              ${payload.selectedObj.map((item) => (
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
        this.$refs.detailModal.click();
      },
      closeModal: function () {
        this.$refs.closeModal.click();
      },
      /**
       * @description : 상세보기버튼으로 수정 오브젝트 세팅
       * 
       */
      selectDetailItem:function (){
        this.loading = true;
        this.$axios.get(\`\${this.apiUrl}/byId\`, {
          params: {
            ${pkList[0]}: this.resourceId
          }
        }).then((response) => {
          //result
          console.log("detail item",response);
          const detailItem = response.data.result;
          this.detailObj.${pkList[0]} = this.resourceId;
          this.detailObj.value = detailItem;
          this.onLoadItem();
          this.loading = false;
          console.log(response.data);
        }).catch( (error) => {
          console.log(error);
          this.closeModal();
          this.onLoadItem();
          this.loading = false;

        });
        
      },
  },
  computed: {
      
  },
  watch:{
    resourceId(val){
      if(val)
        this.selectDetailItem();
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
