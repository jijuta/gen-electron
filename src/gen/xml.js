const setctrl = function(payload) {
    let vHtml = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
    <mapper namespace="${payload.Sample}Manage">
    
        <resultMap id="${payload.Sample}Manage" type="${payload.packagedir}.${payload.codedir}.service.${payload.Sample}VO">
            ${payload.resultMap}		
        </resultMap>
        
        <select id="select${payload.Sample}Detail" resultMap="${payload.Sample}Manage">
                <![CDATA[	
                SELECT ${payload.selectedmod}	 			  			 			  
                FROM ${payload.join_table_name}		
                WHERE ${payload.whereIdx}  				
                ${payload.useyn}
                ]]>  
        </select>
        
        <select id="select${payload.Sample}List" parameterType="${payload.packagedir}.${payload.codedir}.service.${payload.Sample}VO" resultMap="${payload.Sample}Manage">
            <![CDATA[
                SELECT${payload.selectedmod}
                FROM	${payload.join_table_name}                               			
                WHERE	1=1
                ${payload.useyn}
                ]]>  
                ${payload.searchConditionMapper}
            <trim prefix="ORDER	BY " prefixOverrides="," suffixOverrides=",">
                <choose>	                    
                    <when test="orderbylist!=null and orderbylist.size!=0">
                        <foreach collection="orderbylist" item="item" index="index" separator=",">
                            <choose>
                                        ${payload.orderByMapper}
                                <otherwise>
                                </otherwise>
                            </choose>
                        </foreach>
                    </when>
                    <otherwise>
                    1 asc
                    </otherwise>
                </choose>
            </trim>
          ${payload.pagingHtml}
        </select>
    
        <select id="select${payload.Sample}ListAll" parameterType="${payload.packagedir}.${payload.codedir}.service.${payload.Sample}VO" resultMap="${payload.Sample}Manage">
            <![CDATA[
                SELECT ${payload.selectedmod}
                FROM ${payload.join_table_name}                               			
                WHERE	1=1   	
                ORDER	BY 1	
            ]]>  
        </select>
        
        <select id="select${payload.Sample}ListCnt" parameterType="${payload.packagedir}.${payload.codedir}.service.${payload.Sample}VO" resultType="int">
            <![CDATA[
                SELECT 	COUNT(1) totcnt
                FROM 	${payload.join_table_name}
                WHERE 	1=1
                ${payload.useyn}
            ]]>  
            ${payload.searchConditionMapper}
        </select>
        
        <insert id="insert${payload.Sample}">	
                
            INSERT INTO ${payload.table_name} (${payload.insertedcolumn}
            ) VALUES (${payload.inserted}
            )
            
        </insert>
    
        <update id="update${payload.Sample}">
            
            UPDATE ${payload.table_name} SET${payload.updated}
            WHERE  ${payload.whereIdx} 
            
        </update>
        
        <delete id="delete${payload.Sample}">
            
                UPDATE	${payload.table_name}	SET
                ${payload.delyn}
                WHERE  ${payload.whereIdx} 
            
        </delete>
        
    </mapper>`;
          return vHtml;
}

module.exports = {
    getCtrl : setctrl
};