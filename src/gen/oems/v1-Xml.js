function setCtrl(items, self) {
    let camelCase = self.camelCase;
    let item = items[0];
    let openPlayLoad= self.openPlayLoad(items);
    //console.log("self.insertTabledobj-", self.insertTabledobj);
    let sample = camelCase(self.sample);
    let Sample = sample.capitalizeFirstLetter();
    let SampleLg = sample.toUpperCase();
    let SampleSmIdxUcfirst = sample.capitalizeFirstLetter();
    let SampleSm = sample.toLowerCase();
    let codedirTitle = self.servicename;
    let codedir = self.codedir.replacecHipon();
    let SampleUrl = self.codedir.replacecUrl();
    let reguserfd = self.reguserfd;
    let edituserfd = self.edituserfd;
    let basicPath = self.basicPath;
    //console.log(self.useyn);
    let useyn = openPlayLoad.useyn;
    let delyn = openPlayLoad.delyn;

    let ControllerDataTypeName = self.ControllerDataTypeName;

    let whereIdx = openPlayLoad.whereIdx
    let table_name = "";
    let table_name2 = "";
    if(self.insertTabledobj.length > 0)
        table_name = self.schema + "." + self.insertTabledobj[0].table_name;
    if(self.updateTabledobj.length > 0)
        table_name2 = self.schema + "." + self.updateTabledobj[0].table_name;
    let join_table_name = self.getJoins();
    if (self.joins.length > 0) {
    } else {
        join_table_name = table_name + " " + self.tablename;
    }

    let selectedmod = self.selectedObj.map(function (e, index) {
        if (e.data_type === 'timestamp' || e.data_type === 'TIMESTAMP' || e.data_type === 'date' || e.data_type === 'DATE') {
            return "\n\t\t\t\t TO_CHAR(" + e.table_name + "." + e.column_name + ",'YYYY-MM-DD')\t\t\t\t AS\t\t" + e.column_name;
        } else {
            return "\n\t\t\t\t " + e.table_name + "." + e.column_name + "\t\t\t\t AS " + e.column_name;
        }
    });
    let insertedcolumn = self.insertTabledobj.map(
        e => "\n\t\t\t" + e.column_name
    );
    let searchConditionItem = "\t\t\t";
    if(self.insertTabledobj.length > 0)
        self.insertTabledobj.forEach((post, i) => {
            let camelizesUpdateVal = camelCase(post.column_name.toLowerCase());
            let TP = self.dataTypeinitTuTb(post.data_type);

            searchConditionItem += '<if test=\'' + camelizesUpdateVal + ' != ' + TP + '\'> AND';
            searchConditionItem += ' ' + post.table_name + "." + post.column_name + ' like \'%\'||#{' + camelizesUpdateVal + '}||\'%\'';
            searchConditionItem += '</if>';
            searchConditionItem += "\r\n\t\t\t";

        });

    let searchConditionMapper = searchConditionItem;

    // let inserted = self.insertTabledobj.map(
    //   e => "\n\t\t\t#{" + camelCase(e.column_name) + "}"
    // );
    var inserted = self.insertTabledobj.map(function (obj) {
        if (obj.column_name === 'SN' || obj.column_name === 'sn')
            return "\n\t\t\t(" +
                "\n\t\t\t\tSELECT" +
                "\n\t\t\t\t\t+COALESCE(MAX(SN), 0) + 1" +
                "\n\t\t\t\tFROM" +
                "\n\t\t\t\t\t" + table_name +
                "\n\t\t\t)";
        else if (obj.column_name === 'frst_regist_dt' || obj.column_name === 'FRST_REGIST_DT'
            || obj.column_name === 'last_updt_dt' || obj.column_name === 'LAST_UPDT_DT')
            return "\n\t\t\tCURRENT_TIMESTAMP";
        else
            return "\n\t\t\t#{" + camelCase(obj.column_name) + "}";
    });
    let lengthUpdateTabledobj = self.updateTabledobj.length
    let updated = self.updateTabledobj.map(function (e) {
        if (e.column_name !== 'frst_register_id' && e.column_name !== 'FRST_REGISTER_ID'
            && e.column_name !== 'frst_regist_dt' && e.column_name !== 'FRST_REGIST_DT') {
            if (e.data_type === 'timestamp' || e.data_type === 'TIMESTAMP' || e.data_type === 'date' || e.data_type === 'DATE') {
                return "\n\t\t\t<if test='" + camelCase(e.column_name) + " != null and " + camelCase(e.column_name) + " != \"\"'>" +
                    "\n\t\t\t\t, " + e.column_name + " = CURRENT_TIMESTAMP" +
                    "\n\t\t\t</if>";
            } else {
                return "\n\t\t\t<if test='" + camelCase(e.column_name) + " != null and " + camelCase(e.column_name) + " != \"\"'>" +
                    "\n\t\t\t\t, " + e.column_name + " = #{" + camelCase(e.column_name) + "}" +
                    "\n\t\t\t</if>";
            }
        } else {

        }

    }).join(" ");

    let resultMap = self.selectedObj
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
    if (self.db === "pgsql")
        pagingHtml = '<include refid="common.pageSql" />';
    let vHtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="${Sample}Manage">

	<resultMap id="${Sample}Manage" type="${basicPath}.${codedir}.service.${Sample}VO">
		${resultMap}
	</resultMap>

	<select id="select${Sample}Detail" resultMap="${Sample}Manage">
			<![CDATA[
			SELECT ${selectedmod}
			FROM ${join_table_name}
			WHERE ${whereIdx}
			AND ${useyn}
			]]>
	</select>

	<select id="select${Sample}List" parameterType="${basicPath}.${codedir}.service.${Sample}VO" resultMap="${Sample}Manage">
		<![CDATA[
			SELECT${selectedmod}
			FROM	${join_table_name}
			WHERE	1=1
			AND ${useyn}
			]]>
${searchConditionMapper}
		<![CDATA[
			ORDER	BY 1
    ]]>
      ${pagingHtml}
	</select>

	<select id="select${Sample}ListAll" parameterType="${basicPath}.${codedir}.service.${Sample}VO" resultMap="${Sample}Manage">
		<![CDATA[
			SELECT ${selectedmod}
			FROM ${join_table_name}
			WHERE	1=1
			ORDER	BY 1
		]]>
	</select>

	<select id="select${Sample}ListCnt" parameterType="${basicPath}.${codedir}.service.${Sample}VO" resultType="int">
		<![CDATA[
			SELECT 	COUNT(*) totcnt
			FROM 	${join_table_name}
			WHERE 	1=1
			AND ${useyn}
		]]>
${searchConditionMapper}
	</select>

	<insert id="insert${Sample}">

		INSERT INTO ${table_name} (${insertedcolumn}
		) VALUES (${inserted}
		)

	</insert>

	<update id="update${Sample}">

		UPDATE ${table_name2} SET${updated}
 		WHERE  ${whereIdx}

	</update>

	<delete id="delete${Sample}">

			UPDATE	${table_name2}	SET
			${delyn}
 			WHERE  ${whereIdx}

	</delete>

</mapper>`;
    return vHtml;
}

module.exports = {
    getCtrl: setCtrl
}
