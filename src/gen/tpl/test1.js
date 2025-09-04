let data = 
{
    items: [],
    tb: {},
    tablename: (config.tablename ? config.tablename : tb.TABLE_NAME),
    codedirTitle: (config.codedirTitle ? config.codedirTitle : tb.TABLE_COMMENTS),
    SampleSmIdx: (config.SampleSmIdx ? config.SampleSmIdx : ""),
    ControllerDataTypeName: (config.ControllerDataTypeName ? config.ControllerDataTypeName : ""),
    Sample: (config.Sample ? camelCase(config.Sample) : camelCase(tablename)),
    codedir: (config.codedir ? config.codedir : "ect"),
    SampleVoPrivate: "",
    SampleVoPublic: "",
    table_name: tablename,
    PriKeyNm: "",
    selected: "",
    searchConditionMapper: "",
    inserted: "",
    updated: "",
    resultMap: ""
}