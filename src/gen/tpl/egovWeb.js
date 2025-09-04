
const fs = require("fs");
const shell = require("shelljs");
const config = require("../config/config.js");

/**
 * 첫 문자를 대문자로 
 * @param {문자} string 
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * 파일생성
 * @param {디렉토리-자바,메퍼,jsp 등} dir 
 * @param {패키지명 참조} corder 
 * @param {파일명} name 
 * @param {컨텐츠} item 
 */
function fileWrite(dir, corder, name, item) {

    let moduleDir = dir + "/" + corder;

    if (!fs.existsSync(moduleDir)) {
        shell.mkdir("-p", moduleDir);
    }

    fs.writeFile(dir + "/" + corder + '/' + name, item, function (
        err
    ) {
        if (err) throw err;
        console.log(dir + "/" + corder + '/' + name + " Saved! Success");
    });
}

/**
 * 컨트롤러 생성
 * @param {서비스명 아퀴먼트를} payload.Sample 서비스명 아퀴먼트를 
 * @param {Sample 소문자} payload.SampleSm Sample 소문자
 * @param {Sample 대문자} payload.SampleLg Sample 
 * @param {프라이머리 키} payload.SampleSmIdx 프라이머리 키 아퀴먼트를
 * @param {URL} payload.SampleUrl 아귀먼트 where
 * @param {모두} payload.SampleSmIdxUcfirst SampleSmIdx 아퀴먼트를 첫문자 대문자로
 * @param {페키지명} payload.codedir 
 * @param {타이틀} payload.codedirTitle 페키지 타이틀
 * @param {프라이머리키 데이타 형} payload.ControllerDataTypeName 
 */
