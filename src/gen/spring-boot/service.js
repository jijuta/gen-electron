
const setctrl= function(payload, self) {
    //let payload = self.payload;
  let tb = payload.items[0];
  // console.log(payload);
  let vHtml = `package ${payload.packagedir}.${payload.codedir}.${payload.SampleSm};

import ${payload.packagedir}.${payload.codedir}.${payload.SampleSm}.dto.*;
import java.util.List;

public interface ${payload.Sample}Service {
  List<Select${payload.Sample}Response> select${payload.Sample}List(String sortColumn, String sortType, int pageNum, int size);

  Select${payload.Sample}Response select${payload.Sample}(${payload.prikeyParams});

  List<Select${payload.Sample}Response> search${payload.Sample}(Search${payload.Sample}Request request, String sortColumn, String sortType, int skip, int size);

  void insert${payload.Sample}(Insert${payload.Sample}Request request);

  void update${payload.Sample}(${payload.prikeyParams}, Update${payload.Sample}Request request);

  void delete${payload.Sample}(${payload.prikeyParams});

  void delete${payload.Sample}s(List<${payload.Sample}PKRequest> request);

  void toggleUsing${payload.Sample}s(List<${payload.Sample}PKRequest> request);

  int count();

  int countSearch(Search${payload.Sample}Request request);
}
`;
        return vHtml;
}
export default{ getCtrl : setctrl};
