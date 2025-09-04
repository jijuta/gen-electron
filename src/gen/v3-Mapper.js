const setctrl = function(payload, self) {
    //let payload = self.payload;
    let tb = payload.items[0];
    let sampleNm = payload.sampleNm;
    let sampleNmFirst = payload.sampleNmFirst;
    let codedirNm = payload.codedir;
    let vHtml = `package ${payload.packagedir}.${payload.codedir}.service.impl;

import java.util.List;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
import ${payload.packagedir}.${payload.codedir}.service.${payload.Sample}DefaultVO;
import ${payload.packagedir}.${payload.codedir}.service.${payload.Sample}VO;

/**
 * sample에 관한 데이터처리 매퍼 클래스
 *
 * @author ${payload.team}
 * @since ${payload.today}
 * @version ${payload.version}
 * @see
 *
 *  Copyright (C) by ${payload.team} All right reserved.
 */
@Mapper("sampleMapper")
public interface ${payload.Sample}Mapper {

    /**
     * 글을 등록한다.
     * @param vo - 등록할 정보가 담긴 ${payload.Sample}VO
     * @return 등록 결과
     * @exception Exception
     */
    void insert${payload.Sample}(${payload.Sample}VO vo) throws Exception;

    /**
     * 글을 수정한다.
     * @param vo - 수정할 정보가 담긴 ${payload.Sample}VO
     * @return void형
     * @exception Exception
     */
    void update${payload.Sample}(${payload.Sample}VO vo) throws Exception;

    /**
     * 글을 삭제한다.
     * @param vo - 삭제할 정보가 담긴 ${payload.Sample}VO
     * @return void형
     * @exception Exception
     */
    void delete${payload.Sample}(${payload.Sample}VO vo) throws Exception;

    /**
     * 글을 조회한다.
     * @param vo - 조회할 정보가 담긴 ${payload.Sample}VO
     * @return 조회한 글
     * @exception Exception
     */
    ${payload.Sample}VO select${payload.Sample}(${payload.Sample}VO vo) throws Exception;

    /**
     * 글 목록을 조회한다.
     * @param searchVO - 조회할 정보가 담긴 VO
     * @return 글 목록
     * @exception Exception
     */
    List<?> select${payload.Sample}List(${payload.Sample}DefaultVO searchVO) throws Exception;

    /**
     * 글 총 갯수를 조회한다.
     * @param searchVO - 조회할 정보가 담긴 VO
     * @return 글 총 갯수
     * @exception
     */
    int select${payload.Sample}ListTotCnt(${payload.Sample}DefaultVO searchVO);

}
  `;
    return vHtml;
}
module.exports = {
    getCtrl : setctrl
}