function Controller(payload) {

    let c = `
package egovframework.com.${payload.codedirDot}.web;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springmodules.validation.commons.DefaultBeanValidator;
import org.springframework.web.servlet.ModelAndView;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.FileVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;

import egovframework.com.${payload.codedirDot}.service.${payload.Sample}Service;
import egovframework.com.${payload.codedirDot}.service.${payload.Sample}VO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@Controller
public class ${payload.Sample}Controller {
    
    @Resource(name = "${payload.Sample}Service")
    private ${payload.Sample}Service ${payload.Sample}Service;

    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    // 첨부파일 관련
    @Resource(name="EgovFileMngService")
    private EgovFileMngService fileMngService;

    @Resource(name="EgovFileMngUtil")
    private EgovFileMngUtil fileUtil;

    /** EgovMessageSource */
    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;

    // Validation 관련
    @Autowired
    private DefaultBeanValidator beanValidator;
    
    /**
     * ${payload.codedirTitle} 목록을 조회한다.
     * @param searchVO
     * @param model
     * @return	"/${payload.SampleUrl}/${payload.Sample}List"
     * @throws Exception
     */
    @IncludedInfo(name="관리",order = 670 ,gid = 50)
    @RequestMapping(value="/${payload.SampleUrl}/select${payload.Sample}List.do")
    public String select${payload.Sample}List(@ModelAttribute("searchVO") ${payload.Sample}VO searchVO, ModelMap model) throws Exception {

        /** EgovPropertyService.SiteList */
        //searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
        //searchVO.setPageSize(propertiesService.getInt("pageSize"));
        if(searchVO.getRecordCountPerPage() != propertiesService.getInt("pageUnit"))
            searchVO.setPageUnit(searchVO.getRecordCountPerPage());
        else
            searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
        
        searchVO.setPageSize(propertiesService.getInt("pageSize"));

        /** pageing */
        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
        paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
        paginationInfo.setPageSize(searchVO.getPageSize());

        searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
        searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

        List<?> ${payload.Sample}List = ${payload.Sample}Service.select${payload.Sample}List(searchVO);
        model.addAttribute("resultList", ${payload.Sample}List);

        int totCnt = ${payload.Sample}Service.select${payload.Sample}ListCnt(searchVO);
        paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);

        return "egovframework/com/${payload.SampleUrl}/${payload.Sample}List";
    }
    
    /**
     * ${payload.codedirTitle} 목록 조회 JSON
     * @param ${payload.Sample}VO
     * @param commandMap
     * @return 출력페이지정보 해당URL
     * @exception Exception
     */
    @RequestMapping(value="/${payload.SampleUrl}/select${payload.Sample}ListAllJson.do",method = RequestMethod.GET)
    public ModelAndView select${payload.Sample}ListAllJson(@RequestParam Map<?, ?> commandMap, 
            @ModelAttribute("${payload.SampleSm}VO") ${payload.Sample}VO ${payload.Sample}VO)  throws Exception {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");    	
        LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
        Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
        
        // 파라미터 및 설정
        String results = "success";
		String msg = "";
        String keyId = "${payload.SampleSm}VO";
        Map<String,Object> body = new HashMap<>();

        if(!isAuthenticated) {	//KISA 보안취약점 조치
			
			//로그인페이지로 이동
			results="error";
			msg="onLoginPage";
        }

        /** EgovPropertyService.SiteList */
        if(${payload.Sample}VO.getRecordCountPerPage() != propertiesService.getInt("pageUnit"))
            ${payload.Sample}VO.setPageUnit(${payload.Sample}VO.getRecordCountPerPage());
        else
            ${payload.Sample}VO.setPageUnit(propertiesService.getInt("pageUnit"));
        
            ${payload.Sample}VO.setPageSize(propertiesService.getInt("pageSize"));

        /** pageing */
        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(${payload.Sample}VO.getPageIndex());
        paginationInfo.setRecordCountPerPage(${payload.Sample}VO.getPageUnit());
        paginationInfo.setPageSize(${payload.Sample}VO.getPageSize());

        ${payload.Sample}VO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        ${payload.Sample}VO.setLastIndex(paginationInfo.getLastRecordIndex());
        ${payload.Sample}VO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

        int totCnt = ${payload.Sample}Service.select${payload.Sample}ListCnt(${payload.Sample}VO);
        paginationInfo.setTotalRecordCount(totCnt);

        List<?> ${payload.Sample}List = ${payload.Sample}Service.select${payload.Sample}ListAll(${payload.Sample}VO);

        if(totCnt>0 && ${payload.Sample}List.size() != 0) {			
        	results="success";
        	msg="";			
			
			body.put("body", ${payload.Sample}List);
			body.put("cnt", totCnt);
			body.put("paginationInfo", paginationInfo);
			
		}else {
			results="error";
			msg="noValue";
			body.put("body", "");
			body.put("cnt", 0);
			body.put("paginationInfo", "");
			
        }
        
        //modelAndView.addObject("resultListJson",${payload.Sample}List);    	
        modelAndView.addObject("results", results);
        modelAndView.addObject("msg", msg);
        modelAndView.addObject("resultList", body);
        modelAndView.addObject("keyId", keyId);
            
        return modelAndView;
    }

    /**
     * ${payload.codedirTitle} 목록에 대한 상세정보를 조회한다.
     * @param ${payload.SampleSm}VO
     * @param searchVO
     * @param model
     * @return	"/${payload.SampleUrl}/${payload.Sample}Detail"
     * @throws Exception
     */
    @RequestMapping("/${payload.SampleUrl}/select${payload.Sample}Detail.do")
    public String	select${payload.Sample}Detail(${payload.Sample}VO ${payload.SampleSm}VO,
            @ModelAttribute("searchVO") ${payload.Sample}VO searchVO,
            ModelMap model) throws Exception {

        try{
            ${payload.Sample}VO vo = ${payload.Sample}Service.select${payload.Sample}Detail(${payload.SampleSm}VO);
            if(vo != null){
                model.addAttribute("result", vo);
            }
        }catch(Exception e){
            model.addAttribute("error", "해당 데이터가 없습니다.");
            e.printStackTrace();
            //throw new RuntimeException(e);
        }

        return	"egovframework/com/${payload.SampleUrl}/${payload.Sample}Detail";
    }
    
    /**
     * ${payload.codedirTitle}를 등록 전 단계처리
     * @param searchVO
     * @param model
     * @return	"/${payload.SampleUrl}/${payload.Sample}Regist"
     * @throws Exception
     */
    @RequestMapping("/${payload.SampleUrl}/insert${payload.Sample}View.do")
    public String insert${payload.Sample}View(@ModelAttribute("searchVO") ${payload.Sample}VO searchVO, Model model) throws Exception {

        model.addAttribute("${payload.SampleSm}VO", new ${payload.Sample}VO());

        return "egovframework/com/${payload.SampleUrl}/${payload.Sample}Regist";

    }
    
    /**
     * ${payload.codedirTitle}를 등록한다.
     * @param multiRequest
     * @param searchVO
     * @param ${payload.SampleSm}VO
     * @param bindingResult
     * @return	"redirect:/${payload.SampleUrl}/select${payload.Sample}List.do"
     * @throws Exception
     */
    @RequestMapping("/${payload.SampleUrl}/insert${payload.Sample}.do")
    public String insert${payload.Sample}(final MultipartHttpServletRequest multiRequest, @ModelAttribute("searchVO") ${payload.Sample}VO searchVO,
            @ModelAttribute("${payload.SampleSm}VO") ${payload.Sample}VO ${payload.SampleSm}VO, BindingResult bindingResult, Model model) throws Exception {

        int totCnt = ${payload.Sample}Service.select${payload.Sample}ListCnt(${payload.SampleSm}VO);
        if(totCnt>0){
            model.addAttribute("error", "이미 등록된 ${payload.codedirTitle}입니다.");
            return "redirect:/${payload.SampleUrl}/insert${payload.Sample}View.do";
        }else{
            // 첨부파일 관련 첨부파일ID 생성
            List<FileVO> _result = null;
            String _atchFileId = "";

            final Map<String, MultipartFile> files = multiRequest.getFileMap();

            if(!files.isEmpty()){
             _result = fileUtil.parseFileInf(files, "${payload.SampleLg}_", 0, "", "");
             _atchFileId = fileMngService.insertFileInfs(_result);  //파일이 생성되고나면 생성된 첨부파일 ID를 리턴한다.
            }

            // 리턴받은 첨부파일ID를 셋팅한다..
            ${payload.SampleSm}VO.setAtchFileId(_atchFileId);			// 첨부파일 ID

            beanValidator.validate(${payload.SampleSm}VO, bindingResult);

            if(bindingResult.hasErrors()){

                return "egovframework/com/${payload.SampleUrl}/${payload.Sample}Regist";

            }

            // 로그인VO에서  사용자 정보 가져오기
            LoginVO	loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

            String	frstRegisterId = loginVO.getUniqId();

            //TODO 아래 부분은 등록 수정자 아이디는 VO 를 참조하여 수정
            //TODO 테이블의 등록 수정자 필드가 상의 할 경우 에러가 발생 함.
            //TODO 가급적이면 테이블의 필드를 수정 하는 것을 권장
            ${payload.SampleSm}VO.setFrstRegisterId(frstRegisterId);		// 최초등록자ID
            ${payload.SampleSm}VO.setLastUpdusrId(frstRegisterId);    	// 최종수정자ID

            ${payload.Sample}Service.insert${payload.Sample}(${payload.SampleSm}VO);

            return "redirect:/${payload.SampleUrl}/select${payload.Sample}List.do";
        }
    }
    
    /**
     * ${payload.codedirTitle}를 수정하기 전 단계처리
     * @param ${payload.SampleSm}Id
     * @param searchVO
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/${payload.SampleUrl}/update${payload.Sample}View.do")
    public String update${payload.Sample}View(@RequestParam("${payload.SampleSm}Id") ${payload.ControllerDataTypeName} ${payload.SampleSmIdx} ,
            @ModelAttribute("searchVO") ${payload.Sample}VO searchVO, ModelMap model)
            throws Exception {


        ${payload.Sample}VO ${payload.SampleSm}VO = new ${payload.Sample}VO();

        // Primary Key 값 세팅
        ${payload.SampleSm}VO.set${payload.SampleSmIdxUcfirst}(${payload.SampleSmIdx});
        try{
            ${payload.Sample}VO vo = ${payload.Sample}Service.select${payload.Sample}Detail(${payload.SampleSm}VO);
            if(vo != null){
                model.addAttribute("${payload.Sample}VO", ${payload.Sample}Service.select${payload.Sample}Detail(${payload.SampleSm}VO));
            }
            
        }catch(Exception e){
            model.addAttribute("error", "해당 데이터가 없습니다.");
            e.printStackTrace();
            //throw new RuntimeException(e);
        }

        return "egovframework/com/${payload.SampleUrl}/${payload.Sample}Updt";
    }
    
    /**
     * ${payload.codedirTitle}를 수정 처리한다
     * @param atchFileAt
     * @param multiRequest
     * @param searchVO
     * @param ${payload.SampleSm}VO
     * @param bindingResult
     * @param model
     * @return	"redirect:/${payload.SampleUrl}/${payload.Sample}InfoListInqire.do"
     * @throws Exception
     */
    @RequestMapping("/${payload.SampleUrl}/update${payload.Sample}.do")
    public String update${payload.Sample}Info(final MultipartHttpServletRequest multiRequest, @ModelAttribute("searchVO") ${payload.Sample}VO searchVO,
            @ModelAttribute("${payload.SampleSm}VO") ${payload.Sample}VO ${payload.SampleSm}VO, BindingResult bindingResult, ModelMap model) throws Exception {

        // Validation
        //beanValidator.validate(${payload.SampleSm}VO, bindingResult);
        //if(bindingResult.hasErrors()){
        //	return "egovframework/com/uss/olh/nws/${payload.Sample}InfoUpdt";
        //}


        // 첨부파일 관련 ID 생성 start....
        String _atchFileId = ${payload.SampleSm}VO.getAtchFileId();

        final Map<String, MultipartFile> files = multiRequest.getFileMap();
        if(!files.isEmpty()){
            if("".equals(_atchFileId)){
                List<FileVO> _result = fileUtil.parseFileInf(files, "${payload.SampleLg}_", 0, _atchFileId, "");
                _atchFileId = fileMngService.insertFileInfs(_result);
                ${payload.SampleSm}VO.setAtchFileId(_atchFileId);    	// 첨부파일 ID

            }else{
                FileVO fvo = new FileVO();
                fvo.setAtchFileId(_atchFileId);
                int _cnt = fileMngService.getMaxFileSN(fvo);
                List<FileVO> _result = fileUtil.parseFileInf(files, "${payload.SampleLg}_", _cnt, _atchFileId, "");
                fileMngService.updateFileInfs(_result);
            }
        }
        // 첨부파일 관련 ID 생성 end...


        // 로그인VO에서  사용자 정보 가져오기
        LoginVO	loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

        String lastUpdusrId = loginVO.getId();

        // 아래 부분은 등록 수정자 아이디는 VO 를 참조하여 수정
        // 테이블의 등록 수정자 필드가 상의 할 경우 에러가 발생 함.
        // 가급적이면 테이블의 필드를 수정 하는 것을 권장
        ${payload.SampleSm}VO.setLastUpdusrId(lastUpdusrId);    	// 최종수정자ID

        ${payload.Sample}Service.update${payload.Sample}(${payload.SampleSm}VO);

        return "redirect:/${payload.SampleUrl}/select${payload.Sample}List.do";

    }
    
    /**
     * ${payload.codedirTitle}를 삭제한다.
     * @param ${payload.SampleSm}VO
     * @param searchVO
     * @return
     * @throws Exception
     */
    @RequestMapping("/${payload.SampleUrl}/delete${payload.Sample}.do")
    public String delete${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO, @ModelAttribute("searchVO") ${payload.Sample}VO searchVO) throws Exception {

        ${payload.Sample}Service.delete${payload.Sample}(${payload.SampleSm}VO);

        return "redirect:/${payload.SampleUrl}/select${payload.Sample}List.do";
    }
    
}
`
    //fileWrite(config.dir_java, codedir + '/web', Sample + 'Controller.java', c);
    return c;
}

