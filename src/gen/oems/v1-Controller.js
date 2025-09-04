function setCtrl(items, self) {
    let camelCase = self.camelCase;
    //console.log("self.PriKeyNm",self.PriKeyNm);
    let openPlayLoad= self.openPlayLoad(items);
    let sample = camelCase(self.sample);
    let Sample = sample.capitalizeFirstLetter();
    let SampleLg = sample.toUpperCase();
    let SampleSmIdxUcfirst = 'Sn';
    for (var item in self.prinameobj) {
        let json = self.prinameobj[item];
        if (json.column_name !== 'SN' && json.column_name !== 'sn')
            SampleSmIdxUcfirst = camelCase(json.column_name).capitalizeFirstLetter();
    }
    let SampleSm = sample.toLowerCase();
    let codedirTitle = self.servicename;
    let codedir = self.codedir.replacecHipon();
    let SampleUrl = self.codedir.replacecUrl();
    let reguserfd = '';
    let edituserfd = '';
    if (self.reguserfd)
        reguserfd = 'set' + camelCase(self.reguserfd.column_name).capitalizeFirstLetter();
    if (self.edituserfd)
        edituserfd = 'set' + camelCase(self.edituserfd.column_name).capitalizeFirstLetter();
    let ControllerDataTypeName = self.prinameobj
        .map(e => self.dataTypeinitTuTb(e.data_type, 2));
    let SampleSmIdx = camelCase(openPlayLoad.prikeyjsp)
    //console.log('SampleSmIdx ::: ',SampleSmIdx)
    //console.log('ControllerDataTypeName ::: ',ControllerDataTypeName)
    let basicPath = self.basicPath;
    let vHtml = `package ${basicPath}.${codedir}.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
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

import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.FileVO;

import ${basicPath}.${codedir}.service.${Sample}Service;
import ${basicPath}.${codedir}.service.${Sample}VO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import ${basicPath}.common.session.OemsSessionUtil;
import ${basicPath}.common.tiles.TilesCommonView;

@Controller
public class ${Sample}Controller {

@Resource(name = "${Sample}Service")
private ${Sample}Service ${Sample}Service;

/** EgovPropertyService */
@Resource(name = "propertiesService")
protected EgovPropertyService propertiesService;

// 첨부파일 관련
@Resource(name="EgovFileMngService")
private EgovFileMngService fileMngService;

@Resource(name="EgovFileMngUtil")
private EgovFileMngUtil fileUtil;

// Validation 관련
@Autowired
private DefaultBeanValidator beanValidator;

protected final Log logger = LogFactory.getLog(getClass());

@Autowired
private MessageSource messageSource;

/**
* ${codedirTitle} 목록의 검색 부분
* @param view
* @param request
* @param searchVO
* @param model
* @return	"/${SampleUrl}/${Sample}"
* @throws Exception
*/
@RequestMapping(value="/${SampleUrl}/select${Sample}.do")
public ModelAndView select${Sample}(TilesCommonView view, @RequestParam HashMap<?, ?> commandMap
, @ModelAttribute("searchVO") ${Sample}VO searchVO, ModelMap model) throws Exception {
  ModelAndView mav = new ModelAndView("${SampleUrl}/${Sample}Search");

  mav.addObject("pageDiv", "select${Sample}");
  mav.addObject("view", view);

  return mav;
}

/**
* ${codedirTitle} 목록의 리스트 부분
* @param ${Sample}VO
* @param commandMap
* @return modelAndView
* @exception Exception
*/
@RequestMapping("/${SampleUrl}/select${Sample}List.do")
public ModelAndView select${Sample}List( @RequestParam Map<?, ?> commandMap
      ,  @ModelAttribute("searchVO") ${Sample}VO searchVO)  throws Exception {
  ModelAndView modelAndView = new ModelAndView("${SampleUrl}/${Sample}List");
  //modelAndView.setViewName("jsonView");


  List<?> ${Sample}List = ${Sample}Service.select${Sample}List(searchVO);
  modelAndView.addObject("resultList", ${Sample}List);

  int totCnt = ${Sample}Service.select${Sample}ListCnt(searchVO);
  modelAndView.addObject("listTotalCnt", totCnt);
  modelAndView.addObject("curPage", searchVO.getCurPage());
  modelAndView.addObject("rList", ${Sample}List);
  modelAndView.addObject("pageDiv", "select${Sample}");

  return modelAndView;
}

/**
* ${codedirTitle} 목록에 대한 상세정보를 조회한다.
* @param view
* @param request
* @param ${SampleSm}VO
* @param searchVO
* @return	modelAndView
* @throws Exception
*/
@RequestMapping("/${SampleUrl}/select${Sample}View.do")
public ModelAndView	select${Sample}View(TilesCommonView view, @RequestParam HashMap<?, ?> commandMap,
${Sample}VO ${SampleSm}VO, @ModelAttribute("searchVO") ${Sample}VO ${Sample}VO) throws Exception {
  ModelAndView modelAndView = new ModelAndView();
  modelAndView.setViewName("${SampleUrl}/${Sample}Detail");
  modelAndView.addObject("view", view);
  modelAndView.addObject("sn", ${SampleSm}VO.get${SampleSmIdxUcfirst}());      
  modelAndView.addObject("pageDiv", "select${Sample}");
  modelAndView.addObject("login_id", OemsSessionUtil.getSession().getUserId());

  try{
      /* 파일 가져오기 추가하기 */
      List<${Sample}VO> fileList = null;
      modelAndView.addObject("fileList", "");

      ${Sample}VO vo = ${Sample}Service.select${Sample}Detail(${SampleSm}VO);
      


      if(vo != null){
        modelAndView.addObject("map", vo);
      }else{
        modelAndView.addObject("map", "");
      }
  }catch(Exception e){
      modelAndView.addObject("map", "");
      modelAndView.addObject("results", "해당 데이터가 없습니다.");
      e.printStackTrace();
      //throw new RuntimeException(e);
  }

  return	modelAndView;
}

/**
* ${codedirTitle}를 등록 전 단계처리
* @param view
* @param request
* @param searchVO
* @param model
* @return	ModelAndView
* @throws Exception
*/
@RequestMapping("/${SampleUrl}/select${Sample}Add.do")
public ModelAndView select${Sample}Add(TilesCommonView view, @RequestParam HashMap<?, ?> commandMap
, @ModelAttribute("searchVO") ${Sample}VO searchVO, Model model) throws Exception {
  ModelAndView mav = new ModelAndView();
  mav.setViewName("${SampleUrl}/${Sample}Add");
  mav.addObject("view", view);
  mav.addObject("pageDiv", "select${Sample}");
  mav.addObject("${SampleSm}VO", new ${Sample}VO());

  return mav;

}

/**
* ${codedirTitle}를 등록한다.
* @param searchVO
* @param ${SampleSm}VO
* @param bindingResult
* @return	modelAndView
* @throws Exception
*/
@RequestMapping(value="/${SampleUrl}/select${Sample}Write.do", method=RequestMethod.POST)
public ModelAndView select${Sample}Write(@ModelAttribute("searchVO") ${Sample}VO searchVO, @RequestParam HashMap<?, ?> commandMap
  , @ModelAttribute("${SampleSm}VO") ${Sample}VO ${SampleSm}VO, BindingResult bindingResult) throws Exception {

  ModelAndView modelAndView = new ModelAndView();
  modelAndView.setViewName("jsonView");

  int totCnt = ${Sample}Service.select${Sample}ListCnt(${SampleSm}VO);


  if(totCnt>0){
      modelAndView.addObject("results", "이미 등록된 ${codedirTitle}입니다.");

  }else{

      beanValidator.validate(${SampleSm}VO, bindingResult);

      if(bindingResult.hasErrors()){
          modelAndView.addObject("results", "validation  오류입니다.");
          return modelAndView;

      }

      try{
          // 로그인VO에서  사용자 정보 가져오기
          //LoginVO	loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

          String	frstRegisterId = OemsSessionUtil.getSession().getUserId();
  `; if (reguserfd && edituserfd) vHtml += `
          ${SampleSm}VO.${reguserfd}(frstRegisterId);		// 최초등록자ID
          ${SampleSm}VO.${edituserfd}(frstRegisterId);    	// 최종수정자ID
  `;
    vHtml += `
          ${Sample}Service.insert${Sample}(${SampleSm}VO);
          modelAndView.addObject("results", "등록 되었습니다.");
      }catch(Exception e){
          modelAndView.addObject("results", "등록 오류입니다.");
          e.printStackTrace();
          //throw new RuntimeException(e);
      }

  }
  return modelAndView;
}

/**
* ${codedirTitle}를 등록한다.(첨부파일)
* @param multiRequest
* @param searchVO
* @param ${SampleSm}VO
* @param bindingResult
* @return	modelAndView
* @throws Exception
*/
@RequestMapping(value="/${SampleUrl}/select${Sample}WriteFile.do", method=RequestMethod.POST)
public ModelAndView select${Sample}WriteFile(final MultipartHttpServletRequest multiRequest, @ModelAttribute("searchVO") ${Sample}VO searchVO
  , @RequestParam HashMap<?, ?> commandMap, @ModelAttribute("${SampleSm}VO") ${Sample}VO ${SampleSm}VO, BindingResult bindingResult) throws Exception {

  ModelAndView modelAndView = new ModelAndView();
  modelAndView.setViewName("jsonView");

  int totCnt = ${Sample}Service.select${Sample}ListCnt(${SampleSm}VO);


  if(totCnt>0){
      modelAndView.addObject("results", "이미 등록된 ${codedirTitle}입니다.");

  }else{
      // 첨부파일 관련 첨부파일ID 생성
      List<FileVO> _result = null;
      String _atchFileId = "";

      final Map<String, MultipartFile> files = multiRequest.getFileMap();

      if(!files.isEmpty()){
       _result = fileUtil.parseFileInf(files, "${SampleLg}_", 0, "", "");
       _atchFileId = fileMngService.insertFileInfs(_result);  //파일이 생성되고나면 생성된 첨부파일 ID를 리턴한다.
      }

      // 리턴받은 첨부파일ID를 셋팅한다..
      //${SampleSm}VO.setAtchFileId(_atchFileId);			// 첨부파일 ID

      beanValidator.validate(${SampleSm}VO, bindingResult);

      if(bindingResult.hasErrors()){
          modelAndView.addObject("results", "validation  오류입니다.");
          return modelAndView;

      }

      try{
          // 로그인VO에서  사용자 정보 가져오기
          //LoginVO	loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

          String	frstRegisterId = OemsSessionUtil.getSession().getUserId();

          //TODO 아래 부분은 등록 수정자 아이디는 VO 를 참조하여 수정
          //TODO 테이블의 등록 수정자 필드가 상의 할 경우 에러가 발생 함.
  //TODO 가급적이면 테이블의 필드를 수정 하는 것을 권장
  `; if (reguserfd && edituserfd) vHtml += `
          ${SampleSm}VO.${reguserfd}(frstRegisterId);		// 최초등록자ID
          ${SampleSm}VO.${edituserfd}(frstRegisterId);    	// 최종수정자ID
  `;
    vHtml += `
          ${Sample}Service.insert${Sample}(${SampleSm}VO);
          modelAndView.addObject("results", "등록 되었습니다.");
      }catch(Exception e){
          modelAndView.addObject("results", "등록 오류입니다.");
          e.printStackTrace();
          //throw new RuntimeException(e);
      }


  }
  return modelAndView;
}

/**
* ${codedirTitle}를 수정하기 전 단계처리
* @param view
* @param request
* @param ${SampleSmIdx}
* @param searchVO
* @param model
* @return ModelAndView
* @throws Exception
*/
@RequestMapping("/${SampleUrl}/select${Sample}Modify.do")
public ModelAndView select${Sample}Modify(TilesCommonView view, @RequestParam HashMap<?, ?> commandMap
`;
    for (var item2 in self.prinameobj) {
        var types = ControllerDataTypeName[item2]
        var names = SampleSmIdx[item2]
        vHtml +=
            `     , @RequestParam("${names}Id") ${types} ${names}`
    }
    vHtml +=
        `     , @ModelAttribute("searchVO") ${Sample}VO searchVO, ModelMap model)
      throws Exception {
  ModelAndView mav = new ModelAndView();

  ${Sample}VO ${SampleSm}VO = new ${Sample}VO();

  // Primary Key 값 세팅
  ${SampleSm}VO.set${SampleSmIdxUcfirst}(${SampleSmIdx});
  mav.setViewName("${SampleUrl}/${Sample}Updt");
  mav.addObject("pageDiv", "select${Sample}");
  mav.addObject("view", view);
  mav.addObject("sn", ${SampleSm}VO.get${SampleSmIdxUcfirst}());

  try{
        ${Sample}VO vo = ${Sample}Service.select${Sample}Detail(${SampleSm}VO);
        

      if(vo != null){
        mav.addObject("${Sample}VO", ${Sample}Service.select${Sample}Detail(${SampleSm}VO));
        mav.addObject("map", vo);
      }else{
        mav.addObject("map", "");
      }

  }catch(Exception e){
      mav.addObject("map", "");
      mav.addObject("results", "해당 데이터가 없습니다.");
      e.printStackTrace();
      //throw new RuntimeException(e);
  }

  return mav;
}

/**
* ${codedirTitle}를 수정 처리한다
* @param atchFileAt
* @param searchVO
* @param ${SampleSm}VO
* @param bindingResult
* @return	modelAndView
* @throws Exception
*/
@RequestMapping(value="/${SampleUrl}/select${Sample}Update.do", method=RequestMethod.POST)
public ModelAndView select${Sample}Update(@ModelAttribute("searchVO") ${Sample}VO searchVO
    , @RequestParam HashMap<?, ?> commandMap, @ModelAttribute("${SampleSm}VO") ${Sample}VO ${SampleSm}VO, BindingResult bindingResult) throws Exception {

  ModelAndView modelAndView = new ModelAndView();
  modelAndView.setViewName("jsonView");
  // Validation
  //beanValidator.validate(${SampleSm}VO, bindingResult);
  //if(bindingResult.hasErrors()){
  //	return "egovframework/com/uss/olh/nws/${Sample}InfoUpdt";
  //}

  try{
      // 로그인VO에서  사용자 정보 가져오기
      //LoginVO	loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

      String lastUpdusrId = OemsSessionUtil.getSession().getUserId();

      // 아래 부분은 등록 수정자 아이디는 VO 를 참조하여 수정
      // 테이블의 등록 수정자 필드가 상의 할 경우 에러가 발생 함.
// 가급적이면 테이블의 필드를 수정 하는 것을 권장
`; if (edituserfd) vHtml += `
        ${SampleSm}VO.${edituserfd}(lastUpdusrId);    	// 최종수정자ID
`;
    vHtml += `
        ${Sample}Service.update${Sample}(${SampleSm}VO);
      modelAndView.addObject("results", "수정 되었습니다.");
  }catch(Exception e){
      modelAndView.addObject("results", "수정 오류입니다.");
      e.printStackTrace();
      //throw new RuntimeException(e);
  }

  return modelAndView;

}

/**
* ${codedirTitle}를 수정 처리한다(첨부파일)
* @param atchFileAt
* @param multiRequest
* @param searchVO
* @param ${SampleSm}VO
* @param bindingResult
* @return	modelAndView
* @throws Exception
*/
@RequestMapping(value="/${SampleUrl}/select${Sample}UpdateFile.do", method=RequestMethod.POST)
public ModelAndView select${Sample}UpdateFile(final MultipartHttpServletRequest multiRequest, @ModelAttribute("searchVO") ${Sample}VO searchVO
    , @RequestParam HashMap<?, ?> commandMap, @ModelAttribute("${SampleSm}VO") ${Sample}VO ${SampleSm}VO, BindingResult bindingResult) throws Exception {

  ModelAndView modelAndView = new ModelAndView();
  modelAndView.setViewName("jsonView");
  // Validation
  //beanValidator.validate(${SampleSm}VO, bindingResult);
  //if(bindingResult.hasErrors()){
  //	return "egovframework/com/uss/olh/nws/${Sample}InfoUpdt";
  //}

  // 첨부파일 관련 ID 생성 start....
  String _atchFileId = ${SampleSm}VO.getAtchFileId();

  final Map<String, MultipartFile> files = multiRequest.getFileMap();
  if(!files.isEmpty()){
      if("".equals(_atchFileId)){
          List<FileVO> _result = fileUtil.parseFileInf(files, "${SampleLg}_", 0, _atchFileId, "");
          _atchFileId = fileMngService.insertFileInfs(_result);
          //${SampleSm}VO.setAtchFileId(_atchFileId);    	// 첨부파일 ID

      }else{
          FileVO fvo = new FileVO();
          fvo.setAtchFileId(_atchFileId);
          int _cnt = fileMngService.getMaxFileSN(fvo);
          List<FileVO> _result = fileUtil.parseFileInf(files, "${SampleLg}_", _cnt, _atchFileId, "");
          fileMngService.updateFileInfs(_result);
      }
  }
  // 첨부파일 관련 ID 생성 end...

  try{
      // 로그인VO에서  사용자 정보 가져오기
      //LoginVO	loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

      String lastUpdusrId = OemsSessionUtil.getSession().getUserId();

      // 아래 부분은 등록 수정자 아이디는 VO 를 참조하여 수정
      // 테이블의 등록 수정자 필드가 상의 할 경우 에러가 발생 함.
// 가급적이면 테이블의 필드를 수정 하는 것을 권장
`; if (edituserfd) vHtml += `
        ${SampleSm}VO.${edituserfd}(lastUpdusrId);    	// 최종수정자ID
`;
    vHtml += `
        ${Sample}Service.update${Sample}(${SampleSm}VO);
      modelAndView.addObject("results", "수정 되었습니다.");
  }catch(Exception e){
      modelAndView.addObject("results", "수정 오류입니다.");
      e.printStackTrace();
      //throw new RuntimeException(e);
  }

  return modelAndView;

}

/**
* ${codedirTitle}를 삭제한다.
* @param ${SampleSm}VO
* @param searchVO
* @return modelAndView
* @throws Exception
*/
@RequestMapping(value="/${SampleUrl}/select${Sample}Delete.do", method=RequestMethod.POST)
public ModelAndView select${Sample}Delete(${Sample}VO ${SampleSm}VO, @RequestParam HashMap<?, ?> commandMap, @ModelAttribute("searchVO") ${Sample}VO searchVO) throws Exception {
  ModelAndView modelAndView = new ModelAndView();
  modelAndView.setViewName("jsonView");
  try{
      ${Sample}Service.delete${Sample}(${SampleSm}VO);
      modelAndView.addObject("results", "삭제 되었습니다.");
  }catch(Exception e){
      modelAndView.addObject("results", "삭제 오류입니다.");
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
    getCtrl: setCtrl
}
