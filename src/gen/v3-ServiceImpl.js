const setctrl = function(payload, self) {
    //let payload = self.payload;
    let tb = payload.items[0];
    let sampleNm = payload.sampleNm;
    let sampleNmFirst = payload.sampleNmFirst;
    let codedirNm = payload.codedir;
    let vHtml = `package ${payload.packagedir}.${codedirNm}.service.impl;

import java.util.List;

import ${payload.packagedir}.${codedirNm}.service.${payload.Sample}Service;
import ${payload.packagedir}.${codedirNm}.service.${payload.Sample}DefaultVO;
import ${payload.packagedir}.${codedirNm}.service.${payload.Sample}VO;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @Class Name : Egov${payload.Sample}ServiceImpl.java
 * @Description : ${payload.Sample} Business Implement Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Service("${payload.sample}Service")
public class Egov${payload.Sample}ServiceImpl extends EgovAbstractServiceImpl implements Egov${payload.Sample}Service {

	private static final Logger LOGGER = LoggerFactory.getLogger(Egov${payload.Sample}ServiceImpl.class);

	/** ${payload.Sample}DAO */
	// TODO ibatis 사용
	@Resource(name = "${payload.sample}DAO")
	private ${payload.Sample}DAO ${payload.sample}DAO;
	// TODO mybatis 사용
	//  @Resource(name="${payload.sample}Mapper")
	//	private ${payload.Sample}Mapper ${payload.sample}DAO;

	/** ID Generation */
	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;

	/**
	 * 글을 등록한다.
	 * @param vo - 등록할 정보가 담긴 ${payload.Sample}VO
	 * @return 등록 결과
	 * @exception Exception
	 */
	@Override
	public String insert${payload.Sample}(${payload.Sample}VO vo) throws Exception {
		LOGGER.debug(vo.toString());

		/** ID Generation Service */
		String id = egovIdGnrService.getNextStringId();
		vo.setId(id);
		LOGGER.debug(vo.toString());

		${payload.sample}DAO.insert${payload.Sample}(vo);
		return id;
	}

	/**
	 * 글을 수정한다.
	 * @param vo - 수정할 정보가 담긴 ${payload.Sample}VO
	 * @return void형
	 * @exception Exception
	 */
	@Override
	public void update${payload.Sample}(${payload.Sample}VO vo) throws Exception {
		${payload.sample}DAO.update${payload.Sample}(vo);
	}

	/**
	 * 글을 삭제한다.
	 * @param vo - 삭제할 정보가 담긴 ${payload.Sample}VO
	 * @return void형
	 * @exception Exception
	 */
	@Override
	public void delete${payload.Sample}(${payload.Sample}VO vo) throws Exception {
		${payload.sample}DAO.delete${payload.Sample}(vo);
	}

	/**
	 * 글을 조회한다.
	 * @param vo - 조회할 정보가 담긴 ${payload.Sample}VO
	 * @return 조회한 글
	 * @exception Exception
	 */
	@Override
	public ${payload.Sample}VO select${payload.Sample}(${payload.Sample}VO vo) throws Exception {
		${payload.Sample}VO resultVO = ${payload.sample}DAO.select${payload.Sample}(vo);
		if (resultVO == null)
			throw processException("info.nodata.msg");
		return resultVO;
	}

	/**
	 * 글 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<?> select${payload.Sample}List(${payload.Sample}DefaultVO searchVO) throws Exception {
		return ${payload.sample}DAO.select${payload.Sample}List(searchVO);
	}

	/**
	 * 글 총 갯수를 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
	@Override
	public int select${payload.Sample}ListTotCnt(${payload.Sample}DefaultVO searchVO) {
		return ${payload.sample}DAO.select${payload.Sample}ListTotCnt(searchVO);
	}

}
  `;
    return vHtml;
}
module.exports = {
    getCtrl : setctrl
}