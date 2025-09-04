function toCamelCase(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}
const setMapperXml = function (payload) {
    let vHtml = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
    <mapper namespace="${payload.packagedir}.${payload.codedir}.${payload.SampleSm}.${payload.Sample}DAO">
        <select id="select${payload.Sample}List" resultType="${payload.packagedir}.${payload.codedir}.${payload.SampleSm}.dto.Select${payload.Sample}Response">
            SELECT ${payload.selectedmod} 
            FROM ${payload.tb.schemaname}.${payload.table_name} T1
            <if test=" sortColumn != '' and sortColumn != null ">
                ORDER BY T1.\${sortColumn} \${sortType} 
            </if>
            <if test=" sortColumn == '' or sortColumn == null ">
                ORDER BY T1.${payload.createTimeStamp} DESC
            </if>
            LIMIT #{skip}, #{size}
        </select>

        <select id="select${payload.Sample}" resultType="${payload.packagedir}.${payload.codedir}.${payload.SampleSm}.dto.Select${payload.Sample}Response">
            SELECT ${payload.selectedmod} 
            FROM ${payload.tb.schemaname}.${payload.table_name} T1 
            WHERE ${payload.whereIdx} 
        </select>

        <select id="search${payload.Sample}" resultType="${payload.packagedir}.${payload.codedir}.${payload.SampleSm}.dto.Select${payload.Sample}Response">
            SELECT ${payload.selectedmod} 
            FROM ${payload.tb.schemaname}.${payload.table_name} T1 
            WHERE TRUE ${payload.searchConditionMapper}
            <if test=" sortColumn != '' and sortColumn != null ">
                ORDER BY T1.\${sortColumn} \${sortType} 
            </if>
            <if test=" sortColumn == '' or sortColumn == null ">
            ORDER BY T1.${payload.createTimeStamp} DESC
            </if>
            LIMIT #{skip}, #{size}
        </select>

        <insert id="insert${payload.Sample}">
            INSERT INTO ${payload.tb.schemaname}.${payload.table_name} (
            ${payload.createTimeStamp},
            ${payload.updateTimeStamp},
`+
``
/*
`
            ${payload.createUserId},
            ${payload.updateUserId},
`
*/            
+`
            ${payload.insertedcolumn}
                ) VALUES (
            SYSDATE(),
            SYSDATE(),
`+
``
/*
`
            "admin",
            "admin",
`
*/            
+`
            ${payload.inserted}
            
                )
        </insert>

        <update id="update${payload.Sample}">
            UPDATE ${payload.tb.schemaname}.${payload.table_name} 
            SET
            ${payload.updateTimeStamp} = SYSDATE()
`+``
/*
`
            ${payload.updateUserId} = "admin"
`
*/            
+`
            ${payload.updated}
            WHERE  ${payload.whereIdx}
        </update>

        <delete id="delete${payload.Sample}">
            DELETE FROM	${payload.tb.schemaname}.${payload.table_name}
            WHERE  ${payload.whereIdx} 
        </delete>

        <delete id="delete${payload.Sample}s" >
            DELETE FROM	${payload.tb.schemaname}.${payload.table_name}
            WHERE   (
                ${payload.pkObjList.map(elem=>(
                `${elem.column_name}
                `)).join(",")
            }) in 
			<foreach collection="list" item="item" open="(" close=")" separator=",">
                    (
                ${payload.pkObjList.map(elem=>(
                `#{item.${toCamelCase(elem.column_name)}}
                `)).join(",")})
			</foreach>
        </delete>

        <delete id="toggleUsing${payload.Sample}s">
            UPDATE ${payload.tb.schemaname}.${payload.table_name} 
            SET ${payload.useAtColumn}=IF(${payload.useAtColumn}='Y','N','Y')
            WHERE   (
                ${payload.pkObjList.map(elem=>(
                `${elem.column_name}
                `)).join(",")
            }) in 
			<foreach collection="list" item="item" open="(" close=")" separator=",">
                    (
                ${payload.pkObjList.map(elem=>(
                `#{item.${toCamelCase(elem.column_name)}}
                `)).join(",")})
			</foreach>
        </delete>

        <select id="count" resultType="int">
            SELECT count(*)
            FROM ${payload.tb.schemaname}.${payload.table_name} T1 
        </select>

        <select id="countSearch" resultType="int">
            SELECT count(*)
            FROM ${payload.tb.schemaname}.${payload.table_name} T1 
            WHERE TRUE ${payload.searchConditionMapper}
        </select>

    </mapper>`;

    return vHtml;
}


export default{ getMapperXml : setMapperXml};
