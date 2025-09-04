const camelCase = require("camelcase");
const utils = require("./utils.js");

/**
 * 
 * @param {Java  getter setter} items 
 */
let getset = function (items) {
    let tb = items[0];
    let SampleVoPrivate = "";
    let SampleVoPublic = "";
    for (var item in items) {
        let row = items[item];
        let Pri = `
    /** ${row.COLUMN_COMMENTS} */
    private ${utils.dataType(row.DATA_TYPE)} ${camelCase(row.COLUMN_NAME)} = ${utils.dataTypeInitValue(row.DATA_TYPE)};
`
        SampleVoPrivate += Pri;

        let Pub = `
    /**
     * ${camelCase(row.COLUMN_NAME)} attribute를 리턴한다.
     * 
     * @return the ${camelCase(row.COLUMN_NAME)}
     */
    public ${utils.dataType(row.DATA_TYPE)} get${utils.camalFirst(camelCase(row.COLUMN_NAME))}() {
      return ${camelCase(row.COLUMN_NAME)};
    }

    /**
     * ${camelCase(row.COLUMN_NAME)} attribute 값을 설정한다.
     * 
     * @param ${camelCase(row.COLUMN_NAME)}
     *            the ${camelCase(row.COLUMN_NAME)} to set
     */
    public void set${utils.camalFirst(camelCase(row.COLUMN_NAME))}(${utils.dataType(row.DATA_TYPE)} ${camelCase(row.COLUMN_NAME)}) {
      this.${camelCase(row.COLUMN_NAME)} = ${camelCase(row.COLUMN_NAME)};
    }
`;
        SampleVoPublic += Pub;
    }

    return [SampleVoPrivate, SampleVoPublic]
}

/**
 * 
 * @param {mapper 셀렉트문} items 
 */
let getSelected = function (items) {
    var selectedArray = items.map(function (officer) {
        return officer.COLUMN_NAME
    });

    var dateTypeArray = items.map(function (officer) {
        return officer.DATA_TYPE
    });

    selectedArray.forEach(function (item, index, array) {
        let r = camelCase(item);
        let d = dateTypeArray[index];
        if (d == "DATE") {
            array[index] = `
            TO_CHAR(${item})`
        } else {
            array[index] = `
            ${item}`
        }

    });

    return selectedArray.join();
}

/**
 * 
 * @param {mapper 업데이트문} items 
 */
let getUpdated = function (items) {
    var selectedArray = items.map(function (officer) {
        return officer.COLUMN_NAME
    });

    selectedArray.forEach(function (item, index, array) {
        let r = camelCase(item);
        array[index] = `
                ${item} = #{${camelCase(item)}}`
    });

    return selectedArray.join();
}

/**
 * 
 * @param {mapper 인서트문} items 
 */
let getInserted = function (items) {
    var selectedArray = items.map(function (officer) {
        return officer.COLUMN_NAME
    });

    selectedArray.forEach(function (item, index, array) {
        let r = camelCase(item);
        array[index] = `
                #{${camelCase(item)}}`
    });

    return selectedArray.join();
}

/**
 * 
 * @param {mapper 리졸트맵} items 
 */
let getResultMap = function (items) {
    var selectedArray = items.map(function (officer) {
        return officer.COLUMN_NAME
    });

    selectedArray.forEach(function (item, index, array) {
        let r = camelCase(item);
        array[index] = `    <result property="${r}" column="${item}"/>
        `
    });

    return selectedArray.join('');
}

let getSearchConditionMapper = function (items) {
    var selectedArray = items.map(function (officer) {
        return officer.COLUMN_NAME
    });

    selectedArray.forEach(function (item, index, array) {
        let r = camelCase(item);
        array[index] = `
                <if test="searchCnd == ${index}">
                    AND ${item} LIKE '%' || #{searchKeyword} || '%' 		
                </if>`
    });

    return selectedArray.join('');
}

