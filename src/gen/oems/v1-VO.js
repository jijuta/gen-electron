const setCtrl= function(items, self){
    //console.log(self)
    let tb = items[0];
    
    let SampleVoPrivate = "";
    let SampleVoPublic = "";
    for (var item in items) {
      let row = items[item];
      let camelCaseNm = self.camelCase(row.column_name);
      let camelCaseNmFirst = camelCaseNm.capitalizeFirstLetter();
      let Pri = `
  /** ${row.column_comment} */
  private ${self.dataTypeFnc(
    row.data_type
  )} ${camelCaseNm} = ${self.dataTypeInitValue(row.data_type)};
  `;
      SampleVoPrivate += Pri;
      let Pub = `
  /**
   * ${row.column_comment}
   * ${camelCaseNm} attribute를 리턴한다.
   * @return the ${camelCaseNm}
   */
  public ${self.dataTypeFnc(row.data_type)} get${camelCaseNmFirst}() {
    return ${camelCaseNm};
  } 
  /**
   * ${row.column_comment}
   * ${camelCaseNm} attribute 값을 설정한다.
   * @param ${camelCaseNm}
   *            the ${camelCaseNm} to set
   */
  public void set${camelCaseNmFirst}(${self.dataTypeFnc(row.data_type)} ${camelCaseNm}) {
    this.${camelCaseNm} = ${camelCaseNm};
  }
    `;
      SampleVoPublic += Pub;
    }
    let vHtml = SampleVoPrivate + "\n\t" + SampleVoPublic;
    let sample = self.camelCase(self.sample);
    let Sample = sample.capitalizeFirstLetter();
    let codedirNm = self.codedir.replacecHipon();

    let hHtml = `
/**
 * ${self.servicename} VO
 *  ${self.packagedir}.${codedirNm}.service
*/
package  ${self.packagedir}.${codedirNm}.service;
import egovframework.example.sample.service.SampleDefaultVO;
public class ${Sample}VO extends SampleDefaultVO{

  private static final long serialVersionUID = 1L;
  private String atchFileId;
  private int curPage;
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
 /**
   * @return the curPage
   */
public int getCurPage() {
      return curPage;
}

/**
   * @param curPage the curPage to set
   */
  public void setCurPage(int curPage) {
      this.curPage = curPage;
  }

}
`;

    return hHtml;
}

module.exports = {
    getCtrl : setCtrl
}