/**
 * Dao 생성
 * @param {타이틀} payload.codedirTitle 
 * @param {프라이머리 키} payload.SampleSmIdx 
 * @param {프라이머리키 데이타 형} payload.ControllerDataTypeName 
 * @param {역습을 하는} payload.Sample 
 * @param {페키지명} payload.codedir , java/src/main/ 
 */
function Dao(payload) {

    let c = `
package egovframework.com.${payload.codedirDot}.service.impl;

import java.util.List;
import org.springframework.stereotype.Repository;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.com.${payload.codedirDot}.service.${payload.Sample}VO;

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

}
`

    return c;
}

/**
 * 서비스 생성
 * @param {타이틀} payload.codedirTitle 
 * @param {프라이머리 키} payload.SampleSmIdx 
 * @param {프라이머리키 데이타 형} payload.ControllerDataTypeName 
 * @param {역습을 하는} payload.Sample
 * @param {테이블명} payload.table_name
 * @param {프라이머리키} payload.PriKeyNm 
 * @param {페키지명} payload.codedir , java/src/main/ 
 */
function Service(payload) {

    let c = `
package egovframework.com.${payload.codedirDot}.service;
import java.util.List;

import egovframework.rte.fdl.cmmn.exception.FdlException;

public interface ${payload.Sample}Service {

    List<?> select${payload.Sample}List(${payload.Sample}VO searchVO);

	List<?> select${payload.Sample}ListAll(${payload.Sample}VO searchVO);

    int select${payload.Sample}ListCnt(${payload.Sample}VO searchVO);

    void insert${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO) throws FdlException;

    ${payload.Sample}VO select${payload.Sample}Detail(${payload.Sample}VO ${payload.SampleSm}VO) throws Exception;

    void update${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO);

    void delete${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO);

}
    
`
    return c;
}

