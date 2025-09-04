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
    let SampleSmIdx = "uid";
    let basicPath = self.basicPath;
    let vHtml = `package ${basicPath}.${codedir}.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ${basicPath}.${codedir}.service.${Sample}Service;
import ${basicPath}.${codedir}.service.${Sample}VO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.cmmn.exception.FdlException;

@Service("${Sample}Service")
public class ${Sample}ServiceImpl extends EgovAbstractServiceImpl implements ${Sample}Service {

	@Resource(name="${Sample}DAO")
    private ${Sample}DAO ${Sample}Dao;

    
	@Override
	public List<?> select${Sample}List(${Sample}VO searchVO) {
		return ${Sample}Dao.select${Sample}List(searchVO);
	}

	@Override
	public List<?> select${Sample}ListAll(${Sample}VO searchVO) {
		return ${Sample}Dao.select${Sample}ListAll(searchVO);
	}

	@Override
	public int select${Sample}ListCnt(${Sample}VO searchVO) {
		return ${Sample}Dao.select${Sample}ListCnt(searchVO);
	}

	@Override
	public void insert${Sample}(${Sample}VO ${SampleSm}VO) throws FdlException {
		
		${Sample}Dao.insert${Sample}(${SampleSm}VO);
	}

	@Override
	public ${Sample}VO select${Sample}Detail(${Sample}VO ${SampleSm}VO) throws Exception {
		${Sample}VO resultVO = ${Sample}Dao.select${Sample}Detail(${SampleSm}VO);
        if (resultVO == null)
            throw processException("info.nodata.msg");
        return resultVO;
	}

	@Override
	public void update${Sample}(${Sample}VO ${SampleSm}VO) {
		${Sample}Dao.update${Sample}(${SampleSm}VO);
	}

	@Override
	public void delete${Sample}(${Sample}VO ${SampleSm}VO) {
		${Sample}Dao.delete${Sample}(${SampleSm}VO);
	}

}`;
    return vHtml;
}

module.exports = {
    getCtrl: setCtrl
}