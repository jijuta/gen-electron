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
package  ${payload.packagedir}.${codedirNm}.service;
import  egovframework.com.cmm.CommDefaultVO;
/**
 * @Class Name : ${payload.Sample}VO.java
 * @Description : ${payload.Sample}VO Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ ${payload.today}          최초생성
 *
 * @author ${payload.team}
 * @since ${payload.today}
 * @version ${payload.version}
 * @see
 *
 *  Copyright (C) by ${payload.team} All right reserved.
 */
public class ${payload.Sample}VO extends ${payload.Sample}DefaultVO {

    private static final long serialVersionUID = 1L;

    ${payload.SampleVoPrivate}

    ${payload.SampleVoPublic}

    //추가 VO
    /**
     * @return the atchFileId
     */
    private String atchFileId;
    public String getAtchFileId() {
        return atchFileId;
    }

    /**
     * @param atchFileId the atchFileId to set
     */
    public void setAtchFileId(String atchFileId) {
        this.atchFileId = atchFileId;
    }

    ${payload.SampleAddVO}

}
   
  `;
    return vHtml;
}
module.exports = {
    getCtrl : setctrl
}