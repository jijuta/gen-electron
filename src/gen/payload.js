
function setPlayLoad(items){
let item = items[0];
//console.log("item-", item);
let sample = camelCase(this.sample);
let Sample = sample.capitalizeFirstLetter();
let SampleLg = sample.toUpperCase();
let SampleSmIdxUcfirst = sample.capitalizeFirstLetter();
let SampleSm = sample.toLowerCase();
let codedirTitle = this.servicename;
let codedir = this.codedir.replacecHipon();
let SampleUrl = this.codedir.replacecUrl();
let reguserfd = this.reguserfd;
let edituserfd = this.edituserfd;
console.log(this.useyn);
let useyn = "",
  delyn = "";
if (this.useyn) {
  useyn = this.useyn.map(e => e.column_name + "= 'Y'").join(" and ");

  delyn = this.useyn.map(e => e.column_name + "= 'Y'").join(" and ");
}

let ControllerDataTypeName = this.ControllerDataTypeName;

let whereIdx = "";
if (this.PriKeyNm) {
  whereIdx = this.PriKeyNm.map(
    e => e.column_name + "= #{" + camelCase(e.column_name) + "}"
  ).join(" and ");
}

let table_name = this.schema + "." + this.tablename;
let join_table_name = this.getJoins();
if (this.joins.length > 0) {
} else {
  join_table_name = table_name + " " + this.tablename;
}

let selectedmod = this.selectedObj.map(
  e => "\n\t\t\t\t" + e.table_name + "." + e.column_name
);
let insertedcolumn = this.insertTabledobj.map(
  e => "\n\t\t\t" + e.column_name
);
let searchConditionItem = "\t\t\t";
this.selectedSearchobj.forEach((post, i) => {
  let camelizesUpdateVal = camelCase(post.column_name.toLowerCase());
  let TP = this.dataTypeinitTuTb(post.data_type);

  searchConditionItem +=
    "<if test='" + camelizesUpdateVal + " != " + TP + "'> AND";
  searchConditionItem +=
    " " + post.column_name + " REGEXP #{" + camelizesUpdateVal + "}";
  searchConditionItem += "</if>";
  searchConditionItem += "\r\n\t\t\t";
});

let searchConditionMapper = searchConditionItem;

let inserted = this.insertTabledobj.map(
  e => "\n\t\t\t#{" + camelCase(e.column_name) + "}"
);
let updated = this.updateTabledobj.map(
  e =>
    "\n\t\t\t" + e.column_name + " = #{" + camelCase(e.column_name) + "}"
);

let resultMap = this.selectedObj
  .map(
    e =>
      "\n\t\t\t" +
      '<result property="' +
      camelCase(e.column_name) +
      '" column="' +
      e.column_name +
      '"/>'
  )
  .join(" ");

let pagingHtml = "LIMIT	#{recordCountPerPage} OFFSET #{firstIndex}";
if (this.db === "pgsql")
  pagingHtml = '<include refid="common.pageSql" />';

let payload = {
    items: items,
    tb: tb,
    tablename: tablename,
    codedirTitle: codedirTitle,
    PriKeyNm: PriKeyNm,
    SampleSmIdx: SampleSmIdx,
    ControllerDataTypeName: ControllerDataTypeName,
    Sample: Sample,
    SampleLg: Sample.toUpperCase(),
    SampleSm: Sample.toLowerCase(),
    SampleUrl: SampleUrl,
    SampleSmIdxUcfirst: SampleSmIdxUcfirst,
    codedir: codedir,
    codedirDot: codedir.replace("/", "."),
    SampleVoPrivate: "",
    SampleVoPublic: "",
    table_name: tablename,
    selected: "",
    searchConditionMapper: "",
    inserted: "",
    updated: "",
    resultMap: "",
    ViewName: ViewName
  }

}