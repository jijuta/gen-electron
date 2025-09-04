const setctrl = function(payload, self) {
    //let payload = self.payload;
    let tb = payload.items[0];
    const c=`package ${payload.packagedir}.${payload.codedir}.controller;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ${payload.packagedir}.${payload.codedir}.common.ResultUtil;
import ${payload.packagedir}.${payload.codedir}.dto.${payload.Sample}Dto;
import ${payload.packagedir}.${payload.codedir}.form.${payload.Sample}Form;
import ${payload.packagedir}.${payload.codedir}.service.${payload.Sample}Service;

@Controller
//@RequestMapping(value = "/${payload.SampleUrl}")
public class ${payload.Sample}Controller {

    @Autowired
    private ${payload.Sample}Service ${payload.sample}Service;

    /** ${payload.codedirTitle} - 목록 페이지 이동 */
    @RequestMapping(value = "/${payload.sample}List")
    public String ${payload.sample}List(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "${payload.packagedirUrl}/${payload.sample}/${payload.sample}List";
    }

    /** ${payload.codedirTitle} - 목록 조회 */
    @RequestMapping(value = "/get${payload.Sample}List")
    @ResponseBody
    public ResultUtil get${payload.Sample}List(HttpServletRequest request, HttpServletResponse response, ${payload.Sample}Form ${payload.sample}Form) throws Exception {

        ResultUtil resultUtils = ${payload.sample}Service.get${payload.Sample}List(${payload.sample}Form);

        return resultUtils;
    }

    /** ${payload.codedirTitle} - 상세 페이지 이동 */
    @RequestMapping(value = "/${payload.sample}Detail")
    public String ${payload.sample}Detail(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "${payload.packagedirUrl}/${payload.sample}/${payload.sample}Detail";
    }

    /** ${payload.codedirTitle} - 상세 조회 */
    @RequestMapping(value = "/get${payload.Sample}Detail")
    @ResponseBody
    public ${payload.Sample}Dto get${payload.Sample}Detail(HttpServletRequest request, HttpServletResponse response, ${payload.Sample}Form ${payload.sample}Form) throws Exception {

        ${payload.Sample}Dto ${payload.sample}Dto = ${payload.sample}Service.get${payload.Sample}Detail(${payload.sample}Form);

        return ${payload.sample}Dto;
    }

    /** ${payload.codedirTitle} - 작성 페이지 이동 */
    @RequestMapping(value = "/${payload.sample}Write")
    public String ${payload.sample}Write(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "${payload.packagedirUrl}/${payload.sample}/${payload.sample}Write";
    }

    /** ${payload.codedirTitle} - 등록 */
    @RequestMapping(value = "/insert${payload.Sample}")
    @ResponseBody
    public ${payload.Sample}Dto insert${payload.Sample}(HttpServletRequest request, HttpServletResponse response, ${payload.Sample}Form ${payload.sample}Form) throws Exception {

        ${payload.Sample}Dto ${payload.sample}Dto = ${payload.sample}Service.insert${payload.Sample}(${payload.sample}Form);

        return ${payload.sample}Dto;
    }

    /** ${payload.codedirTitle} - 삭제 */
    @RequestMapping(value = "/delete${payload.Sample}")
    @ResponseBody
    public ${payload.Sample}Dto delete${payload.Sample}(HttpServletRequest request, HttpServletResponse response, ${payload.Sample}Form ${payload.sample}Form) throws Exception {

        ${payload.Sample}Dto ${payload.sample}Dto = ${payload.sample}Service.delete${payload.Sample}(${payload.sample}Form);

        return ${payload.sample}Dto;
    }

    /** ${payload.codedirTitle} - 수정 페이지 이동 */
    @RequestMapping(value = "/${payload.sample}Update")
    public String ${payload.sample}Update(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "${payload.packagedirUrl}/${payload.sample}/${payload.sample}Update";
    }

    /** ${payload.codedirTitle} - 수정 */
    @RequestMapping(value = "/update${payload.Sample}")
    @ResponseBody
    public ${payload.Sample}Dto update${payload.Sample}(HttpServletRequest request, HttpServletResponse response, ${payload.Sample}Form ${payload.sample}Form) throws Exception {

        ${payload.Sample}Dto ${payload.sample}Dto = ${payload.sample}Service.update${payload.Sample}(${payload.sample}Form);

        return ${payload.sample}Dto;
    }
    
    /** ${payload.codedirTitle} - 답글 페이지 이동 */
    @RequestMapping(value = "/${payload.sample}Reply")
    public String ${payload.sample}Reply(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "${payload.packagedirUrl}/${payload.sample}/${payload.sample}Reply";
    }

    /** ${payload.codedirTitle} - 답글 등록 */
    @RequestMapping(value = "/insert${payload.Sample}Reply")
    @ResponseBody
    public ${payload.Sample}Dto insert${payload.Sample}Reply(HttpServletRequest request, HttpServletResponse response, ${payload.Sample}Form ${payload.sample}Form) throws Exception {

        ${payload.Sample}Dto ${payload.sample}Dto = ${payload.sample}Service.insert${payload.Sample}Reply(${payload.sample}Form);

        return ${payload.sample}Dto;
    }
}
    `;

    return c;
}

module.exports = {
    getCtrl : setctrl
};