const camelCase = require("camelcase");

const setDao = function (payload, utils) {

    let prikeyColumn = payload.items.filter(function (item) {
        return item.pk_flag === "Y";
    }).map(function (data) {
        return utils.dataTypeFnc(data.data_type) + " " + camelCase(data.column_name);
    });

    let insertedColumn = payload.insertTabledobj.map(function (data) {
        return utils.dataTypeFnc(data.data_type) + " " + camelCase(data.column_name);
    });

    let updatedColumn = payload.updateTabledobj.map(function (data) {
        return utils.dataTypeFnc(data.data_type) + " " + camelCase(data.column_name);
    });

    let searchColumn = payload.selectedSearchobj.map(function (data) {
        return utils.dataTypeFnc(data.data_type) + " " + camelCase(data.column_name);
    });

    let vHtml = `package ${payload.packagedir}.${payload.codedir}.${payload.SampleSm};
    
import org.apache.ibatis.annotations.Mapper;
import ${payload.packagedir}.${payload.codedir}.${payload.SampleSm}.dto.*;
import java.util.List;
    
@Mapper
public interface ${payload.Sample}DAO {
    
    List<Select${payload.Sample}Response> select${payload.Sample}List(String sortColumn, String sortType, int skip, int size);
    
    Select${payload.Sample}Response select${payload.Sample}(${prikeyColumn.join(", ")});

    List<Select${payload.Sample}Response> search${payload.Sample}(${searchColumn.join(", ")}, String totalSearch, String sortColumn, String sortType, int skip, int size);
    
    void insert${payload.Sample}(${insertedColumn.join(", ")});
    
    void update${payload.Sample}(${payload.prikeyParams}, ${updatedColumn.join(", ")});
    
    void delete${payload.Sample}(${payload.prikeyParams});

    void toggleUsing${payload.Sample}s(List<${payload.Sample}PKRequest> request);

    void delete${payload.Sample}s(List<${payload.Sample}PKRequest> request);

    int count();

    int countSearch(${searchColumn.join(", ")}, String totalSearch);
}`;

    return vHtml;
}

 

export default{ getDao : setDao};
