const setctrl = function(payload, self) {
    //let payload = self.payload;
    let tb = payload.items[0];
    let vHtml = `package ${payload.packagedir}.${payload.codedir}.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import ${payload.packagedir}.${payload.codedir}.service.${payload.Sample}VO;

@Repository("${payload.Sample}DAO")
public class ${payload.Sample}DAO extends EgovComAbstractDAO {

	public List<?> select${payload.Sample}List(${payload.Sample}VO searchVO) {
		return list("${payload.Sample}Manage.select${payload.Sample}List", searchVO);
	}

	public List<?> select${payload.Sample}ListAll(${payload.Sample}VO searchVO) {
		return list("${payload.Sample}Manage.select${payload.Sample}ListAll", searchVO);
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

}`;
      return vHtml;
}
module.exports = {
	getCtrl : setctrl
}