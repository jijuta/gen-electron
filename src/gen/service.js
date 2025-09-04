//const camelCase = require("camelcase");
//const utils = require("./tpl/utils.js");
//String.prototype.capitalizeFirstLetter = function () {return this.charAt(0).toUpperCase() + this.slice(1);}

function setctrl(payload) {
  let vHtml = `package ${payload.packagedir}.${payload.codedir}.service;

  import java.util.List;
  
  import egovframework.rte.fdl.cmmn.exception.FdlException;
  
  public interface ${payload.Sample}Service {
  
    List<?> select${payload.Sample}List(${payload.Sample}VO searchVO);
  
    List<?> select${payload.Sample}ListAll(${payload.Sample}VO searchVO);
  
    int select${payload.Sample}ListCnt(${payload.Sample}VO searchVO);
  
    void insert${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO) throws FdlException;
  
    ${payload.Sample}VO select${payload.Sample}Detail(${payload.Sample}VO ${payload.SampleSm}VO) throws Exception;
  
    void update${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO);
  
    void delete${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO);
  
  }`;
        return vHtml;
}
module.exports = {
  getCtrl: setctrl
}