/**
 * VO 생성
 * @param {타이틀} payload.codedirTitle
 * @param {프라이머리 키 값} payload.ControllerDataTypeName
 * @param {변수} payload.SampleVoPrivate 
 * @param {게터세터} payload.SampleVoPublic 
 * @param {서비스명} payload.Sample
 * @param {테이블명} payload.table_name
 * @param {프라이머리키} payload.PriKeyNm 
 * @param {폐키지명} payload.codedir 
 */
function Vo(payload) {

    let c = `
package egovframework.com.${payload.codedirDot}.service;
import egovframework.com.${payload.codedirDot}.service.impl.${payload.Sample}DefaultVO;
/**
 *  
 * ${payload.codedirTitle}를 처리하는 VO 클래스
 * @author auto
 * @since 2018.11.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2019.11.02  자동화          최초 생성
 *
 * </pre>
 */
public class ${payload.Sample}VO extends ${payload.Sample}DefaultVO {
    
    private static final long serialVersionUID = 1L;
    private String atchFileId;

    ${payload.SampleVoPrivate}

    ${payload.SampleVoPublic}

    /**
     * @return the atchFileId
     */
    public String getAtchFileId() {
        return atchFileId;
    }

    /**
     * @param atchFileId the atchFileId to set
     */
    public void setAtchFileId(String atchFileId) {
        this.atchFileId = atchFileId;
    }

    
}
`
    //fileWrite(config.dir_java, codedir + '/service/', Sample + 'VO.java', c);
    return c;
}

