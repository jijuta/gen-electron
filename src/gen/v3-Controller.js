const setctrl = function(payload, self) {
    //let payload = self.payload;
    let tb = payload.items[0];
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
package ${payload.packagedir}..${payload.codedirNm}.web;

import java.util.List;

import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springmodules.validation.commons.DefaultBeanValidator;

//전자정부 프레임워크
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

import package ${payload.packagedir}.${payload.codedirNm}.service.${payload.Sample}Service;
import package ${payload.packagedir}.${payload.codedirNm}.service.${payload.Sample}DefaultVO;
import package ${payload.packagedir}.${payload.codedirNm}.service.${payload.Sample}VO;

/**
 * @Class Name : ${payload.Sample}Controller.java
 * @Description : ${payload.Sample} Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author ${payload.team}
 * @since ${payload.today}
 * @version ${payload.version}
 * @see
 *
 *  Copyright (C) by ${payload.team} All right reserved.
 */

@Controller
public class ${payload.Sample}Controller {

    /** ${payload.Sample}Service */
    @Resource(name = "${payload.sample}Service")
    private ${payload.Sample}Service ${payload.sample}Service;

    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /** Validator */
    @Resource(name = "beanValidator")
    protected DefaultBeanValidator beanValidator;

    /**
     * ${payload.codedirTitle} 목록을 조회한다. (pageing)
     * @param searchVO - 조회할 정보가 담긴 ${payload.Sample}DefaultVO
     * @param model
     * @return "${payload.Sample}List"
     * @exception Exception
     */
    @RequestMapping(value="/${payload.SampleUrl}/select${payload.SampleUrl}/select${payload.Sample}List.do")
    public String select${payload.Sample}List(@ModelAttribute("searchVO") ${payload.Sample}DefaultVO searchVO, ModelMap model) throws Exception {

        /** EgovPropertyService.${payload.sample} */
        searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
        searchVO.setPageSize(propertiesService.getInt("pageSize"));

        /** pageing setting */
        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
        paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
        paginationInfo.setPageSize(searchVO.getPageSize());

        searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
        searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

        List<?> ${payload.sample}List = ${payload.sample}Service.select${payload.Sample}List(searchVO);
        model.addAttribute("resultList", ${payload.sample}List);

        int totCnt = ${payload.sample}Service.select${payload.Sample}ListTotCnt(searchVO);
        paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);

        return "${payload.packagedirUrl}/${payload.SampleUrl}/${payload.Sample}List";
    }

    /**
     * ${payload.codedirTitle} 등록 화면을 조회한다.
     * @param searchVO - 목록 조회조건 정보가 담긴 VO
     * @param model
     * @return "/${payload.SampleUrl}/${payload.Sample}Regist"
     * @exception Exception
     */
    @RequestMapping(value = "/${payload.SampleUrl}/insert${payload.Sample}View.do", method = RequestMethod.GET)
    public String insert${payload.Sample}View(@ModelAttribute("searchVO") ${payload.Sample}DefaultVO searchVO, Model model) throws Exception {
        model.addAttribute("${payload.sample}VO", new ${payload.Sample}VO());
        return "${payload.packagedirUrl}/${payload.SampleUrl}/${payload.Sample}Regist";
    }

    /**
     * ${payload.codedirTitle}을 등록한다.
     * @param ${payload.sample}VO - 등록할 정보가 담긴 VO
     * @param searchVO - 목록 조회조건 정보가 담긴 VO
     * @param status
     * @return "forward:/${payload.SampleUrl}/select${payload.Sample}List.do"
     * @exception Exception
     */
    @RequestMapping(value = "/${payload.SampleUrl}/insert${payload.Sample}.do", method = RequestMethod.POST)
    public String add${payload.Sample}(@ModelAttribute("searchVO") ${payload.Sample}DefaultVO searchVO, ${payload.Sample}VO ${payload.sample}VO, BindingResult bindingResult, Model model, SessionStatus status)
            throws Exception {

        // Server-Side Validation
        beanValidator.validate(${payload.sample}VO, bindingResult);

        if (bindingResult.hasErrors()) {
            model.addAttribute("${payload.sample}VO", ${payload.sample}VO);
            return "${payload.packagedirUrl}/${payload.SampleUrl}/${payload.Sample}Regist";
        }

        ${payload.sample}Service.insert${payload.Sample}(${payload.sample}VO);
        status.setComplete();
        return "forward:/${payload.SampleUrl}/select${payload.Sample}List.do";
    }

    /**
     * ${payload.codedirTitle} 수정화면을 조회한다.
     * @param id - 수정할 ${payload.codedirTitle} id
     * @param searchVO - 목록 조회조건 정보가 담긴 VO
     * @param model
     * @return "${payload.Sample}Register"
     * @exception Exception
     */
    @RequestMapping("/update${payload.Sample}View.do")
    public String update${payload.Sample}View(@RequestParam("selectedId") String id, @ModelAttribute("searchVO") ${payload.Sample}DefaultVO searchVO, Model model) throws Exception {
        ${payload.Sample}VO ${payload.sample}VO = new ${payload.Sample}VO();
        ${payload.sample}VO.setId(id);
        // 변수명은 CoC 에 따라 ${payload.sample}VO
        model.addAttribute(select${payload.Sample}(${payload.sample}VO, searchVO));
        return "${payload.packagedirUrl}/${payload.SampleUrl}/${payload.Sample}Regist";
    }

    /**
     * ${payload.codedirTitle}을 조회한다.
     * @param ${payload.sample}VO - 조회할 정보가 담긴 VO
     * @param searchVO - 목록 조회조건 정보가 담긴 VO
     * @param status
     * @return @ModelAttribute("${payload.sample}VO") - 조회한 정보
     * @exception Exception
     */
    public ${payload.Sample}VO select${payload.Sample}(${payload.Sample}VO ${payload.sample}VO, @ModelAttribute("searchVO") ${payload.Sample}DefaultVO searchVO) throws Exception {
        return ${payload.sample}Service.select${payload.Sample}(${payload.sample}VO);
    }

    /**
     * ${payload.codedirTitle}을 수정한다.
     * @param ${payload.sample}VO - 수정할 정보가 담긴 VO
     * @param searchVO - 목록 조회조건 정보가 담긴 VO
     * @param status
     * @return "forward:/${payload.SampleUrl}/select${payload.Sample}List.do"
     * @exception Exception
     */
    @RequestMapping("/update${payload.Sample}.do")
    public String update${payload.Sample}(@ModelAttribute("searchVO") ${payload.Sample}DefaultVO searchVO, ${payload.Sample}VO ${payload.sample}VO, BindingResult bindingResult, Model model, SessionStatus status)
            throws Exception {

        beanValidator.validate(${payload.sample}VO, bindingResult);

        if (bindingResult.hasErrors()) {
            model.addAttribute("${payload.sample}VO", ${payload.sample}VO);
            return "${payload.sample}/${payload.Sample}Register";
        }

        ${payload.sample}Service.update${payload.Sample}(${payload.sample}VO);
        status.setComplete();
        return "forward:/${payload.SampleUrl}/select${payload.Sample}List.do";
    }

    /**
     * ${payload.codedirTitle}을 삭제한다.
     * @param ${payload.sample}VO - 삭제할 정보가 담긴 VO
     * @param searchVO - 목록 조회조건 정보가 담긴 VO
     * @param status
     * @return "forward:/${payload.SampleUrl}/select${payload.Sample}List.do"
     * @exception Exception
     */
    @RequestMapping("/delete${payload.Sample}.do")
    public String delete${payload.Sample}(${payload.Sample}VO ${payload.sample}VO, @ModelAttribute("searchVO") ${payload.Sample}DefaultVO searchVO, SessionStatus status) throws Exception {
        ${payload.sample}Service.delete${payload.Sample}(${payload.sample}VO);
        status.setComplete();
        return "forward:/${payload.SampleUrl}/select${payload.Sample}List.do";
    }

}
   
  `;
    return vHtml;
}
module.exports = {
    getCtrl : setctrl
}