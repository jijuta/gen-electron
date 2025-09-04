const camelCase = require("camelcase");
// String.prototype.capitalizeFirstLetter = function () {
//   // return this.charAt(0).toUpperCase() + this.slice(1);
//   return this.charAt(0).toUpperCase();
// }
const setctrl = function(payload, utils) {
  //let payload = items;//self.payload;
  let tb = payload.items[0];
  let SampleVoPrivate = "";
  let SampleVoPublic = "";
  for (var item in payload.items) {
    let row = payload.items[item];
    let camelCaseNm = camelCase(row.column_name);
    let camelCaseNmFirst = camelCaseNm.capitalizeFirstLetter();
    let Pri = `
    /** ${row.column_comment} */
    private ${utils.dataTypeFnc(
          row.data_type
        )} ${camelCaseNm} = ${utils.dataTypeInitValue(row.data_type)};
    `;
        SampleVoPrivate += Pri;
        let Pub = `
    /**
     * ${row.column_comment}
     * ${camelCaseNm} attribute를 리턴한다.
     * @return the ${camelCaseNm}
     */
    public ${utils.dataTypeFnc(row.data_type)} get${camelCaseNmFirst}() {
      return ${camelCaseNm};
    }
    /**
     * ${row.column_comment}
     * ${camelCaseNm} attribute 값을 설정한다.
     * @param ${camelCaseNm}
     *            the ${camelCaseNm} to set
     */
    public void set${camelCaseNmFirst}(${utils.dataTypeFnc(row.data_type)} ${camelCaseNm}) {
      this.${camelCaseNm} = ${camelCaseNm};
    }
        `;
    SampleVoPublic += Pub;
  }
  let vHtml = SampleVoPrivate + "\n\t" + SampleVoPublic;
  let sampleNm = payload.sampleNm;
  let sampleNmFirst = payload.sampleNmFirst;
  let codedirNm = payload.codedir;

  let hHtml = `/**
*
* ${payload.codedirTitle} ${sampleNm} VO 클래스
* @author auto
* @since ${payload.today}
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*   수정일      수정자           수정내용
*  -------    --------    ---------------------------
*   ${payload.today}  자동화          최초 생성
*   ${payload.packagedir}
* </pre>
*/
package  ${payload.packagedir}.${codedirNm}.service;
import java.util.List;
import  egovframework.com.cmm.CommDefaultVO;
public class ${payload.Sample}VO extends CommDefaultVO {

    private static final long serialVersionUID = 1L;
    private String atchFileId;
    /** orderby */
    private List<CommDefaultVO> orderbylist = null;
${vHtml}
    /**
     * @return the atchFileId
     */
    public String getAtchFileId() {
      return atchFileId;
    }

    /**
     * @param atchFileId the atchFileId to set
     */
    public void setAtchFileId(String atchFileId) {
      this.atchFileId = atchFileId;
    }

    public List<CommDefaultVO> getOrderbylist() {
      return orderbylist;
    }
    public void setOrderbylist(List<CommDefaultVO> orderbylist) {
      this.orderbylist = orderbylist;
    }
}
`;

  return hHtml; //[SampleVoPrivate, SampleVoPublic];
}

module.exports = {
  getCtrl  : setctrl
};