/**
 * DefaultVO  생성
 * @param {페키지명} payload.codedir 
 * @param {프라이머리 키} payload.SampleSmIdx
 * @param {프라이머리 키 값} payload.ControllerDataTypeName
 * @param {타이틀} payload.codedirTitle 
 * @param {서비스명} payload.Sample
 * @param {테이블명} payload.table_name 
 * @param {프라이머리키} payload.PriKeyNm 
 */
function DefaultVO(payload) {

    let c = `
package egovframework.com.${payload.codedir}.service.impl;
import java.io.Serializable;

/**
 *
 * ${payload.codedirTitle}를 처리하는 DefaultVO 클래스
 * @author Auto
 * @since 2018.10.31
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2018.10.31  오토          최초 생성
 *
 * </pre>
 */
public class ${payload.Sample}DefaultVO implements Serializable {

    private static final long serialVersionUID = -6388824544053968776L;

    /** 검색조건 */
    private String searchCnd = "";

    /** 검색Keyword */
    private String searchKeyword = "";

    /** 검색사용여부 */
    private String searchUseYn = "";

    /** 현재페이지 */
    private int pageIndex = 1;

    /** 페이지갯수 */
    private int pageUnit = 10;

    /** 페이지사이즈 */
    private int pageSize = 10;

    /** firstIndex */
    private int firstIndex = 1;

    /** lastIndex */
    private int lastIndex = 1;

    /** recordCountPerPage */
    private int recordCountPerPage = 10;

    /**
     * searchCnd attribute 를 리턴한다.
     * @return the String
     */
    public String getSearchCnd() {
        return searchCnd;
    }

    /**
     * searchCnd attribute 값을 설정한다.
     * @return searchCondition String
     */
    public void setSearchCnd(String searchCnd) {
        this.searchCnd = searchCnd;
    }

    /**
     * searchKeyword attribute 를 리턴한다.
     * @return the String
     */
    public String getSearchKeyword() {
        return searchKeyword;
    }

    /**
     * searchKeyword attribute 값을 설정한다.
     * @return searchKeyword String
     */
    public void setSearchKeyword(String searchKeyword) {
        this.searchKeyword = searchKeyword;
    }

    /**
     * searchUseYn attribute 를 리턴한다.
     * @return the String
     */
    public String getSearchUseYn() {
        return searchUseYn;
    }

    /**
     * searchUseYn attribute 값을 설정한다.
     * @return searchUseYn String
     */
    public void setSearchUseYn(String searchUseYn) {
        this.searchUseYn = searchUseYn;
    }

    /**
     * pageIndex attribute 를 리턴한다.
     * @return the int
     */
    public int getPageIndex() {
        return pageIndex;
    }

    /**
     * pageIndex attribute 값을 설정한다.
     * @return pageIndex int
     */
    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    /**
     * pageUnit attribute 를 리턴한다.
     * @return the int
     */
    public int getPageUnit() {
        return pageUnit;
    }

    /**
     * pageUnit attribute 값을 설정한다.
     * @return pageUnit int
     */
    public void setPageUnit(int pageUnit) {
        this.pageUnit = pageUnit;
    }

    /**
     * pageSize attribute 를 리턴한다.
     * @return the int
     */
    public int getPageSize() {
        return pageSize;
    }

    /**
     * pageSize attribute 값을 설정한다.
     * @return pageSize int
     */
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    /**
     * firstIndex attribute 를 리턴한다.
     * @return the int
     */
    public int getFirstIndex() {
        return firstIndex;
    }

    /**
     * firstIndex attribute 값을 설정한다.
     * @return firstIndex int
     */
    public void setFirstIndex(int firstIndex) {
        this.firstIndex = firstIndex;
    }

    /**
     * lastIndex attribute 를 리턴한다.
     * @return the int
     */
    public int getLastIndex() {
        return lastIndex;
    }

    /**
     * lastIndex attribute 값을 설정한다.
     * @return lastIndex int
     */
    public void setLastIndex(int lastIndex) {
        this.lastIndex = lastIndex;
    }

    /**
     * recordCountPerPage attribute 를 리턴한다.
     * @return the int
     */
    public int getRecordCountPerPage() {
        return recordCountPerPage;
    }

    /**
     * recordCountPerPage attribute 값을 설정한다.
     * @return recordCountPerPage int
     */
    public void setRecordCountPerPage(int recordCountPerPage) {
        this.recordCountPerPage = recordCountPerPage;
    }
}
`
    //fileWrite(config.dir_java, codedir + '/service/impl', Sample + 'DefaultVO.java', c);
    return c;
}

