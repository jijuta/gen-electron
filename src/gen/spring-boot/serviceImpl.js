const camelCase = require("camelcase");

const setctrl= function(payload, self) {
    //let payload = self.payload;
  let tb = payload.items[0];
  // console.log(payload);
  function c2p(data){
    return data.charAt(0).toUpperCase() + data.slice(1);
  }
  let updateArg=payload.updateTabledobj.map((data)=>{return ` request.get${c2p(camelCase(data.column_name))}()`}).join();
  let insertArg=payload.insertTabledobj.map((data)=>{return ` request.get${c2p(camelCase(data.column_name))}()`}).join();
  let searchArg=payload.selectedSearchobj.map((data)=>{return ` request.get${c2p(camelCase(data.column_name))}()`}).join();
  
  let vHtml = `package ${payload.packagedir}.${payload.codedir}.${payload.SampleSm};

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ${payload.packagedir}.${payload.codedir}.${payload.SampleSm}.dto.*;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ${payload.Sample}ServiceImpl implements ${payload.Sample}Service {

    private final ${payload.Sample}DAO ${payload.sample}DAO;

    @Override
    public List<Select${payload.Sample}Response> select${payload.Sample}List(String sortColumn, String sortType, int pageNum, int size) {
        return ${payload.sample}DAO.select${payload.Sample}List(sortColumn, sortType,(pageNum - 1) * size, size);
    }

    @Override
    public Select${payload.Sample}Response select${payload.Sample}(${payload.prikeyParams}) {
        return ${payload.sample}DAO.select${payload.Sample}(${payload.prikeyArgs});
    }

    @Override
    public List<Select${payload.Sample}Response> search${payload.Sample}(Search${payload.Sample}Request request, String sortColumn, String sortType, int pageNum, int size) {
        return ${payload.sample}DAO.search${payload.Sample}(${searchArg}, request.getTotalSearch(), sortColumn, sortType,(pageNum - 1) * size, size);
    }

    @Override
    public void insert${payload.Sample}(Insert${payload.Sample}Request request) {
        ${payload.sample}DAO.insert${payload.Sample}(${insertArg});
    }

    @Override
    public void update${payload.Sample}(${payload.prikeyParams}, Update${payload.Sample}Request request) {
        //pk로 조회실패시 throw
        ${payload.sample}DAO.update${payload.Sample}(${payload.prikeyArgs},${updateArg});
    }
    @Override
    public void toggleUsing${payload.Sample}s(List<${payload.Sample}PKRequest> request){
        ${payload.sample}DAO.toggleUsing${payload.Sample}s(request);
    }
    @Override
    public void delete${payload.Sample}s(List<${payload.Sample}PKRequest> request){
        ${payload.sample}DAO.delete${payload.Sample}s(request);
    }

    @Override
    public void delete${payload.Sample}(${payload.prikeyParams}) {
        //pk로 조회실패시 throw
        ${payload.sample}DAO.delete${payload.Sample}(${payload.prikeyArgs});
    }

    @Override
    public int count() {
        return ${payload.sample}DAO.count();
    }

    @Override
    public int countSearch(Search${payload.Sample}Request request) {
        return ${payload.sample}DAO.countSearch(${searchArg}, request.getTotalSearch());
    }
}

`;
        return vHtml;
}
export default{ getCtrl : setctrl};
