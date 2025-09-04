const setctrl = function(payload, self) {
    //let payload = self.payload;
    let tb = payload.items[0];
    let vHtml = `package ${payload.packagedir}.${payload.codedir}.service.impl;

    import java.util.List;
    
    import javax.annotation.Resource;
    
    import org.springframework.stereotype.Service;
    
    import ${payload.packagedir}.${payload.codedir}.service.${payload.Sample}Service;
    import ${payload.packagedir}.${payload.codedir}.service.${payload.Sample}VO;
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
    
    }`;
          return vHtml;
}
module.exports = {
    getCtrl : setctrl
}