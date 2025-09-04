const setctrl = function(payload, self) {
    //let payload = self.payload;
    let tb = payload.items[0];
    let sampleNm = payload.sampleNm;
    let sampleNmFirst = payload.sampleNmFirst;
    let codedirNm = payload.codedir;
    let vHtml = `/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package ${payload.packagedir}.${payload.codedir}.service.impl;

import java.util.List;

import ${payload.packagedir}.${payload.codedir}.service.${payload.Sample}DefaultVO;
import ${payload.packagedir}.${payload.codedir}.service.${payload.Sample}VO;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;

import org.springframework.stereotype.Repository;

/**
 * @Class Name : ${payload.Sample}DAO.java
 * @Description : ${payload.Sample} DAO Class
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

@Repository("${payload.sample}DAO")
public class ${payload.Sample}DAO extends EgovAbstractDAO {

    /**
     * 글을 등록한다.
     * @param vo - 등록할 정보가 담긴 ${payload.Sample}VO
     * @return 등록 결과
     * @exception Exception
     */
    public String insert${payload.Sample}(${payload.Sample}VO vo) throws Exception {
        return (String) insert("${payload.sample}DAO.insert${payload.Sample}", vo);
    }

    /**
     * 글을 수정한다.
     * @param vo - 수정할 정보가 담긴 ${payload.Sample}VO
     * @return void형
     * @exception Exception
     */
    public void update${payload.Sample}(${payload.Sample}VO vo) throws Exception {
        update("${payload.sample}DAO.update${payload.Sample}", vo);
    }

    /**
     * 글을 삭제한다.
     * @param vo - 삭제할 정보가 담긴 ${payload.Sample}VO
     * @return void형
     * @exception Exception
     */
    public void delete${payload.Sample}(${payload.Sample}VO vo) throws Exception {
        delete("${payload.sample}DAO.delete${payload.Sample}", vo);
    }

    /**
     * 글을 조회한다.
     * @param vo - 조회할 정보가 담긴 ${payload.Sample}VO
     * @return 조회한 글
     * @exception Exception
     */
    public ${payload.Sample}VO select${payload.Sample}(${payload.Sample}VO vo) throws Exception {
        return (${payload.Sample}VO) select("${payload.sample}DAO.select${payload.Sample}", vo);
    }

    /**
     * 글 목록을 조회한다.
     * @param searchMap - 조회할 정보가 담긴 Map
     * @return 글 목록
     * @exception Exception
     */
    public List<?> select${payload.Sample}List(${payload.Sample}DefaultVO searchVO) throws Exception {
        return list("${payload.sample}DAO.select${payload.Sample}List", searchVO);
    }

    /**
     * 글 총 갯수를 조회한다.
     * @param searchMap - 조회할 정보가 담긴 Map
     * @return 글 총 갯수
     * @exception
     */
    public int select${payload.Sample}ListTotCnt(${payload.Sample}DefaultVO searchVO) {
        return (Integer) select("${payload.sample}DAO.select${payload.Sample}ListTotCnt", searchVO);
    }

}
   
  `;
    return vHtml;
}
module.exports = {
    getCtrl : setctrl
}