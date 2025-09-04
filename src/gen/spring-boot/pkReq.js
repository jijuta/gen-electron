const camelCase = require("camelcase");

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const setctrl = function(payload, utils)  {
  //let payload = items;//self.payload;
  let SampleVoPrivate = "";
  function validAnnotation(item){
    return utils.dataTypeFnc(
      item.data_type
    )==="String"?"@NotBlank":"@NotNull";
  }
  for (var item in payload.pkObjList) {
    let row = payload.pkObjList[item];
    let camelCaseNm = camelCase(row.column_name);
    let camelCaseNmFirst = camelCaseNm.capitalizeFirstLetter();
    let Pri =`
    /** ${row.column_comment} */\n`
    +(`\t${validAnnotation(row)}(message = "${row.column_comment}(이)가 필요합니다")\n`)
    +`\tprivate ${utils.dataTypeFnc(
          row.data_type
        )} ${camelCaseNm} = ${utils.dataTypeInitValue(row.data_type)};
    `;
        SampleVoPrivate += Pri;
      
  }
  let vHtml = SampleVoPrivate + "\n\t" ;
  let hHtml = `package  ${payload.packagedir}.${payload.codedir}.${payload.SampleSm}.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class ${payload.Sample}PKRequest{
${vHtml}
}
`;
  return hHtml; //[SampleVoPrivate, SampleVoPublic];
}
export default{ getCtrl : setctrl};
