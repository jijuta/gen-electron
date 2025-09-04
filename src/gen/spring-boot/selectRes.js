const camelCase = require("camelcase");

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const setctrl =  function(payload, utils)  {
  //let payload = items;//self.payload;
  let tb = payload.selectedObj[0];
  let SampleVoPrivate = "";
  let SampleVoPublic = "";
  for (var item in payload.selectedObj) {
    let row = payload.selectedObj[item];
    let camelCaseNm = camelCase(row.column_name);
    let camelCaseNmFirst = camelCaseNm.capitalizeFirstLetter();
    let Pri = `
    /** ${row.column_comment} */
    private ${utils.dataTypeFnc(
          row.data_type
        )} ${camelCaseNm} = ${utils.dataTypeInitValue(row.data_type)};
    `;
        SampleVoPrivate += Pri;
      
  }
  let vHtml = SampleVoPrivate + "\n\t" ;
  let hHtml = `package  ${payload.packagedir}.${payload.codedir}.${payload.SampleSm}.dto;
  
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Select${payload.Sample}Response{
${vHtml}
}
`;
  return hHtml; //[SampleVoPrivate, SampleVoPublic];
}
export default{ getCtrl : setctrl};
