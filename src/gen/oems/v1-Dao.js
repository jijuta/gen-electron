function setCtrl(items, self) {
    let camelCase = self.camelCase;
    let item = items[0];
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
    let vHtml = `package ${basicPath}.${codedir}.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import ${basicPath}.${codedir}.service.${Sample}VO;

@Repository("${Sample}DAO")
public class ${Sample}DAO extends EgovComAbstractDAO {

	public List<?> select${Sample}List(${Sample}VO searchVO) {
		return list("${Sample}Manage.select${Sample}List", searchVO);
	}

	public List<?> select${Sample}ListAll(${Sample}VO searchVO) {
		return list("${Sample}Manage.select${Sample}ListAll", searchVO);
	}

	public int select${Sample}ListCnt(${Sample}VO searchVO) {
		return (Integer) selectOne("${Sample}Manage.select${Sample}ListCnt", searchVO);
	}

	public void insert${Sample}(${Sample}VO ${SampleSm}VO) {
		insert("${Sample}Manage.insert${Sample}", ${SampleSm}VO);
	}

	public ${Sample}VO select${Sample}Detail(${Sample}VO ${SampleSm}VO) {
		return (${Sample}VO) selectOne("${Sample}Manage.select${Sample}Detail", ${SampleSm}VO);
	}

	public void update${Sample}(${Sample}VO ${SampleSm}VO) {
		update("${Sample}Manage.update${Sample}", ${SampleSm}VO);
	}

	public void delete${Sample}(${Sample}VO ${SampleSm}VO) {
		delete("${Sample}Manage.delete${Sample}", ${SampleSm}VO);
	}

}`;
    return vHtml;
}

module.exports = {
    getCtrl: setCtrl
}