/**
 * ServiceImpl  생성
 * @param {타이틀} payload.codedirTitle 
 * @param {프라이머리 키} payload.SampleSmIdx 
 * @param {프라이머리 키 값} payload.ControllerDataTypeName 
 * @param {서비스명} payload.Sample 
 * @param {페키지명} payload.codedir
 * @param {테이블명} payload.table_name 
 * @param {프라이머리키} payload.PriKeyNm 
 */
function ServiceImpl(payload) {

    let c = `
package egovframework.com.${payload.codedirDot}.service.impl;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.com.${payload.codedirDot}.service.${payload.Sample}Service;
import egovframework.com.${payload.codedirDot}.service.${payload.Sample}VO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.cmmn.exception.FdlException;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

@Service("${payload.Sample}Service")
public class ${payload.Sample}ServiceImpl extends EgovAbstractServiceImpl implements ${payload.Sample}Service {

    @Resource(name="${payload.Sample}DAO")
    private ${payload.Sample}DAO ${payload.Sample}Dao;

    
    @Override
    public List<?> select${payload.Sample}List(${payload.Sample}VO searchVO) {
        return ${payload.Sample}Dao.select${payload.Sample}List(searchVO);
    }

    @Override
    public List<?> select${payload.Sample}ListAll(${payload.Sample}VO searchVO) {
        return ${payload.Sample}Dao.select${payload.Sample}ListAll(searchVO);
    }

    @Override
    public int select${payload.Sample}ListCnt(${payload.Sample}VO searchVO) {
        return ${payload.Sample}Dao.select${payload.Sample}ListCnt(searchVO);
    }

    @Override
    public void insert${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO) throws FdlException {
        ${payload.Sample}Dao.insert${payload.Sample}(${payload.SampleSm}VO);
    }

    @Override
    public ${payload.Sample}VO select${payload.Sample}Detail(${payload.Sample}VO ${payload.SampleSm}VO) throws Exception {
        ${payload.Sample}VO resultVO = ${payload.Sample}Dao.select${payload.Sample}Detail(${payload.SampleSm}VO);
        if (resultVO == null)
            throw processException("info.nodata.msg");
        return resultVO;
    }

    @Override
    public void update${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO) {
        ${payload.Sample}Dao.update${payload.Sample}(${payload.SampleSm}VO);
    }

    @Override
    public void delete${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO) {
        ${payload.Sample}Dao.delete${payload.Sample}(${payload.SampleSm}VO);
    }

}
    
`
    //fileWrite(config.dir_java, codedir + '/service/impl', Sample + 'ServiceImpl.java', c);
    return c;
}

