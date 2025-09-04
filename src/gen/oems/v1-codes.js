function setCtrl(items, self) {
    let camelCase = self.camelCase;
    //const array = item.chkURL.split("/");
    const dir = item.dir.toLowerCase();
    const dir1 = item.dir.toLowerCase();
    const dir2 = item.dir2;
    const codes = `
        /**
       * ${item.menuNm}
       */
        @RequestMapping(value = "/singarea/${dir}/select${dir2}Json.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
      @ResponseBody()
      public String selectCustomersalesmenList() throws JSONException, SQLException {
        JSONObject item = new JSONObject();
        
        Connection conn = null;
        conn = EgovGenUtil.getConnection();
        String Qry = tableInfo("${item.menuNm}","FOODATARAK");;
        item.put("result", "success");
        item.put("filds", EgovGenUtil.getSqlArrFirstSm(conn, Qry));
        item.put("total", EgovGenUtil.getSqlArrFirstSm(conn, " select count(*) as total from FOODATARAK.${item.menuNm} "));
        item.put("items", EgovGenUtil.getSqlArrFirstSm(conn, " select * from Foodatarak.${item.menuNm} limit 1000 "));
        try {if (conn != null) {conn.close();}} catch (Exception e) {if (conn != null) {conn.close();}}
        return item.toString();
        }
      
      @RequestMapping(value="${item.chkURL}")
        public String SelectMaster${item.menuNm}List(ModelMap model) throws Exception {

            model.addAttribute("title", "${item.title} ${item.menuNm}");
            model.addAttribute("listurl", "/singarea/${dir}/select${dir2}Json.do");
            model.addAttribute("detailUrl", "/singarea/${dir}/select${dir2}Detail.do");
            model.addAttribute("insertUrl", "/singarea/${dir}/insert${dir2}.do");
            model.addAttribute("deleteUrl", "/singarea/${dir}/delete${dir2}.do");
            model.addAttribute("updateUrl", "/singarea/${dir}/update${dir2}.do");
            model.addAttribute("table", "${dir2}");
            return "egovframework/com/singarea/${dir}/${dir2}";
        }
    `;
    return codes;
}

module.exports = {
    getCtrl: setCtrl
}