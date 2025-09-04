
const config = require("../config/config.js");
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * 
 * @param {*} Sample 서비스명 아퀴먼트를 
 * @param {*} SampleSm Sample 소문자
 * @param {*} SampleLg Sample 대문자
 * @param {*} SampleSmIdx 프라이머리 키 아퀴먼트를
 * @param {*} SampleUrl 아귀먼트 where
 * @param {*} SampleSmIdxUcfirst SampleSmIdx 아퀴먼트를 첫문자 대문자로
 * @param {*} codedir  페키지명 아퀴먼트를 
 * @param {*} codedirTitle 페키지 타이틀
 * @param {*} ControllerDataTypeName 
 */
function dao(codedirTitle, SampleSmIdx, ControllerDataTypeName, Sample, codedir) {

    codedir = config.codedir;
    codedirTitle = codedirTitle ? codedirTitle : config.codedirTitle;
    Sample = Sample ? Sample : config.Sample;
    SampleSmIdx = SampleSmIdx ? SampleSmIdx : config.SampleSmIdx;
    ControllerDataTypeName = ControllerDataTypeName ? ControllerDataTypeName :config.ControllerDataTypeName;

    let SampleLg = Sample.toUpperCase();
    let SampleSm = Sample.toLowerCase();
    let SampleUrl = codedir + '/' + SampleSm;
    let SampleSmIdxUcfirst = SampleSmIdx.capitalizeFirstLetter();



    let c = `
package egovframework.com.${payload.codedir}.service.impl;

import java.util.List;
import org.springframework.stereotype.Repository;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.com.${payload.codedir}.service.${payload.Sample}VO;

@Repository("${payload.Sample}DAO")
public class ${payload.Sample}DAO extends EgovComAbstractDAO {

	public List<?> select${payload.Sample}List(${payload.Sample}VO searchVO) {
		return list("${payload.Sample}Manage.select${payload.Sample}List", searchVO);
	}

	public int select${payload.Sample}ListCnt(${payload.Sample}VO searchVO) {
		return (Integer) selectOne("${payload.Sample}Manage.select${payload.Sample}ListCnt", searchVO);
	}

	public void insert${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO) {
		insert("${payload.Sample}Manage.insert${payload.Sample}", ${payload.SampleSm}VO);
	}

	public ${payload.Sample}VO select${payload.Sample}Detail(${payload.Sample}VO ${payload.SampleSm}VO) {
		return (${payload.Sample}VO) selectOne("${payload.Sample}Manage.select${payload.Sample}Detail", ${payload.SampleSm}VO);
	}

	public void update${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO) {
		update("${payload.Sample}Manage.update${payload.Sample}", ${payload.SampleSm}VO);
	}

	public void delete${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO) {
		delete("${payload.Sample}Manage.delete${payload.Sample}", ${payload.SampleSm}VO);
	}

}
`

    return c;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
module.exports = {
    dao: Controller,
    substract: substract,
    multiply: multiply,
    divide: divide,
};