/**
 * Mapper 생성
 * @param {타이틀} payload.codedirTitle 
 * @param {프라이머리 키} payload.SampleSmIdx 
 * @param {프라이머리키 데이타 형} payload.ControllerDataTypeName 
 * @param {서비스명} payload.Sample 
 * @param {페키지명} payload.codedir 
 * @param {테이블명} payload.table_name 
 * @param {프라이머리 키 디비필드명} payload.PriKeyNm 
 * @param {셀렉트} payload.selected 
 * @param {셀렉트조건} payload.searchConditionMapper 
 * @param {인서트문} payload.inserted 
 * @param {업데이트문} payload.updated 
 */
function Mapper(payload) {


    let c = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="${payload.Sample}Manage">

    <resultMap id="${payload.Sample}Manage" type="egovframework.com.${payload.codedir}.service.${payload.Sample}VO">
        ${payload.resultMap}		
    </resultMap>
    
    <select id="select${payload.Sample}Detail" resultMap="${payload.Sample}Manage">
                
            SELECT 
                ${payload.selected}
            FROM
                ${payload.ViewName}
            WHERE
                ${payload.PriKeyNm}=#{${payload.SampleSmIdx}}
                AND USE_AT = 'Y'
    </select>
    
    <select id="select${payload.Sample}List" parameterType="egovframework.com.${payload.codedir}.service.${payload.Sample}VO" resultMap="${payload.Sample}Manage">
        SELECT  * 
        FROM  (
        SELECT ROWNUM RNUM, ALL_LIST.* FROM  (
            SELECT
                ${payload.selected}

            FROM
                ${payload.ViewName}                               			
            WHERE 1=1
                AND USE_AT = 'Y'
                <choose>
                    <when test="searchCnd != ''">
                    ${payload.searchConditionMapper}
                    </when>    
                    <otherwise>
                    </otherwise>  
                </choose>
            ORDER BY 1	
            <![CDATA[
                ) ALL_LIST
                )
         WHERE  RNUM  > #{firstIndex}
           AND  RNUM <= #{firstIndex} + #{recordCountPerPage}
          ]]>            
    </select>

    <select id="select${payload.Sample}ListAll" parameterType="egovframework.com.${payload.codedir}.service.${payload.Sample}VO" resultMap="${payload.Sample}Manage">
    <![CDATA[
            SELECT
                    ${payload.selected}
            FROM	
                    ${payload.ViewName}                               			
            WHERE	1=1   		
            AND COALESCE(USE_AT,'Y') <> 'N'
            ORDER	BY 1	
        ]]>
    </select>
    
    <select id="select${payload.Sample}ListCnt" parameterType="egovframework.com.${payload.codedir}.service.${payload.Sample}VO" resultType="int">
    <![CDATA[
            SELECT 	COUNT(*) totcnt
            FROM 	${payload.ViewName}
            WHERE 	1=1
            AND COALESCE(USE_AT,'Y') <> 'N'
        ]]>
        <choose>
            <when test="searchCnd != ''">
            ${payload.searchConditionMapper}
            </when>    
            <otherwise>
            </otherwise>  
        </choose>
    </select>
    
    <insert id="insert${payload.Sample}">	
            
            INSERT INTO ${payload.table_name}(
                    ${payload.selected}

            ) 
            VALUES (
                    ${payload.inserted}

            )
        
    </insert>

    <update id="update${payload.Sample}">
        
            UPDATE ${payload.table_name} SET
                ${payload.updated}
            WHERE 
                ${payload.PriKeyNm}=#{${payload.SampleSmIdx}}
        
    </update>
    
    <delete id="delete${payload.Sample}">
        
            UPDATE	${payload.table_name}	SET
            USE_AT = 'N'
             WHERE  ${payload.PriKeyNm}=#{${payload.SampleSmIdx}}
        
    </delete>
    
</mapper>
`
    //fileWrite(config.dir_mapper, codedir, Sample + '_SQL_oracle.xml', c);
    //fileWrite(config.dir_mapper, codedir, Sample + '_SQL_tibero.xml', c);
    return c;
}

function Views(payload) {
    let c = `
<template>
  <div class="${payload.SampleSm}">
    <${payload.SampleSm}Component ref="${payload.SampleSm}" msg="공지사항" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ${payload.SampleSm}Component from '@/components/${payload.SampleSm}Component.vue' // @ is an alias to /src

@Component({
  components: {
    ${payload.SampleSm}Component
  }
})
export default class ${payload.SampleSm} extends Vue {}
</script>

<style lang="less" scoped>

</style>
  
  `
    return c;
}


/**
 * 
 * @param {*} payload.codedirTitle 
 * @param {*} payload.SampleSmIdx 
 * @param {*} payload.ControllerDataTypeName 
 * @param {*} payload.Sample 
 * @param {*} payload.codedir 
 * @param {*} payload.SampleVoPrivate 
 * @param {*} payload.SampleVoPublic 
 * @param {*} payload.table_name 
 * @param {*} payload.PriKeyNm 
 * @param {*} payload.selected 
 * @param {*} payload.searchConditionMapper 
 * @param {*} payload.inserted 
 * @param {*} payload.updated 
 * @param {*} payload.resultMap 
 */
function mainCreate(payload) {

    let c = Controller(payload);
    let d = Dao(payload);
    let s = Service(payload);
    let v = Vo(payload);
    let f = DefaultVO(payload);
    let i = ServiceImpl(payload);
    let m = Mapper(payload);
    let views = Views(payload);

    fileWrite(config.dir_java, payload.codedir + '/web', payload.Sample + 'Controller.java', c);
    fileWrite(config.dir_java, payload.codedir + '/service/impl', payload.Sample + 'DAO.java', d);
    fileWrite(config.dir_java, payload.codedir + '/service/', payload.Sample + 'Service.java', s);
    fileWrite(config.dir_java, payload.codedir + '/service/', payload.Sample + 'VO.java', v);
    fileWrite(config.dir_java, payload.codedir + '/service/impl', payload.Sample + 'DefaultVO.java', f);
    fileWrite(config.dir_java, payload.codedir + '/service/impl', payload.Sample + 'ServiceImpl.java', i);
    fileWrite(config.dir_mapper, payload.codedir, payload.Sample + '_SQL_oracle.xml', m);
    fileWrite(config.dir_mapper, payload.codedir, payload.Sample + '_SQL_tibero.xml', m);

    fileWrite(config.dir_front, 'src/views/' + payload.SampleSm, payload.SampleSm + '.vue', views);
}

let getMatadata = function (tableInfo) {
    fileWrite("./matadata", tableInfo.codedir, tableInfo.Sample + '.json', JSON.stringify(tableInfo));
}

let getAllLoag = function (payload) {
    console.log("### tablename ", genData.tablename);
    console.log("### codedirTitle ", genData.codedirTitle)
    console.log("### SampleSmIdx ", genData.SampleSmIdx)
    console.log("### ControllerDataTypeName ", genData.ControllerDataTypeName)
    console.log("### Sample ", genData.Sample)
    console.log("### codedir ", genData.codedir)
    //console.log("### SampleVoPrivate ", SampleVoPrivate);
    //console.log("### SampleVoPublic ", SampleVoPublic);
    console.log("### PriKeyNm ", genData.PriKeyNm)
    //console.log("### selected ", selected)
    //console.log("### searchConditionMapper ", searchConditionMapper)
    //console.log("### inserted ", inserted)
    //console.log("### updated ", updated)
    //console.log("### resultMap ", resultMap)
}

module.exports = {
    mainCreate: mainCreate,
    Controller: Controller,
    Dao: Dao,
    Service: Service,
    Vo: Vo,
    DefaultVO: DefaultVO,
    ServiceImpl: ServiceImpl,
    Mapper: Mapper,
    fileWrite: fileWrite,
    getMatadata: getMatadata,
    getAllLoag: getAllLoag,
    views: Views
};