let getItems = function (items) {
    var selectedArray = items.map(function (officer) {
        return officer.COLUMN_NAME
    });

    var dateTypeArray = items.map(function (officer) {
        return officer.DATA_TYPE
    });

    selectedArray.forEach(function (item, index, array) {
        let r = camelCase(item);
        let d = dateTypeArray[index];
        if (d == "DATE") {
            array[index] = `
            TO_CHAR(${item})`
        } else {
            array[index] = `
            ${item}`
        }

    });

    return selectedArray.join();
}

/**
 * 
 * @param {VUE src/views 의 인터페이스} } items 
 */
let getItemsObjcets = function (items) {
    var selectedArray = items.map(function (officer) {
        return officer.COLUMN_NAME
    });

    var selectedArray2 = items.map(function (officer) {
        return officer.DATA_TYPE
    });

    var selectedArray3 = items.map(function (officer) {
        return officer.COLUMN_COMMENTS
    });
    let i=0
    selectedArray.forEach(function (item, index, array) {
        let r = camelCase(item);
        let s = utils.dataTypeJavascript(selectedArray2[index]);
        if(i===0){
            array[index] = `  ${r} : ${s} /** ${selectedArray3[index]}*/`;
        }else{
            array[index] = `
        ${r} : ${s} /** ${selectedArray3[index]}*/`; 
        }
        
        i++
    });

    return selectedArray.join(' , ');
}


/**
 * 
 * @param {VUE src/views 의 인터페이스} } items 
 */
let getInterFace = function (items) {
    var selectedArray = items.map(function (officer) {
        return officer.COLUMN_NAME
    });

    var selectedArray2 = items.map(function (officer) {
        return officer.DATA_TYPE
    });

    var selectedArray3 = items.map(function (officer) {
        return officer.COLUMN_COMMENTS
    });

    selectedArray.forEach(function (item, index, array) {
        let r = camelCase(item);
        let s = utils.dataTypeTs(selectedArray2[index]);
        array[index] = `
    ${r} : ${s} /** ${selectedArray3[index]}*/`
    });

    return selectedArray.join(' ; ');
}

let getLists = function (items, type, title=false) {
    var selectedArray = items.map(function (officer) {
        return officer.COLUMN_NAME
    });

    var selectedArray2 = items.map(function (officer) {
        return officer.DATA_TYPE
    });

    var selectedArray3 = items.map(function (officer) {
        return officer.COLUMN_COMMENTS
    });

    let i=0;
    selectedArray.forEach(function (item, index, array) {
        let r = camelCase(item);
        let s = utils.dataTypeTs(selectedArray2[index]);
        if(title){
            if(i===0){
            array[index] = `            <${type}>${selectedArray3[index]}</${type}>`;
            }else{
            array[index] = `
            <${type}>${selectedArray3[index]}</${type}>`;
            }
        }else{
            if(i===0){
            array[index] = `            <${type}>{{item.${r}}}</${type}>`;    
            }else{
            array[index] = `
            <${type}>{{item.${r}}}</${type}>` ;
            }
        }
        i++;
    });

    return selectedArray.join('  ');
}



let getTpl = function (items) {
    var selectedArray = items.map(function (officer) {
        return officer.COLUMN_NAME
    });

    var selectedArray2 = items.map(function (officer) {
        return officer.DATA_TYPE
    });

    var selectedArray3 = items.map(function (officer) {
        return officer.COLUMN_COMMENTS
    });

    selectedArray.forEach(function (item, index, array) {
        let r = camelCase(item);
        let s = utils.dataTypeJavascript(selectedArray2[index]);
        array[index] = `
            ${r} : ${s} /** ${selectedArray3[index]}*/`
    });

    return selectedArray.join(' , ');
}

module.exports = {
    getset: getset,
    getSelected: getSelected,
    getUpdated: getUpdated,
    getInserted: getInserted,
    getResultMap: getResultMap,
    getSearchConditionMapper: getSearchConditionMapper,
    getItemsObjcets: getItemsObjcets,
    getItems:getItems,
    getTpl: getTpl,
    getInterFace:getInterFace,
    getLists:getLists
};