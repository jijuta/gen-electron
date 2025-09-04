
const setctrl= function(payload, self) {
    //let payload = self.payload;
  let tb = payload.items[0];
  // console.log(payload);
  let vHtml = `package ${payload.packagedir}.${payload.codedir}.${payload.SampleSm};

import ${payload.packagedir}.${payload.codedir}.${payload.SampleSm}.dto.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated; 
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("\${myapp.basepath}")
public class ${payload.Sample}Controller {

  private final ${payload.Sample}Service ${payload.sample}Service;

  /**
   * ${payload.codedirTitle} 전체 목록 조회.
   * @param  sortColumn  정렬 기준 컬럼
   * @param  sortType    정렬 방식(ASC or DESC)
   * @param  pageNum     페이지 번호
   * @param  pageSize    한 페이지에 보고 싶은 페이지 수
   * @param  recordSize  한 페이지에 보고 싶은 데이터 수
   * @return rtnObj      ${payload.sample}List와 페이지 정보를 담은 리턴객체
   * @throws Exception
   */
  @GetMapping("/${payload.sample}s")
  public Map<String, Object> selectAll${payload.Sample}(@RequestParam(defaultValue = "") String sortColumn,
                                              @RequestParam(defaultValue = "ASC") String sortType,
                                              @RequestParam(defaultValue = "1") int pageNum,
                                              @RequestParam(defaultValue = "10") int pageSize,
                                              @RequestParam(defaultValue = "10") int recordSize) {
      Map<String, Object> rtnObj = new HashMap<>();

      List<Select${payload.Sample}Response> ${payload.sample}List = ${payload.sample}Service.select${payload.Sample}List(sortColumn, sortType, pageNum, recordSize);
      Pagination pageInfo = new Pagination(${payload.sample}Service.count(), pageNum, recordSize, pageSize);

      rtnObj.put("result", ${payload.sample}List);
      rtnObj.put("pageInfo", pageInfo);
      return rtnObj;
  }

  /**
   * ${payload.codedirTitle}에서 PK로 조회.
   * @param  ${payload.prikey}  PK
   * @return rtnObj      조회된 ${payload.sample} 정보를 담은 리턴객체
   * @throws Exception
   */
  @GetMapping("/${payload.sample}s/byId")
  public Map<String, Object> select${payload.Sample}(${payload.prikey}) {
      Map<String, Object> rtnObj = new HashMap<>();

      Select${payload.Sample}Response ${payload.sample} = ${payload.sample}Service.select${payload.Sample}(${payload.prikeyArgs});

      rtnObj.put("result", ${payload.sample});
      return rtnObj;
  }

  /**
   * ${payload.codedirTitle}을 조건에 따라 검색.
   * @param  request     검색할 조건이 담긴 Search${payload.Sample}Request
   * @param  sortColumn  정렬 기준 컬럼
   * @param  sortType    정렬 방식(ASC or DESC)
   * @param  pageNum     페이지 번호
   * @param  pageSize    한 페이지에 보고 싶은 페이지 수
   * @param  recordSize  한 페이지에 보고 싶은 데이터 수
   * @return rtnObj      ${payload.sample}List와 페이지 정보를 담은 리턴객체
   * @throws Exception
   */
  @PostMapping("/${payload.sample}s/search")
  public Map<String, Object> search${payload.Sample}(@RequestBody Search${payload.Sample}Request request,
                                        @RequestParam(defaultValue = "") String sortColumn,
                                        @RequestParam(defaultValue = "ASC") String sortType,
                                        @RequestParam(defaultValue = "1") int pageNum,
                                        @RequestParam(defaultValue = "10") int pageSize,
                                        @RequestParam(defaultValue = "10") int recordSize) {
      Map<String, Object> rtnObj = new HashMap<>();

      List<Select${payload.Sample}Response> ${payload.sample} = ${payload.sample}Service.search${payload.Sample}(request, sortColumn, sortType, pageNum, recordSize);
      Pagination pageInfo = new Pagination(${payload.sample}Service.countSearch(request), pageNum, recordSize, pageSize);

      rtnObj.put("result", ${payload.sample});
      rtnObj.put("pageInfo", pageInfo);
      return rtnObj;
  }

  /**
   * ${payload.codedirTitle}을 등록.
   * @param  request     등록할 정보가 담긴 Insert${payload.Sample}Request
   * @return rtnObj      "success" 문자열을 담아 리턴
   * @throws Exception
   */
  @PostMapping("/${payload.sample}s")
  public Map<String, Object> insert${payload.Sample}(@Validated @RequestBody Insert${payload.Sample}Request request) {
      Map<String, Object> rtnObj = new HashMap<>();

      ${payload.sample}Service.insert${payload.Sample}(request);

      rtnObj.put("result", "success");
      return rtnObj;
  }

  /**
   * ${payload.codedirTitle}을 수정.
   * @param  request     수정할 정보가 담긴 Update${payload.Sample}Request
   * @return rtnObj      "success" 문자열을 담아 리턴
   * @throws Exception
   */
  @PutMapping("/${payload.sample}s")
  public Map<String, Object> update${payload.Sample}(${payload.prikey}, @Validated @RequestBody Update${payload.Sample}Request request) {
      Map<String, Object> rtnObj = new HashMap<>();

      ${payload.sample}Service.update${payload.Sample}(${payload.prikeyArgs}, request);

      rtnObj.put("result", "success");
      return rtnObj;
  }

  @PostMapping("/${payload.sample}s/toggle-using-items")
  public Map<String, Object> toggleUsing${payload.Sample}s(@RequestBody List<${payload.Sample}PKRequest> request) {

      Map<String, Object> rtnObj = new HashMap<>();
      if(request.isEmpty()){
          rtnObj.put("result","empty request");
          return rtnObj;
      }
      ${payload.sample}Service.toggleUsing${payload.Sample}s(request);
      rtnObj.put("result", "success");
      return rtnObj;
  }   

  @PostMapping("/${payload.sample}s/delete-items")
  public Map<String, Object> delete${payload.Sample}s(@RequestBody List<${payload.Sample}PKRequest> request) {

      Map<String, Object> rtnObj = new HashMap<>();
      if(request.isEmpty()){
          rtnObj.put("result","empty request");
          return rtnObj;
      }
      ${payload.sample}Service.delete${payload.Sample}s(request);
      rtnObj.put("result", "success");
      return rtnObj;
  }    

  /**
   * ${payload.codedirTitle}을 삭제.
   * @param  ${payload.prikey}  PK
   * @return rtnObj      "success" 문자열을 담아 리턴
   * @throws Exception
   */
  @DeleteMapping("/${payload.sample}s")
  public Map<String, Object> delete${payload.Sample}(${payload.prikey}) {
      Map<String, Object> rtnObj = new HashMap<>();

      ${payload.sample}Service.delete${payload.Sample}(${payload.prikeyArgs});

      rtnObj.put("result", "success");
      return rtnObj;
  }
}
`;
        return vHtml;
};

export default{ getCtrl : setctrl};
