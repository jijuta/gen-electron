const setctrl= function(payload, self) {
    //let payload = self.payload;
  let tb = payload.items[0];
  // console.log(payload);
  let vHtml = `
package ${payload.packagedir}.${payload.codedir}.web;
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

import com.google.gson.Gson;

import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.${payload.loginVo};
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.FileVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;

import ${payload.packagedir}.${payload.codedir}.service.${payload.Sample}Service;
import ${payload.packagedir}.${payload.codedir}.service.${payload.Sample}VO;
import egovframework.com.uss.umt.service.EgovEntrprsManageService;
import egovframework.com.uss.umt.service.EgovMberManageService;
import egovframework.com.uss.umt.service.UserDefaultVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@Controller
@RequestMapping(value="/${payload.SampleUrl}/*")
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

    /** mberManageService */
    @Resource(name = "mberManageService")
    private EgovMberManageService mberManageService;

    /** entrprsManageService */
    @Resource(name = "entrprsManageService")
    private EgovEntrprsManageService entrprsManageService;

    /**
     * ${payload.codedirTitle} 목록을 조회한다.
     * @param searchVO
     * @param model
     * @return	"/${payload.SampleUrl}/${payload.Sample}List"
     * @throws Exception
     */
    @RequestMapping(value="/select${payload.Sample}List.do")
    public String select${payload.Sample}List(@ModelAttribute("userSearchVO") UserDefaultVO userSearchVO, @ModelAttribute("searchVO") ${payload.Sample}VO searchVO, ModelMap model) throws Exception {
        model.addAttribute("userSearchVO", userSearchVO);
        return "${payload.packagedirUrl}/${payload.SampleUrl}/${payload.Sample}List";
    }

    /**
     * ${payload.codedirTitle} JS version. 목록을 조회한다.
     * @param searchVO
     * @param model
     * @return	"/${payload.SampleUrl}/${payload.Sample}List2"
     * @throws Exception
     */
    @RequestMapping(value="/select${payload.Sample}List2.do")
    public String select${payload.Sample}List2(@ModelAttribute("userSearchVO") UserDefaultVO userSearchVO, @ModelAttribute("searchVO") ${payload.Sample}VO searchVO, ModelMap model) throws Exception {
        model.addAttribute("userSearchVO", userSearchVO);
        return "${payload.packagedirUrl}/${payload.SampleUrl}/${payload.Sample}List2";
    }

    // ag-grid 버전 추가
    /**
     * ${payload.codedirTitle} AG-Grid Version 목록을 조회한다.
     * @param searchVO
     * @param model
     * @return	"/${payload.SampleUrl}/${payload.Sample}AgGrid"
     * @throws Exception
     */
    @RequestMapping(value="/select${payload.Sample}AgGrid.do")
    public String select${payload.Sample}AgGrid(@ModelAttribute("userSearchVO") UserDefaultVO userSearchVO, @ModelAttribute("searchVO") ${payload.Sample}VO searchVO, ModelMap model) throws Exception {
        model.addAttribute("userSearchVO", userSearchVO);
        return "${payload.packagedirUrl}/${payload.SampleUrl}/${payload.Sample}AgGrid";
    }
    
    
    /**
     * ${payload.codedirTitle} 목록 조회 JSON
     * @param ${payload.Sample}VO
     * @param commandMap
     * @return modelAndView
     * @exception Exception
     */
    @SuppressWarnings("unchecked")
    @RequestMapping("/select${payload.Sample}ListJson")
    public ModelAndView select${payload.Sample}ListJson(@ModelAttribute("userSearchVO") UserDefaultVO userSearchVO, @RequestParam Map<?, ?> commandMap, 
        @ModelAttribute("searchVO") ${payload.Sample}VO searchVO)  throws Exception {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");    	

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
        
        try {
          if(commandMap.get("orderbylist2") != null) {
            Gson gson = new Gson();
            searchVO.setOrderbylist(gson.fromJson(commandMap.get("orderbylist2").toString(), List.class));
          }
          List<?> ${payload.Sample}List = ${payload.Sample}Service.select${payload.Sample}List(searchVO);
          modelAndView.addObject("resultList", ${payload.Sample}List);

          int totCnt = ${payload.Sample}Service.select${payload.Sample}ListCnt(searchVO);
          paginationInfo.setTotalRecordCount(totCnt);
          modelAndView.addObject("paginationInfo", paginationInfo);
        } catch (Exception e) {
          e.printStackTrace();
        }
        
      
        return modelAndView;
    }

    /**
     * ${payload.codedirTitle} 목록에 대한 상세정보를 조회한다.
     * @param ${payload.SampleSm}VO
     * @param searchVO
     * @param model
     * @return	modelAndView
     * @throws Exception
     */
    @RequestMapping("/select${payload.Sample}Detail.do")
    public ModelAndView	select${payload.Sample}Detail(${payload.Sample}VO ${payload.SampleSm}VO,
            @ModelAttribute("${payload.SampleSm}VO") ${payload.Sample}VO ${payload.Sample}VO) throws Exception {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");    

        try{
          ${payload.Sample}VO vo = ${payload.Sample}Service.select${payload.Sample}Detail(${payload.SampleSm}VO);
          if(vo != null){
            modelAndView.addObject("result", vo);
          }
        }catch(Exception e){
          modelAndView.addObject("error", "해당 데이터가 없습니다.");
            e.printStackTrace();
            //throw new RuntimeException(e);
        }

        return	modelAndView;
    }
      
    /**
     * ${payload.codedirTitle}를 등록 전 단계처리
     * @param searchVO
     * @param model
     * @return	"/${payload.SampleUrl}/${payload.Sample}Regist"
     * @throws Exception
     */
    @RequestMapping("/insert${payload.Sample}View.do")
    public String insert${payload.Sample}View(@ModelAttribute("searchVO") ${payload.Sample}VO searchVO, Model model) throws Exception {

        model.addAttribute("${payload.SampleSm}VO", new ${payload.Sample}VO());

        return "${payload.packagedirUrl}/${payload.SampleUrl}/${payload.Sample}Regist";
    }

    /**
     * ${payload.codedirTitle}를 등록한다.
     * @param multiRequest
     * @param searchVO
     * @param ${payload.SampleSm}VO
     * @param bindingResult
     * @return	modelAndView
     * @throws Exception
     */
    @RequestMapping("/insert${payload.Sample}.do")
    public ModelAndView insert${payload.Sample}(@ModelAttribute("searchVO") ${payload.Sample}VO searchVO,
            @ModelAttribute("${payload.SampleSm}VO") ${payload.Sample}VO ${payload.SampleSm}VO, BindingResult bindingResult) throws Exception {
    
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");    
        int totCnt = ${payload.Sample}Service.select${payload.Sample}ListCnt(${payload.SampleSm}VO);

        if(totCnt>0){
          modelAndView.addObject("error", "이미 등록된 ${payload.codedirTitle}입니다.");
          
        }else{
          
          beanValidator.validate(${payload.SampleSm}VO, bindingResult);

          if(bindingResult.hasErrors()){
            modelAndView.addObject("error", "validation  오류입니다.");
            return modelAndView;

          }
          
          try{
            //TODO 아래 부분은 등록 수정자 아이디는 VO 를 참조하여 수정
            //TODO 테이블의 등록 수정자 필드가 상의 할 경우 에러가 발생 함.
            //TODO 가급적이면 테이블의 필드를 수정 하는 것을 권장
            // 로그인VO에서  사용자 정보 가져오기
            //LoginVO	loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
            //String	frstRegisterId = loginVO.getUniqId();
            //${payload.SampleSm}VO.${payload.reguserfd}(loginVO.getId());		// 최초등록자ID
            //${payload.SampleSm}VO.${payload.edituserfd}(loginVO.getId());    	// 최종수정자ID
            ${payload.loginVoHtml}
            ${payload.reguserfdHrml}
            ${payload.edituserfdHtml}

            ${payload.Sample}Service.insert${payload.Sample}(${payload.SampleSm}VO);
            modelAndView.addObject("success", "등록 되었습니다.");
          }catch(Exception e){
            modelAndView.addObject("error", "등록 오류입니다.");
            e.printStackTrace();
            //throw new RuntimeException(e);
          }
        
        }
        return modelAndView;
    }
    
    /**
     * ${payload.codedirTitle}를 등록한다.(첨부파일)
     * @param multiRequest
     * @param searchVO
     * @param ${payload.SampleSm}VO
     * @param bindingResult
     * @return	modelAndView
     * @throws Exception
     */
    @RequestMapping("/insert${payload.Sample}File.do")
    public ModelAndView insert${payload.Sample}File(final MultipartHttpServletRequest multiRequest, @ModelAttribute("searchVO") ${payload.Sample}VO searchVO,
            @ModelAttribute("${payload.SampleSm}VO") ${payload.Sample}VO ${payload.SampleSm}VO, BindingResult bindingResult) throws Exception {
    
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");    

        int totCnt = ${payload.Sample}Service.select${payload.Sample}ListCnt(${payload.SampleSm}VO);

        if(totCnt>0){
          modelAndView.addObject("error", "이미 등록된 ${payload.codedirTitle}입니다.");
          
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
            modelAndView.addObject("error", "validation  오류입니다.");
            return modelAndView;

          }
          
          try{
            // 로그인VO에서  사용자 정보 가져오기
            //LoginVO	loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
            //String	frstRegisterId = loginVO.getUniqId();
            //TODO 아래 부분은 등록 수정자 아이디는 VO 를 참조하여 수정
            //TODO 테이블의 등록 수정자 필드가 상의 할 경우 에러가 발생 함.
            //TODO 가급적이면 테이블의 필드를 수정 하는 것을 권장
            //${payload.SampleSm}VO.${payload.reguserfd}(loginVO.getId());		// 최초등록자ID
            //${payload.SampleSm}VO.${payload.edituserfd}(loginVO.getId());    	// 최종수정자ID
            //${payload.Sample}Service.insert${payload.Sample}(${payload.SampleSm}VO);
            ${payload.loginVoHtml}
            ${payload.reguserfdHrml}
            ${payload.edituserfdHtml}
            modelAndView.addObject("success", "등록 되었습니다.");
          }catch(Exception e){
            modelAndView.addObject("error", "등록 오류입니다.");
            e.printStackTrace();
            //throw new RuntimeException(e);
          }
        
        
        }
        return modelAndView;
    }
    
    /**
     * ${payload.codedirTitle}를 수정하기 전 단계처리
     * @param ${payload.SampleSm}Id
     * @param searchVO
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/update${payload.Sample}View.do")
    public String update${payload.Sample}View(${payload.prikey} ,
            @ModelAttribute("searchVO") ${payload.Sample}VO searchVO, ModelMap model)
            throws Exception {
        ${payload.Sample}VO ${payload.SampleSm}VO = new ${payload.Sample}VO();

        // Primary Key 값 세팅
        ${payload.prikeyset}
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

        return "${payload.packagedirUrl}/${payload.SampleUrl}/${payload.Sample}Updt";
    }

    /**
     * ${payload.codedirTitle}를 수정 처리한다
     * @param atchFileAt
     * @param multiRequest
     * @param searchVO
     * @param ${payload.SampleSm}VO
     * @param bindingResult
     * @return	modelAndView
     * @throws Exception
     */
    @RequestMapping("/update${payload.Sample}.do")
    public ModelAndView update${payload.Sample}Info(@ModelAttribute("searchVO") ${payload.Sample}VO searchVO,
            @ModelAttribute("${payload.SampleSm}VO") ${payload.Sample}VO ${payload.SampleSm}VO, BindingResult bindingResult) throws Exception {

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");    
        // Validation
        //beanValidator.validate(${payload.SampleSm}VO, bindingResult);
        //if(bindingResult.hasErrors()){
        //	return "egovframework/com/uss/olh/nws/${payload.Sample}InfoUpdt";
        //}

        try{
          // 로그인VO에서  사용자 정보 가져오기
          // LoginVO	loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
          // String lastUpdusrId = loginVO.getId();
          // 아래 부분은 등록 수정자 아이디는 VO 를 참조하여 수정
          // 테이블의 등록 수정자 필드가 상의 할 경우 에러가 발생 함.
          // 가급적이면 테이블의 필드를 수정 하는 것을 권장
          //${payload.SampleSm}VO.${payload.edituserfd}(loginVO.getId());    	// 최종수정자ID
          ${payload.loginVoHtml}
          ${payload.reguserfdHrml}
          ${payload.edituserfdHtml}
          ${payload.Sample}Service.update${payload.Sample}(${payload.SampleSm}VO);
          modelAndView.addObject("success", "수정 되었습니다.");
        }catch(Exception e){
          modelAndView.addObject("error", "수정 오류입니다.");
          e.printStackTrace();
          //throw new RuntimeException(e);
        } 
        
        return modelAndView;

    }

    /**
     * ${payload.codedirTitle}를 수정 처리한다(첨부파일)
     * @param atchFileAt
     * @param multiRequest
     * @param searchVO
     * @param ${payload.SampleSm}VO
     * @param bindingResult
     * @return	modelAndView
     * @throws Exception
     */
    @RequestMapping("/update${payload.Sample}File.do")
    public ModelAndView update${payload.Sample}InfoFile(final MultipartHttpServletRequest multiRequest, @ModelAttribute("searchVO") ${payload.Sample}VO searchVO,
            @ModelAttribute("${payload.SampleSm}VO") ${payload.Sample}VO ${payload.SampleSm}VO, BindingResult bindingResult) throws Exception {

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");    
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

        try{
          // 로그인VO에서  사용자 정보 가져오기
          // LoginVO	loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
          // String lastUpdusrId = loginVO.getId();
          // 아래 부분은 등록 수정자 아이디는 VO 를 참조하여 수정
          // 테이블의 등록 수정자 필드가 상의 할 경우 에러가 발생 함.
          // 가급적이면 테이블의 필드를 수정 하는 것을 권장
          // ${payload.SampleSm}VO.${payload.edituserfd}(loginVO.getId());    	// 최종수정자ID
          ${payload.loginVoHtml}
          ${payload.reguserfdHrml}
          ${payload.edituserfdHtml}
          ${payload.Sample}Service.update${payload.Sample}(${payload.SampleSm}VO);
          modelAndView.addObject("success", "수정 되었습니다.");
        }catch(Exception e){
          modelAndView.addObject("error", "수정 오류입니다.");
          e.printStackTrace();
          //throw new RuntimeException(e);
        }
        
        return modelAndView;

    }
    
    /**
     * ${payload.codedirTitle}를 삭제한다.
     * @param ${payload.SampleSm}VO
     * @param searchVO
     * @return modelAndView
     * @throws Exception
     */
    @RequestMapping("/delete${payload.Sample}.do")
    public ModelAndView delete${payload.Sample}(${payload.Sample}VO ${payload.SampleSm}VO, @ModelAttribute("searchVO") ${payload.Sample}VO searchVO) throws Exception {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");  
        try{
          ${payload.Sample}Service.delete${payload.Sample}(${payload.SampleSm}VO);
          modelAndView.addObject("success", "삭제 되었습니다.");
        }catch(Exception e){
          modelAndView.addObject("error", "삭제 오류입니다.");
          e.printStackTrace();
          //throw new RuntimeException(e);
        }
      
        return modelAndView;
    }    
}
`;
        return vHtml;
}
module.exports = {
  getCtrl : setctrl
}