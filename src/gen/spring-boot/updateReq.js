const camelCase = require("camelcase");

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const setctrl =  function(payload, utils)  {
  //let payload = items;//self.payload;
  let tb = payload.updateTabledobj[0];
  let SampleVoPrivate = "";
  let SampleVoPublic = "";
  function validAnnotation(item){
    return utils.dataTypeFnc(
      item.data_type
    )==="String"?"@NotBlank":"@NotNull";
  }
  for (var item in payload.updateTabledobj) {
    let row = payload.updateTabledobj[item];
    let camelCaseNm = camelCase(row.column_name);
    let camelCaseNmFirst = camelCaseNm.capitalizeFirstLetter();
    let Pri = `
    /** ${row.column_comment} */\n`
    +
    (row.validNotNull?
      `\t${validAnnotation(row)}(message = "${row.column_comment}(이)가 필요합니다")
      `:
      ``)
    +`\tprivate ${utils.dataTypeFnc(
          row.data_type
        )} ${camelCaseNm} = ${utils.dataTypeInitValue(row.data_type)};
    `;
    SampleVoPrivate += Pri;
      
  }
  let vHtml = SampleVoPrivate + "\n\t" ;
  let codedirNm = payload.codedir;

  let hHtml = `package  ${payload.packagedir}.${codedirNm}.${payload.SampleSm}.dto;
  
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class Update${payload.Sample}Request{
${vHtml}
}
`;
  return hHtml; //[SampleVoPrivate, SampleVoPublic];
}
export default{ getCtrl : setctrl};
