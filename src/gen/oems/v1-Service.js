function setCtrl(items, self) {
    let camelCase = self.camelCase;
    let sample = camelCase(self.sample);
    let Sample = sample.capitalizeFirstLetter();
    let SampleLg = sample.toUpperCase();
    let SampleSmIdxUcfirst = sample.capitalizeFirstLetter();
    let SampleSm = sample.toLowerCase();
    let codedirTitle = self.servicename;
    let codedir = self.codedir.replacecHipon();
    let SampleUrl = self.codedir.replacecUrl();
    let reguserfd = self.reguserfd;
    let edituserfd = self.edituserfd;
    let ControllerDataTypeName = "int";
    let SampleSmIdx = "sn";
    let basicPath = self.basicPath;
    let vHtml = `package ${basicPath}.${codedir}.service;

import java.util.List;

import egovframework.rte.fdl.cmmn.exception.FdlException;

public interface ${Sample}Service {

	List<?> select${Sample}List(${Sample}VO searchVO);

	List<?> select${Sample}ListAll(${Sample}VO searchVO);

	int select${Sample}ListCnt(${Sample}VO searchVO);

	void insert${Sample}(${Sample}VO ${SampleSm}VO) throws FdlException;

	${Sample}VO select${Sample}Detail(${Sample}VO ${SampleSm}VO) throws Exception;

	void update${Sample}(${Sample}VO ${SampleSm}VO);

	void delete${Sample}(${Sample}VO ${SampleSm}VO);

}`;
    return vHtml;
}

module.exports = {
    getCtrl: setCtrl
}