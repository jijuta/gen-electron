<template>
  <q-page class>
    <div q-card class="my-card">
      <!-- 기본정보 -->
      <div class="row pt-10">
        <div class="col-3">
          <q-input
            bottom-slots
            outlined
            v-model="config.projectdir"
            label="전자정부루트"
            dense="dense"
          >
            <template v-slot:append>
              <q-btn round dense flat icon="search" @click="selectDirectory" />
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="save" @click="selectDirectorySave" />
            </template>
          </q-input>
        </div>
        <div class="col-3">
          <q-input outlined v-model="config.packagenm" label="페키지폴더" :dense="true" />
        </div>
        <div class="col-3">
          <q-input outlined v-model="config.packagedir" label="페키지" :dense="true" />
        </div>
        <div class="col-3">
          <q-input
            outlined
            v-model="codedir"
            label="디렉토리(mei_saesol_test)"
            :dense="true"
          />
        </div>
        <div class="col-3">
          <q-input
            outlined
            v-model="sample"
            label="클래스명(첫글자 대문자)"
            :dense="true"
          />
        </div>
        <div class="col-3">
          <q-input
            outlined
            v-model="servicename"
            label="서비스명(News, Freeboard)"
            :dense="true"
          />
        </div>
        <div class="col-3">
          <q-input
            outlined
            v-model="servicelocation"
            label="서비스 부제목"
            :dense="true"
          />
        </div>
        <div class="col-3">
          <q-input outlined v-model="servicedocs" label="서비스 설명" :dense="true" />
        </div>
        <div class="col-3">
          <q-select
            outlined
            v-model="useyn"
            multiple
            :options="columns"
            option-value="column_name"
            option-label="column_name"
            label="사용여부키"
            :dense="true"
          />
        </div>
        <div class="col-3">
          <q-select
            outlined
            v-model="delyn"
            multiple
            :options="columns"
            option-value="column_name"
            option-label="column_name"
            label="삭제여부키"
            :dense="true"
          />
        </div>

        <!--div class="col-4">
          <q-select
            outlined
            v-model="PriKeyNm"
            multiple
            :options="columns"
            option-value="column_name"
            option-label="column_name"
            label="기본키"
            :dense="true"
          />
        </div>
        <div class="col-4">
          <q-select
            outlined
            v-model="ControllerDataTypeName"
            multiple
            :options="columns"
            option-value="data_type"
            option-label="data_type"
            label="기본키타입"
            :dense="true"
          />
        </div-->
        <div class="col-3">
          <q-select
            outlined
            filled
            v-model="reguserfd"
            :options="columns"
            option-value="column_name"
            option-label="column_name"
            label="등록자"
            class="pb-10"
            :dense="true"
          />
        </div>
        <div class="col-3">
          <q-select
            outlined
            filled
            v-model="edituserfd"
            :options="columns"
            option-value="column_name"
            option-label="column_name"
            label="수정자"
            class="pb-10"
            :dense="true"
          />
        </div>
        <div class="col-3">
          <q-input outlined v-model="loginVo" label="LoginVO" :dense="true" />
        </div>
        <div class="col-3">
          <q-input outlined v-model="loginVoFnc" label="LoginVo Fnc" :dense="true" />
        </div>
        <div class="col-3">
          <q-input outlined v-model="loginVoId" label="loginVo Id" :dense="true" />
        </div>
        <div class="col-3">
          <q-input outlined v-model="useynfnc" label="사용여부조건" :dense="true" />
        </div>
        <div class="col-3">
          <q-input outlined v-model="delynfnc" label="삭제여부조건" :dense="true" />
        </div>
        <div class="col-3">
          <q-input outlined v-model="serviceEtc1" label="참고1" :dense="true" />
        </div>
        <div class="col-3">
          <q-input outlined v-model="serviceEtc2" label="참고2" :dense="true" />
        </div>
        <div class="col-3">
          <q-input outlined v-model="serviceEtc3" label="참고3" :dense="true" />
        </div>
      </div>
      <!-- 설정 탭 메뉴-->
      <div class="row" v-if="codedir && db">
        <div class="col-12">
          <q-tabs
            v-model="tab"
            :dense="true"
            class="bg-primary text-white"
            active-color="text-white"
            indicator-color="info"
            align="justify"
            narrow-indicator
          >
            <q-tab name="models2" label="모델설정2" />
            <q-tab name="models" label="모델설정" />
            <q-tab name="join" label="관계설정" />
            <q-tab name="priname" label="기본키" />
            <q-tab name="table" label="조회설정" />
            <q-tab name="search" label="검색설정" />
            <q-tab name="insert" label="입력설정" />
            <q-tab name="notnull" label="입력필수" />
            <q-tab name="update" label="수정설정" />
            <q-tab name="notnulledit" label="수정필수" />
            <q-tab name="source" label="소스" />
            <q-tab name="add" label="컬럼 추가/삭제" />
            <q-tab name="order" label="순서조정" />
          </q-tabs>
          <!-- 설정 탭 상세 -->
          <q-tab-panels v-model="tab" animated>
            <!-- 모델설정2-->
            <q-tab-panel name="models2">
              <div class="row">
                <pre>
                    {{ payload }}
                </pre>
                <div class="col-4" v-for="(item, key) in selectedtables" :key="key">
                  <q-table
                    :title="item.table"
                    :data="item.filds"
                    selection="multiple"
                    :selected.sync="columns"
                    :pagination.sync="pagination"
                    :columns="table_cols"
                    row-key="column_name"
                  />
                </div>
              </div>
              <div class="row" style="display: none">
                <q-card style="width: 298px; display: none" class="my-card">
                  <q-card-section class="bg-primary text-white">
                    <pre>{{ columns }} {{ filterColumns }}</pre>
                  </q-card-section>
                </q-card>
                <q-card
                  style="width: 298px"
                  class="my-card"
                  v-for="(item, key) in selectedtables"
                  :key="key"
                >
                  <q-card-actions>
                    <q-btn flat>{{ item.table }}</q-btn>
                    <q-btn flat>삭제</q-btn>
                  </q-card-actions>
                  <q-card-section class="bg-primary text-white">
                    <div class="text-subtitle2">
                      <ul style="padding: 0; margin: 0">
                        <li
                          style="list-style: none; font-size: 12px"
                          v-for="(row, key) in item.filds"
                          :key="key"
                        >
                          <q-checkbox
                            v-model="columns"
                            :label="row.column_name + ' , ' + row.column_comment"
                            :val="item.table + '.' + row.column_name"
                          />
                        </li>
                      </ul>
                    </div>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions>
                    <q-btn flat v-on:click="tableinfo(item)">조회</q-btn>
                    <q-btn flat>삭제</q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>
            <!-- 모델설정-->
            <q-tab-panel name="models">
              <div class="row">
                <div class="col-4" v-for="(item, key) in selectedtables" :key="key">
                  <q-table
                    :title="item.table"
                    :data="item.filds"
                    selection="multiple"
                    :selected.sync="columns"
                    :pagination.sync="pagination"
                    :columns="table_cols"
                    row-key="column_name"
                  />
                </div>
              </div>
            </q-tab-panel>
            <!-- 관계설정-->
            <q-tab-panel name="join">
              <div>
                <div class="row">
                  <div class="col-12">
                    <q-card v-if="joins" @dragover.prevent @drop="drop" id="target">
                      <q-card-section>{{ joins.join(" ") }}</q-card-section>
                    </q-card>
                  </div>
                  <div class="col-6">
                    <q-btn
                      label="조인조건 추가"
                      color="primary"
                      @click="setJoins()"
                      style="width: 100%"
                    />
                  </div>
                  <div class="col-6">
                    <q-btn
                      label="조인조건 초기화"
                      color="purple"
                      @click="resetJoins()"
                      style="width: 100%"
                    />
                  </div>
                  <div class="col-4">
                    <q-select
                      outlined
                      v-model="joinact"
                      :options="joinactArray"
                      option-value="name"
                      option-label="name"
                      label="조인타입"
                      class="pb-10"
                    />
                  </div>

                  <div class="col-4">
                    <q-select
                      outlined
                      v-model="joinTables1"
                      :options="insertTables"
                      label="조인테이블1"
                      class="pb-10"
                    />
                  </div>

                  <div class="col-4">
                    <q-select
                      outlined
                      v-model="joinTables2"
                      :options="insertTables"
                      label="조인테이블2"
                      class="pb-10"
                    />
                  </div>

                  <!--div-- class="col-4">
                  <q-select
                    outlined
                    v-model="joinTables3"
                    :options="insertTables"
                    label="조인테이블3"
                    class="pb-10"
                  />
                  </!--div-->
                  <div class="col-4"></div>
                  <div class="col-4" v-if="joinTables1 && joinTables2">
                    <q-input outlined v-model="joins1" label="조인조건1" class="pb-10" />
                  </div>
                  <div class="col-4" v-if="joinTables1 && joinTables2">
                    <q-input outlined v-model="joins2" label="조인조건2" class="pb-10" />
                  </div>
                  <!--div-- class="col-4" v-if="joinTables1 && joinTables2 && joinTables3">
                  <q-input outlined v-model="joins3" label="조인조건3" class="pb-10" />
                  </!--div-->
                </div>
              </div>
              <div class="row" v-if="joinTables1 && joinTables2">
                <div class="col-4"></div>
                <div
                  class="col-4"
                  v-for="(item, key) in selectedtables"
                  :key="key"
                >
                  <q-item>
                    <q-item-section>
                      <q-item-label
                        lines="1"
                        draggable="true"
                        @dragstart="dragstart_handler"
                      >
                        <ul style="padding: 0; margin: 0">
                          <li
                            draggable="true"
                            @dragstart="dragstart_handler"
                            style="list-style: none"
                            v-for="(row, key2) in item.filds"
                            :key="key2"
                          >
                            {{ item.table + "." + row.column_name }}
                          </li>
                        </ul>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </div>
            </q-tab-panel>
            <!-- 기본키설정-->
            <q-tab-panel name="priname">
              <q-table
                :data="columns"
                selection="multiple"
                :selected.sync="prinameobj"
                :pagination.sync="pagination"
                :columns="table_cols"
                row-key="column_name"
              />
            </q-tab-panel>
            <!-- 조회설정-->
            <q-tab-panel name="table">
              <q-table
                :data="columns"
                selection="multiple"
                :selected.sync="selectedObj"
                :pagination.sync="pagination"
                :columns="table_cols"
                row-key="column_name"
              />
              <q-input outlined v-model="roottable" label="조회트테이블" class="pb-10" />
              <q-input outlined v-model="selected2" label="조회트컬럼" class="pb-10" />
              <q-input
                outlined
                v-model="selectedname"
                label="조회코멘트명"
                class="pb-10"
              />
              <q-input outlined v-model="datatype" label="조회데이터타입" class="pb-10" />
              <!--
            <div v-if="insertTable">
              <span v-for="(item, key) in insertTableed" :key="key">
                <q-input filled :label="item+' 인서트컬럼'" />
              </span>
            </div>
              -->
            </q-tab-panel>
            <!-- 검색설정-->
            <q-tab-panel name="search">
              <q-table
                :data="columns"
                selection="multiple"
                :selected.sync="selectedSearchobj"
                :pagination.sync="pagination"
                :columns="table_cols"
                row-key="column_name"
              />
              <q-input
                outlined
                v-model="selectedSearchString"
                label="검색필드"
                class="pb-10"
              />
              <q-input
                outlined
                v-model="datatypeSearchString"
                label="검색타입"
                class="pb-10"
              />
              <pre>
                {{ selectedSearchobj }}
              </pre>
            </q-tab-panel>
            <!-- 수정설정-->
            <q-tab-panel name="update">
              <div style="margin-bottom: 10px">
                <span
                  style="margin-right: 10px"
                  v-for="(item, key) in selectedtables"
                  :key="key"
                >
                  <q-btn
                    color="primary"
                    :label="item.table"
                    @click="setUpdateTable(item)"
                  />
                </span>
              </div>
              <div v-if="updateTabled">
                <q-table
                  :data="updateTabled"
                  selection="multiple"
                  :selected.sync="updateTabledobj"
                  :pagination.sync="pagination"
                  :columns="table_cols"
                  row-key="column_name"
                />
              </div>

              <!--q-select
              outlined
              filled
              v-model="insertTable"
              :options="insertTables"
              option-value="column_name"
              option-label="column_name"
              label="인서트테이블"
              class="pb-10"
              /-->
            </q-tab-panel>
            <!-- 수정 필수값-->
            <q-tab-panel name="notnulledit">
              <q-table
                :data="columns"
                selection="multiple"
                :selected.sync="selectedNotNullsEditobj"
                :pagination.sync="pagination"
                :columns="table_cols"
                row-key="column_name"
              />
            </q-tab-panel>
            <!-- 입력설정-->
            <q-tab-panel name="insert">
              <div style="margin-bottom: 10px">
                <span
                  style="margin-right: 10px"
                  v-for="(item, key) in selectedtables"
                  :key="key"
                >
                  <q-btn
                    color="primary"
                    :label="item.table"
                    @click="setInsertTable(item)"
                  />
                </span>
              </div>
              <div v-if="insertTabled">
                <q-table
                  :data="insertTabled"
                  selection="multiple"
                  :selected.sync="insertTabledobj"
                  :pagination.sync="pagination"
                  :columns="table_cols"
                  row-key="column_name"
                />
              </div>

              <!--q-select
              outlined
              filled
              v-model="insertTable"
              :options="insertTables"
              option-value="column_name"
              option-label="column_name"
              label="인서트테이블"
              class="pb-10"
              /-->
            </q-tab-panel>
            <!-- 입력 필수값-->
            <q-tab-panel name="notnull">
              <q-table
                :data="columns"
                selection="multiple"
                :selected.sync="selectedNotNullsobj"
                :pagination.sync="pagination"
                :columns="table_cols"
                row-key="column_name"
              />
            </q-tab-panel>
            <!-- 소스-->
            <q-tab-panel name="source">
              <q-splitter v-model="splitterModel" v-if="columns.length > 0">
                <!-- 소스버튼 -->
                <template v-slot:before>
                  <q-tabs v-model="tabsource" vertical style="width: auto">
                    <q-tab name="woori" label="woori" />
                    <q-tab name="json" label="Json" />
                    <q-tab name="open" label="파일열기" />
                  </q-tabs>
                </template>
                <!-- 소스에디터 -->
                <template v-slot:after>
                  <q-tab-panels
                    v-model="tabsource"
                    animated
                    transition-prev="jump-up"
                    transition-next="jump-up"
                  >
                    <q-tab-panel name="woori">
                      <!-- VO -->
                      <monaco-editors
                        :config="config"
                        title="Controller"
                        :sample="sample + 'Controller'"
                        ext="java"
                        type="controller"
                        :vhtml="setController(columns)"
                      ></monaco-editors>
                      <!-- Service -->
                      <!-- VO -->
                      <monaco-editors
                        :config="config"
                        title="VO"
                        :sample="sample + 'VO'"
                        ext="java"
                        type="vo"
                        :vhtml="getset(columns)"
                      ></monaco-editors>
                      <!-- Service -->
                      <monaco-editors
                        :config="config"
                        title="Service"
                        :sample="sample + 'Service'"
                        ext="java"
                        type="service"
                        :vhtml="setService(columns)"
                      ></monaco-editors>
                      <!-- DAO -->
                      <monaco-editors
                        :config="config"
                        title="DAO"
                        :sample="sample + 'DAO'"
                        ext="java"
                        type="dao"
                        :vhtml="setDao(columns)"
                      ></monaco-editors>
                      <!-- ServiceImpl -->
                      <monaco-editors
                        :config="config"
                        title="ServiceImpl"
                        :sample="sample + 'ServiceImpl'"
                        ext="java"
                        type="impl"
                        :vhtml="setImpl(columns)"
                      ></monaco-editors>
                      <!-- Mapper -->
                      <monaco-editors
                        :config="config"
                        title="xml"
                        :sample="sample + '_SQL_' + db"
                        ext="xml"
                        type="xml"
                        :vhtml="setXml(columns)"
                      ></monaco-editors>
                      <!-- Jsp2 List -->
                      <monaco-editors
                        :config="config"
                        title="jsp-list-2"
                        :sample="sample + 'List2'"
                        ext="jsp"
                        type="jsp"
                        :vhtml="setJsplist2(columns)"
                      ></monaco-editors>
                      <!-- Jsp1 List -->
                      <monaco-editors
                        :config="config"
                        title="jsp-list-1"
                        :sample="sample + 'List'"
                        ext="jsp"
                        type="jsp"
                        :vhtml="setJsplist(columns)"
                      ></monaco-editors>
                      <!-- Js -->
                      <monaco-editors
                        :config="config"
                        title="vue-js"
                        :sample="sample + 'Js'"
                        ext="js"
                        type="js"
                        :vhtml="setJs(columns)"
                      ></monaco-editors>
                      <!-- Js AG-grid 버전 추가-->
                      <monaco-editors
                        :config="config"
                        title="vue-ag-grid-js"
                        :sample="sample + 'AgGridJs'"
                        ext="js"
                        type="js"
                        :vhtml="setAgGridJs(columns)"
                      ></monaco-editors>
                      <!-- Jsp Ag-grid -->
                      <monaco-editors
                        :config="config"
                        title="jsp-ag-grid"
                        :sample="sample + 'AgGrid'"
                        ext="jsp"
                        type="jsp"
                        :vhtml="setJspAgGrid(columns)"
                      ></monaco-editors>
                      <!-- Jsp Detail -->
                      <monaco-editors
                        :config="config"
                        title="jsp-detail"
                        :sample="sample + 'Detail'"
                        ext="jsp"
                        type="jsp"
                        :vhtml="setJspdetail(columns)"
                      ></monaco-editors>
                      <!-- Jsp add -->
                      <monaco-editors
                        :config="config"
                        title="jsp-add"
                        :sample="sample + 'Regist'"
                        ext="jsp"
                        type="jsp"
                        :vhtml="setJspadd(columns)"
                      ></monaco-editors>
                      <!-- Jsp update -->
                      <monaco-editors
                        :config="config"
                        title="jsp-update"
                        :sample="sample + 'Updt'"
                        ext="jsp"
                        type="jsp"
                        :vhtml="setJspupdate(columns)"
                      ></monaco-editors>
                      <!-- Jsp total -->
                      <monaco-editors
                        :config="config"
                        title="jsp-total"
                        :sample="sample + 'Total'"
                        ext="jsp"
                        type="jsp"
                        :vhtml="setJsptotal(columns)"
                      ></monaco-editors>
                    </q-tab-panel>
                    <q-tab-panel name="json">
                      <div
                        style="
                          padding: 10px;
                          width: 800px;
                          height: 540px;
                          over-flow: auto;
                        "
                      >
                        <pre>{{ setJson(columns) }}</pre>
                      </div>
                    </q-tab-panel>
                    <q-tab-panel name="open">
                      <MonacoEditor
                        class="editor"
                        :value="textAreaValue"
                        language="java"
                        style="width: 800px; height: 640px"
                      />
                    </q-tab-panel>
                  </q-tab-panels>
                </template>
              </q-splitter>
              <q-banner v-else inline-actions class="text-white bg-red">
                테이블을 선택 및 모델설정 후 사용 가능 합니다.
                <template v-slot:action>
                  <q-btn flat color="white" label="ON" />
                </template>
              </q-banner>
            </q-tab-panel>
            <!-- 컬럼추가-->
            <q-tab-panel name="add">
              <div class="row">
                <div
                  class="col-12"
                  v-for="(item, key, index) in selectedtables"
                  :key="key"
                >
                  <table>
                    <tr></tr>
                  </table>

                  <q-table
                    :title="item.table"
                    :data="item.filds"
                    selection="multiple"
                    :selected.sync="columns"
                    :pagination.sync="pagination"
                    :columns="table_cols"
                    :filter="filter"
                    row-key="column_name"
                  >
                    <template v-slot:top>
                      <q-btn
                        color="primary"
                        :disable="loading"
                        label="Add row"
                        @click="addRow(item, key, index)"
                      />
                      <q-btn
                        class="q-ml-sm"
                        color="primary"
                        :disable="loading"
                        label="Remove row"
                        @click="removeRow"
                      />
                      <q-space />
                      <q-input
                        borderless
                        dense
                        debounce="300"
                        color="primary"
                        v-model="filter"
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                  </q-table>
                </div>
              </div>
              <q-input outlined v-model="inserted" label="조회VO" class="pb-10" />
              <q-input outlined v-model="datatype" label="조회VO타입" class="pb-10" />
            </q-tab-panel>
            <!-- 순서조정-->
            <q-tab-panel name="order">
              <div class="row">
                <!-- 컬럼순서조정 -->
                <div class="col-sm-3">
                  <q-card class="my-card">
                    <q-card-section>
                      <div class="text-subtitle2">모델</div>
                    </q-card-section>
                    <q-card-section>
                      <draggable
                        class="dragArea list-group"
                        v-model="columns"
                        @start="drag = true"
                        @end="drag = false"
                        :group="{ name: 'people', pull: 'clone', put: false }"
                      >
                        <div
                          class="list-group-item"
                          v-for="item in columns"
                          :key="item.column_name"
                        >
                          {{ item.column_comment }}
                        </div>
                        <div
                          slot="footer"
                          class="btn-group list-group-item"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button class="btn btn-secondary" @click="replace('columns')">
                            Replace
                          </button>
                        </div>
                      </draggable>
                    </q-card-section>
                  </q-card>
                </div>
                <!-- 조회순서조정-->
                <div class="col-sm-3">
                  <q-card class="my-card">
                    <q-card-section>
                      <div class="text-subtitle2">조회순서조정</div>
                    </q-card-section>
                    <q-card-section>
                      <draggable
                        class="dragArea list-group"
                        v-model="selectedObj"
                        @start="drag = true"
                        @end="drag = false"
                        :group="{ name: 'people', pull: 'clone', put: false }"
                      >
                        <div
                          class="list-group-item"
                          v-for="item in selectedObj"
                          :key="item.column_name"
                        >
                          {{ item.column_comment }}
                        </div>
                        <div
                          slot="footer"
                          class="btn-group list-group-item"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            class="btn btn-secondary"
                            @click="replace('selectedObj')"
                          >
                            초기화
                          </button>
                        </div>
                      </draggable>
                    </q-card-section>
                  </q-card>
                </div>
                <!-- 검색순서조정-->
                <div class="col-sm-3">
                  <q-card class="my-card">
                    <q-card-section>
                      <div class="text-subtitle2">검색순서조정</div>
                    </q-card-section>
                    <q-card-section>
                      <draggable
                        class="dragArea list-group"
                        v-model="selectedSearchobj"
                        @start="drag = true"
                        @end="drag = false"
                        :group="{ name: 'people', pull: 'clone', put: false }"
                      >
                        <div
                          class="list-group-item"
                          v-for="item in selectedSearchobj"
                          :key="item.column_name"
                        >
                          {{ item.column_comment }}
                        </div>
                        <div
                          slot="footer"
                          class="btn-group list-group-item"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            class="btn btn-secondary"
                            @click="replace('selectedSearchobj')"
                          >
                            초기화
                          </button>
                        </div>
                      </draggable>
                    </q-card-section>
                  </q-card>
                </div>
                <!-- 입력순서조정-->
                <div class="col-sm-3">
                  <q-card class="my-card">
                    <q-card-section>
                      <div class="text-subtitle2">입력순서조정</div>
                    </q-card-section>
                    <q-card-section>
                      <draggable
                        class="dragArea list-group"
                        v-model="insertTabledobj"
                        @start="drag = true"
                        @end="drag = false"
                        :group="{ name: 'people', pull: 'clone', put: false }"
                      >
                        <div
                          class="list-group-item"
                          v-for="item in insertTabledobj"
                          :key="item.column_name"
                        >
                          {{ item.column_comment }}
                        </div>
                        <div
                          slot="footer"
                          class="btn-group list-group-item"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            class="btn btn-secondary"
                            @click="replace('insertTabledobj')"
                          >
                            초기화
                          </button>
                        </div>
                      </draggable>
                    </q-card-section>
                  </q-card>
                </div>
                <!-- 수정순서조정-->
                <div class="col-sm-3">
                  <q-card class="my-card">
                    <q-card-section>
                      <div class="text-subtitle2">수정순서조정</div>
                    </q-card-section>
                    <q-card-section>
                      <draggable
                        class="dragArea list-group"
                        v-model="updateTabledobj"
                        @start="drag = true"
                        @end="drag = false"
                        :group="{ name: 'people', pull: 'clone', put: false }"
                      >
                        <div
                          class="list-group-item"
                          v-for="item in updateTabledobj"
                          :key="item.column_name"
                        >
                          {{ item.column_comment }}
                        </div>
                        <div
                          slot="footer"
                          class="btn-group list-group-item"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            class="btn btn-secondary"
                            @click="replace('updateTabledobj')"
                          >
                            초기화
                          </button>
                        </div>
                      </draggable>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
      <q-banner v-else inline-actions class="text-white bg-red">
        상단에 데이타 베이스를 선택 하고, 디렉토리 입력란에 값을 입력 하세요
        <template v-slot:action>
          <q-btn flat color="white" label="ON" />
        </template>
      </q-banner>
    </div>
  </q-page>
</template>

<script>
//let remote,dialog;
const remote = require("electron").remote;
const { dialog } = require("electron").remote;
//import mysql from "mysql";
import * as fs from "fs";
import shell from "shelljs";
//import { AgGridVue } from "ag-grid-vue";
import { Diagram } from "vue-diagrams";
import "whatwg-fetch";
import { constants } from "fs";
//import MonacoEditor from 'monaco-editor-vue';
import MonacoEditor from "vue-monaco";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import basicConfig from "../components/basic-config";
import monacoEditors from "../components/monaco-editors";
import draggable from "vuedraggable";
import setSaveFile from "../gen/utils/index";
export default {
  name: "PageIndex",
  components: {
    //AgGridVue,
    Diagram,
    MonacoEditor,
    upperFirst,
    camelCase,
    basicConfig,
    draggable,
    monacoEditors,
  },
  data() {
    //const diagramModel = new Diagram.Model();
    //const node1 = diagramModel.addNode("test2", 300, 200);
    //const inPort = node1.addInPort("test");
    //const node2 = diagramModel.addNode("test", 10, 300, 144, 80);
    //const node2OutPort = node2.addOutPort("testOut");

    return {
      filter: "",
      loading: false,
      payload: [],
      form: {
        columns: [],
        selectedObj: [],
        selectedSearchobj: [],
        insertTabledobj: [],
        updateTabledobj: [],
      },
      camelCase: camelCase,
      basicPath: this.packagedir,
      dialog: false,
      dialogTitle: "",
      dialogLan: "java",
      maximizedToggle: true,
      dialogEditorHtml: "",
      config: {
        team: localStorage.getItem("team"),
        version: localStorage.getItem("version"),
        projectdir: localStorage.getItem("projectdir"),
        packagenm: localStorage.getItem("packagenm") || "com.example",
        packagedir: localStorage.getItem("packagedir") || "com.example.app",
        dir_front: localStorage.getItem("dir_front"),
        pDir: "",
        db_type: "",
        dir_java: "",
        dir_vo: "",
        dir_service: "",
        dir_impl: "",
        dir_dao: "",
        dir_web: "",
        dir_controller: "",
        dir_mapper: "",
        dir_xml: "",
        dir_xml_config: "",
        dir_validator: "",
        dir_jsp: "",
        dir_titles: "",
        dir_js: "",
      },
      projectdir: localStorage.getItem("projectdir"),
      packagedir: localStorage.getItem("packagedir"),
      textAreaValue: "",
      date: null,
      codes: "",
      codesOptions: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: false,
        glyphMargin: true,
      },
      joins1: null,
      joins2: null,
      joins3: null,
      joins4: null,
      joins5: null,
      joinTables1: null,
      joinTables2: null,
      joinTables3: null,
      joinTables4: null,
      joinTables5: null,
      data: null,
      panel: "java",
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
      tab: "models",
      tabsource: "vo",
      splitterModel: 20,
      columns: [],
      columnjoins: [],
      columnsSearch: [],
      diagramModel: null,
      model: null,
      gridOptions: null,
      gridOptions2: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      defaultColDef: null,
      rowSelection: null,
      rowData: null,
      tableitems: null,
      tableitem: null,
      codedir: null,
      sample: null,
      servicename: null,
      servicedocs: null,
      servicelocation: null,
      serviceEtc1: null,
      serviceEtc2: null,
      serviceEtc3: null,
      deled: null,
      join1: null,
      join2: null,
      join3: null,
      joins: [],
      joinact: null,
      joinactArray: [
        { name: "LEFT JOIN" },
        { name: "LEFT OUTER JOIN" },
        { name: "INNER JOIN" },
        { name: "RIGHT OUTER JOIN" },
        { name: "RIGHT JOIN" },
        { name: "FULL OUTER JOIN" },
        { name: "CROSS JOIN" },
      ],
      selected: null,
      selectedObj: [],
      selected2: null,
      selected1: null,
      selectedSearchobj: [],
      selectedNotNullsobj: [],
      selectedNotNullsEditobj: [],
      selectedArray: null,
      selectedname: null,
      selectednameArray: null,
      selectedFilds: null,
      inserted: null,
      insertTable: null,
      insertTabled: [],
      insertTabledobj: [],
      insertTables: null,
      insertedArray: null,
      updateed: null,
      updateTable: null,
      updateTabled: [],
      updateTabledobj: [],
      updateTables: null,
      updateedArray: null,
      priname: null,
      priname2: null,
      prinameobj: [],
      PriKeyNm: null,
      useyn: null,
      delyn: null,
      useynfnc: " = 'Y' ",
      delynfnc: " = 'N' ",
      reguserfd: null,
      edituserfd: null,
      loginVo: "LoginVO",
      loginVoId: "loginVO.getId()",
      loginVoFnc: "EgovUserDetailsHelper.getAuthenticatedUser()",
      ControllerDataTypeName: null,
      SampleSmIdx: null,
      roottable: null,
      datatype: null,
      datatypeArray: null,
      datatypeSearch: null,
      datatypeSearchArray: null,
      //mysql: mysql,
      mysql_data_type: {
        YES: "YES",
        NO: "NO",
      },
      connection: null,
      connection2: null,
      inputEmail: "billion21@saesolsoft.co.kr",
      inputPassword: "qwe123!@#",
      msg: "",
      selectedtablesArray: [],
      table_selected: [],
      pagination: {
        sortBy: "name",
        descending: false,
        page: 1,
        rowsPerPage: 100,
        // rowsNumber: xx if getting data from a server
      },
      table_cols: [
        {
          name: "column_name",
          label: "column_name",
          field: (row) => row.column_name,
          align: "center",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "column_comment",
          label: "column_comment",
          field: "column_comment",
          align: "center",
          sortable: true,
        },
        {
          name: "data_type",
          label: "data_type",
          field: "data_type",
          align: "center",
          sortable: true,
        },
        {
          name: "pk_flag",
          label: "pk_flag",
          field: "pk_flag",
          align: "center",
          sortable: true,
        },
        {
          name: "table_comment",
          label: "table_comment",
          field: "table_comment",
          align: "center",
          sortable: true,
        },
        {
          name: "table_name",
          label: "table_name",
          field: "table_name",
          align: "center",
          sortable: true,
        },
        {
          name: "schemaname",
          label: "schemaname",
          field: "schemaname",
          align: "center",
          sortable: true,
        },
        {
          name: "column_default",
          label: "column_default",
          field: "column_default",
          align: "center",
          sortable: true,
        },
        {
          name: "column_key",
          label: "column_key",
          field: "column_key",
          align: "center",
          sortable: true,
        },
        {
          name: "data_length",
          label: "data_length",
          field: "data_length",
          align: "center",
          sortable: true,
        },
        {
          name: "is_nullable",
          label: "is_nullable",
          field: "is_nullable",
          align: "center",
          sortable: true,
        },
        {
          name: "null_flag",
          label: "null_flag",
          field: "null_flag",
          align: "center",
          sortable: true,
        },
        {
          name: "dbtype_name",
          label: "dbtype_name",
          field: "dbtype_name",
          align: "center",
          sortable: true,
        },
      ],
      table_fields: [
        {
          headerName: "dbtype_name",
          field: "dbtype_name",
          label: "dbtype_name",
          sortable: true,
        },
        {
          headerName: "table_comment",
          field: "table_comment",
          label: "table_comment",
          sortable: true,
        },
        {
          headerName: "table_name",
          field: "table_name",
          label: "table_name",
          sortable: true,
        },
        {
          headerName: "column_comment",
          field: "column_comment",
          label: "column_comment",
          sortable: true,
          editable: true,
          pinned: "left",
        },
        {
          headerName: "column_name",
          field: "column_name",
          label: "column_name",
          sortable: true,
          filter: true,
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true,
          pinned: "left",
        },
        {
          headerName: "is_nullable",
          field: "is_nullable",
          label: "is_nullable",
          sortable: true,
          editable: true,
          cellEditor: "select",
          cellEditorParams: { values: extractValues(carMappings) },
          filter: "agSetColumnFilter",
          refData: carMappings,
        },
        {
          headerName: "null_flag",
          field: "null_flag",
          label: "null_flag",
          sortable: true,
        },
        {
          headerName: "column_key",
          field: "column_key",
          label: "column_key",
          sortable: true,
        },
        {
          headerName: "pk_flag",
          field: "pk_flag",
          label: "pk_flag",
          sortable: true,
        },
        {
          headerName: "fk_flage",
          field: "fk_flage",
          label: "fk_flage",
          sortable: true,
        },
        {
          headerName: "data_type",
          field: "data_type",
          label: "data_type",
          sortable: true,
          filter: "agSetColumnFilter",
        },
        {
          headerName: "data_length",
          field: "data_length",
          label: "data_length",
          sortable: true,
        },
        {
          headerName: "column_default",
          field: "column_default",
          label: "column_default",
          sortable: true,
        },
        { headerName: "extra", field: "extra", label: "extra", sortable: true },
      ],
    };
  },
  props: {
    source: String,
  },
  computed: {
    myList: {
      get() {
        return this.selectedSearchobj;
      },
      set(value) {
        this.selectedSearchobj = value;
      },
    },
    // apiserverurl() {
    //   return this.$store.state.apiserverurl;
    // },
    apiserverurl: {
      // return this.$store.state.apiserverurl;
      get() {
        return this.$store.state.apiserverurl;
      },
      set(value) {
        this.apiserverurl = value;
      },
    },
    dbs() {
      return this.$store.state.dbs;
    },
    db() {
      return this.$store.state.db;
    },
    schemas() {
      return this.$store.state.schemas;
    },
    schema() {
      return this.$store.state.schema;
    },
    tables() {
      return this.$store.state.tables;
    },
    table() {
      return this.$store.state.table;
    },
    items() {
      return this.$store.state.items;
    },
    item() {
      return this.$store.state.item;
    },
    fields() {
      return this.$store.state.fields;
    },
    field() {
      return this.$store.state.field;
    },
    selecteditems() {
      return this.$store.state.selecteditems;
    },
    selectedtables() {
      return this.$store.state.selectedtables;
    },
    codelist() {
      return this.$store.state.codelist;
    },
    loginvolist() {
      return this.$store.state.loginvo;
    },
    rowKey() {
      return this.$store.state.rowKey;
    },
    tablename() {
      return this.$store.state.tablename;
    },
    tablecomment() {
      return this.$store.state.tablecomment;
    },
    insertTableed() {
      return this.insertTable.filter((post, i) => {
        console.log(post);
        return (
          this.selectedtables.findIndex((item, j) => {
            console.log(post, item);
            //console.log(post, item);
            return post === item.table;
          }) === i
        );
      });
      //return this.insertTable;
    },
    menus() {
      return this.$store.state.menus;
    },
    filterMenus() {
      return this.data;
    },
    filteredList2() {
      return this.selectedtables.filter((post) => {
        console.log(post);
        //const node1 = this.diagramModel.addNode(post.table, 10, 300, 144, 80);
        for (let index = 0; index < post.filds.length; index++) {
          const element = post.filds[index];
        }
      });
    },
    filterColumns() {
      var reformattedArray = this.form.columns.map(function (obj) {
        //var rObj = {};
        //rObj[obj.key] = obj.value;
        console.log("reformattedArray1", obj);
        return obj;
      });

      //console.log("reformattedArray", reformattedArray);
      this.$store.commit("updateSelectedItems", this.columns);

      this.insertTables = this.selectedtables.map(
        (e) => e.schema + "." + e.table + " " + e.table
      );
      this.roottable = this.selectedtables
        .map((e) => e.schema + "." + e.table + " " + e.table)
        .join();

      //this.codedir = this.schema + "_" + this.tablename; //this.roottable.replacecomma();
      this.servicename = this.servicename ? this.servicename : this.tablecomment; //this.roottable.replacecomma();
      this.sample = this.sampl
        ? this.sampl
        : this.camelCase(this.tablename).stringFirstUpperCase(); //this.tablename;//this.roottable.replacecomma();
      //this.tableitem = this.data;

      this.selectednameArray = this.columns.map((e) => e.column_comment || e.column_name);
      this.selectedArray = this.columns.map((e) => e.column_name || "없음");
      this.insertedArray = this.columns.map((e) => e.column_name || "없음");
      this.datatypeArray = this.columns.map((e) => e.data_type || "없음");

      this.columnsSearch = this.columns.map((e) => e.column_name);

      this.selected = this.columns.map((e) => e.table_name + "." + e.column_name).join();

      this.selectedname = this.columns
        .map((e) => e.column_comment || e.column_name)
        .join(",");

      this.datatype = this.columns.map((e) => e.data_type).join();

      this.selected2 = this.columns.map((e) => e.table_name + "." + e.column_name).join();

      this.inserted = this.insertedArray.join();

      this.datatype = this.columns.map((e) => e.data_type || "없음").join();
      this.datatypeSearch = this.datatypeSearchString = this.selectedSearchobj
        .map((e) => e.data_type || "없음")
        .join();
      this.selectedSearchString = this.selectedSearchobj
        .map((e) => e.column_name || "없음")
        .join();
      this.getConfig();
      return this.columns;
    },
    filterColumns_bak() {
      /*
      this.$store.commit("updateSelectedItems", this.columns);
      this.columnsSearch = this.columns;
      this.selected2 = this.columns.join();
      let array = [];
      this.columns.filter((post, i) => {
        let r = post.table_name + '' + post.column_name;//split(".");
        //console.log(r[0]);
        array.push(r);
        //return r[0];
      });

      //console.log(array);

      let array2 = array.filter((post, i) => {
        return (
          array.findIndex((item, j) => {
            return post === item;
          }) === i
        );
      });

      //console.log(array2);
      this.insertTables = array2;
      this.roottable = array2.join();

      let array3 = [];
      this.columns.forEach((post, i) => {
        //console.log(post);
        //let rs = post.split(".");
        let r = post.table_name + '' + post.column_name;//rs[1];
        this.selectedtables.forEach((item, j) => {
          item.filds.forEach((item2, k) => {
            if (
              item2.table_name + "." + r ===
              item2.table_name + "." + item2.column_name
            ) {
              //console.log(r, item2.column_name);
              array3.push(item2);
            }
          });
        });
      });

      let array4 = array3.filter((post, i) => {
        return (
          array3.findIndex((item, j) => {
            //console.log(post, item);
            return post.column_name === item.column_name;
          }) === i
        );
      });

      console.log(array4);

      let array5 = [];
      if (this.selected1) {
        let columnsSearch = this.selected1;
        columnsSearch.forEach((post, i) => {
          //console.log(post);
          let rs = post.split(".");
          let r = rs[1];
          this.selectedtables.forEach((item, j) => {
            item.filds.forEach((item2, k) => {
              if (
                item2.table_name + "." + r ===
                item2.table_name + "." + item2.column_name
              ) {
                //console.log(r, item2.column_name);
                array5.push(item2);
              }
            });
          });
        });

        let array6 = array5.filter((post, i) => {
          return (
            array5.findIndex((item, j) => {
              //console.log(post, item);
              return post.column_name === item.column_name;
            }) === i
          );
        });

        console.log("array5array5array6", array6);
        this.datatypeSearch = array6.map(e => e.data_type || "없음").join();
      }

      array4.filter((post, i) => {});
      this.selectedFilds = this.columns;
      //this.selected = this.inserted = this.selected2 = array4.map(e => e.column_name || "없음").join(",");

      this.datatypeArray = array4.map(e => e.data_type || "없음");
      this.selectednameArray = array4.map(
        e => e.column_comment || e.column_name
      );
      this.selectedArray = array4.map(e => e.column_name || "없음");
      this.insertedArray = array4.map(e => e.column_name || "없음");

      this.inserted = this.insertedArray.join();

      this.datatype = array4.map(e => e.data_type || "없음").join();
      this.selectedname = array4
        .map(e => e.column_comment || e.column_name)
        .join(",");

      return this.columns;*/
    },
  },
  beforeMount() {
    this.gridOptions = {};
    this.gridOptions2 = {};
    this.defaultColDef = {
      resizable: true,
      width: 100,
    };
    this.rowSelection = "multiple";
    this.diagramModel = new Diagram.Model();
    this.model = this.diagramModel;
  },
  mounted() {
    //this.getMenu();
    //this.tableinfo();

    let projectdir = localStorage.getItem("selectDirectorySave");

    this.gridApi = this.gridOptions2.api;
    this.gridColumnApi = this.gridOptions2.columnApi;
    this.config.team = localStorage.getItem("team");
    this.config.version = localStorage.getItem("version");
    this.config.projectdir = localStorage.getItem("projectdir");
    this.config.packagenm = localStorage.getItem("packagenm");
    this.config.projectdir = projectdir ? projectdir : localStorage.getItem("packagedir");
    this.config.dir_front = localStorage.getItem("dir_front");
    this.config.db_type = this.db;
  },
  methods: {
    addRow(item, key, index) {
      console.log(item, key, this.selectedtables);
      this.loading = true;
      const adddata = setTimeout(() => {
        this.selectedtables[key].filds.push({
          column_comment: "ETC_01",
          column_default: null,
          column_key: "",
          column_name: "ETC_01",
          data_length: "255",
          data_type: "varchar",
          dbtype_name: "mysql",
          extra: "",
          fk_flage: "",
          is_nullable: "NO",
          label: "ETC_01",
          null_flag: null,
          pk_flag: "",
          schemaname: "woori_dev",
          table_comment: "공통분류코드",
          table_name: "comtccmmnclcode",
        });
        this.loading = false;
        //this.$store.commit("updateFields", this.filds);
      }, 500);
    },

    removeRow() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    setMaxEditor: function (str, title, lan) {
      this.dialog = true;
      this.dialogTitle = this.sample + title;
      this.dialogLan = lan;
      this.dialogEditorHtml = str;
    },
    replace: function (key) {
      switch (key) {
        case "selectedObj":
          this.selectedObj = [];
          break;
        case "selectedSearchobj":
          this.selectedSearchobj = [];
          break;
        case "insertTabledobj":
          this.insertTabledobj = [];
          break;
        case "updateTabledobj":
          this.updateTabledobj = [];
          break;
        default:
          break;
      }
    },
    columnMoved: function (e) {
      console.log(e.columnApi.columnController.gridColumns);
    },
    getConfig() {
      /*this.config.version= localStorage.getItem('version');
      this.config.projectdir= localStorage.getItem('projectdir');
      this.config.packagenm= localStorage.getItem('packagenm');
      this.config.packagedir= localStorage.getItem('packagedir');
      this.config.dir_front= localStorage.getItem('dir_front');*/
      this.config.db_type = this.db;
      let prj_root = this.config.packagedir ? this.config.packagedir.split(".").reverse()[0].trim() : "";
      this.config.pDir = (this.config.packagedir || "") + "/" + this.codedir;
      this.config.dir_java = "/src/main/java/" + this.config.pDir + "/";
      this.config.dir_vo = "/src/main/java/" + this.config.pDir + "/service/";
      this.config.dir_service = "/src/main/java/" + this.config.pDir + "/service/";
      this.config.dir_impl = "/src/main/java/" + this.config.pDir + "/service/impl/";
      this.config.dir_dao = "/src/main/java/" + this.config.pDir + "/service/impl/";
      this.config.dir_mapper = "/src/main/java/" + this.config.pDir + "/service/impl/";
      this.config.dir_web = "/src/main/java/" + this.config.pDir + "/web/";
      this.config.dir_controller = "/src/main/java/" + this.config.pDir + "/web";
      // this.config.dir_xml =
      //   "/src/main/resources/egovframework/mapper/com/" + this.codedir + "/";
      this.config.dir_xml =
        "/src/main/resources/egovframework/mapper/" + prj_root + "/" + this.codedir + "/";
      this.config.dir_xml_config =
        "/src/main/resources/" + (this.config.packagenm || "com.example") + "/mapper/config/";
      // this.config.dir_validator =
      //   "/src/main/" + this.config.packagenm + "/com/";
      this.config.dir_validator = "/src/main/" + (this.config.packagenm || "com.example") + "/" + prj_root;
      // this.config.dir_jsp =
      //   "/src/main/webapp/WEB-INF/jsp/egovframework/com/" + this.codedir + "/";
      this.config.dir_jsp =
        "/src/main/webapp/WEB-INF/jsp/egovframework/" +
        prj_root +
        "/" +
        this.codedir +
        "/";
      this.config.dir_titles = "/src/main/webapp/WEB-INF/jsp/" + this.codedir + "/";

      this.config.dir_js = "/src/main/webapp/js/" + this.codedir + "/";
      //console.log("this.config", this.config);
      //console.log(dir.getPath('home'));
      //console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}))
    },
    getPayLoad: function (sample) {
      let payload = localStorage.getItem(sample);
      return payload;
    },
    setPlayLoad: function (items, getSample) {
      let payload, payload1;
      if (getSample !== undefined) {
        //console.log("1",getSample);
        payload1 = this.getPayLoad(getSample);
        return JSON.parse(payload1);
      } else {
        let r = this.openPlayLoad(items);
        //console.log("2",getSample,items,r);
        return r;
      }
      //return payload;
    },
    openPlayLoad: function (items) {
      let SampleSmIdx,
        SampleSmIdxs,
        PriKeyNm,
        prikey,
        prikeyset,
        prikeyjsp,
        ControllerDataTypeName,
        useyn = "",
        delyn = "",
        whereIdx = "",
        reguserfdHrml = "",
        edituserfdHtml = "",
        loginVoHtml = "",
        contentsRegistHtmlSearch = "",
        thlist = "",
        thlistajax = "",
        contentsRegistHtml4 = "",
        SampleVoPrivate = "",
        PriKeyNmCamel,
        SampleVoPublic = "";
      let item = items[0];
      let codedir = this.codedir;
      let sample = camelCase(this.sample);
      let packagedir = this.config.packagedir;
      let config = this.config;
      let servicename = this.servicename;
      let servicedocs = this.servicedocs;
      let servicelocation = this.servicelocation;
      let serviceEtc1 = this.serviceEtc1;
      let serviceEtc2 = this.serviceEtc2;
      let serviceEtc3 = this.serviceEtc3;
      let reguserfd = this.reguserfd;
      let edituserfd = this.edituserfd;
      let loginVo = this.loginVo;
      //console.log(packagedir);
      let packagedirUrl = packagedir.replacecUrlDot();
      let packageUrl = codedir.replacecUrl();
      let Sample = sample.stringFirstUpperCase();
      let SampleLg = sample.toUpperCase();
      let SampleSmIdxUcfirst = sample.stringFirstUpperCase();
      let sampleNmFirst = sample.stringFirstUpperCase();
      let SampleSm = sample.toLowerCase();
      let codedirTitle = servicename;
      codedir = this.codedir.replacecHipon();
      let codedirDot = this.codedir.replace("_", ".");
      let SampleUrl = this.codedir.replacecUrl();
      let loginUserdumy = '"todouser"';

      /*try {
        SampleSmIdx = this.PriKeyNm.name;
        PriKeyNm = this.PriKeyNm.name;
        ControllerDataTypeName = this.ControllerDataTypeName.name;
      } catch (error) {
        SampleSmIdx = "todo_uid";
        PriKeyNm = "todo_uid";
        ControllerDataTypeName = "todo_varchar";
      }*/
      // 기본키 및 조건 절 세팅
      if (this.prinameobj) {
        //sql  xml
        whereIdx = this.prinameobj
          .map((e) => e.column_name + "= #{" + camelCase(e.column_name) + "}")
          .join(" and ");

        //@RequestParam("customersId") int customerid
        //컨트롤로 용
        prikey = this.prinameobj
          .map(
            (e) =>
              '@RequestParam("' +
              camelCase(e.column_name) +
              '") ' +
              this.dataTypeinitTuTb(e.data_type, 2) +
              " " +
              camelCase(e.column_name)
          )
          .join(",");

        //customersVO.setCustomerid(customerid);
        //컨트롤로용
        prikeyset = this.prinameobj
          .map(
            (e) =>
              SampleSm +
              "VO.set" +
              camelCase(e.column_name).stringFirstUpperCase() +
              "(" +
              camelCase(e.column_name) +
              ");"
          )
          .join(" \n\t\t ");

        //jsp
        prikeyjsp = this.prinameobj.map((e) => e.column_name).join(" ");
        SampleSmIdxs = this.prinameobj.map((e) => camelCase(e.column_name)).join("");
        if (this.prinameobj.length == 1) {
          SampleSmIdx = SampleSmIdxs;
        } else {
          SampleSmIdx = SampleSmIdxs[0];
        }

        PriKeyNmCamel = this.prinameobj
          .map((e) => camelCase(e.column_name))
          .join("+item.");
      } else {
        alert("기본키를 설정하세요");
        return false;
      }

      // 사용여부
      if (this.useyn) {
        useyn = " AND ";
        useyn = useyn + this.useyn.map((e) => e.column_name + " = 'Y' ").join(" AND ");
      } else {
        useyn = "";
      }

      // 삭제키
      if (this.delyn) {
        delyn = delyn + this.delyn.map((e) => e.column_name + " = 'N' ").join(" AND ");
      } else {
        delyn = "";
      }

      //로그인 연동
      if (this.loginVo && this.loginVoFnc && this.loginVoId) {
        let loginVO = this.loginVo.stringFirstLowerCase();
        loginVoHtml =
          this.loginVo +
          "	" +
          loginVO +
          "= (" +
          this.loginVo +
          ")" +
          this.loginVoFnc +
          ";";
        loginUserdumy = this.loginVoId;
      }

      // 최초등록자ID
      if (this.reguserfd) {
        reguserfdHrml =
          SampleSm +
          "VO.set" +
          camelCase(reguserfd.column_name).stringFirstUpperCase() +
          "(" +
          loginUserdumy +
          ");";
      }

      // 최종수정자ID
      if (this.edituserfd) {
        edituserfdHtml =
          SampleSm +
          "VO.set" +
          camelCase(edituserfd.column_name).stringFirstUpperCase() +
          "(" +
          loginUserdumy +
          ");";
      }

      // 테이블 이름 및 조인 테이블 정의
      // 한개으 테이블의 경우를 대비
      //let table_name = this.schema + "." + this.tablename;
      let table_name = this.tablename;
      let join_table_name = this.getJoins();
      if (this.joins.length > 0) {
      } else {
        //join_table_name = table_name + " " + this.tablename;
        join_table_name = table_name + " T1";
      }

      // list 검색 박스 selectedSearchobj
      contentsRegistHtmlSearch = this.selectedSearchobj
        .map((e) => this.dataTypeHtml(e))
        .join("\n\t\t ");

      // list header 리스트
      thlist = this.selectedObj
        .map((e) => this.dataTypeListHeaderHtml(e))
        .join("\n\t\t\t\t\t\t\t\t\t");

      // list  리스트
      thlistajax = this.selectedObj
        .map((e) => this.dataTypeListHtml(e))
        .join("\n\t\t\t\t\t\t\t\t\t");
      thlistajax;

      // sql 리스트
      // let selectedmod = this.selectedObj.map(
      //   e => "\n\t\t\t\t" + e.table_name + "." + e.column_name
      // );

      let selectedmod = this.selectedObj.map(function (data) {
        let obj = "\n\t\t\t\t T1." + data.column_name;
        let TU = data.data_type.toUpperCase();
        if (data.dbtype_name === "pgsql") {
          if (TU == "DATE" || TU == "DATETIME" || TU == "TIMESTAMP" || TU == "TIME") {
            obj =
              "\n\t\t\t\t to_char(T1." +
              data.column_name +
              ",'%Y-%m-%d %H:%i:%S') " +
              data.column_name;
          } else {
            obj = "\n\t\t\t\t T1." + data.column_name;
          }
        } else {
          if (TU == "DATE" || TU == "DATETIME" || TU == "TIMESTAMP" || TU == "TIME") {
            obj =
              "\n\t\t\t\t DATE_FORMAT(T1." +
              data.column_name +
              ",'%Y-%m-%d %H:%i:%S') " +
              data.column_name;
          } else {
            obj = "\n\t\t\t\t T1." + data.column_name;
          }
        }
        return obj;
      });

      // sql 입력
      // let insertedcolumn = this.insertTabledobj.map(
      //   e => "\n\t\t\t" + e.column_name
      // );

      let insertedcolumn = this.insertTabledobj.map(function (data) {
        let obj = "";
        if (data.extra == "auto_increment") {
          obj = "";
        } else {
          obj = "\n\t\t\t" + data.column_name;
        }
        return obj;
      });
      if (insertedcolumn) {
        if (insertedcolumn.length > 0 && insertedcolumn[0] === "") {
          insertedcolumn.splice(0, 1);
        }
      }
      // sql 목록 조건절
      let searchConditionItem = "";
      // 전체 검색 추가
      searchConditionItem += "<if test=\"totalSearch !=  '' \">AND	concat(";
      this.selectedSearchobj.forEach((post, i, array) => {
        let camelizesUpdateVal = camelCase(post.column_name);
        let TP = this.dataTypeinitTuTb(post.data_type);

        if (i === array.length - 1) {
          searchConditionItem += "COALESCE(T1." + post.column_name + " , ''))";
        } else {
          searchConditionItem += "COALESCE(T1." + post.column_name + " , ''),";
        }
      });
      searchConditionItem += " like concat('%',#{totalSearch},'%')</if>";

      searchConditionItem += "\r\n\t\t\t";
      this.selectedSearchobj.forEach((post, i) => {
        let camelizesUpdateVal = camelCase(post.column_name);
        let TP = this.dataTypeinitTuTb(post.data_type);

        searchConditionItem += "<if test='" + camelizesUpdateVal + " != " + TP + "'> AND";
        searchConditionItem +=
          " T1." + post.column_name + " REGEXP #{" + camelizesUpdateVal + "}";
        searchConditionItem += "</if>";
        searchConditionItem += "\r\n\t\t\t";
      });

      let searchConditionMapper = searchConditionItem;

      let orderbyConditionItem = "\r\n\t\t\t\t\t\t\t\t";
      this.selectedObj.forEach((post, i) => {
        let camelizesUpdateVal = camelCase(post.column_name);
        let TP = this.dataTypeinitTuTb(post.data_type);

        orderbyConditionItem +=
          "<when test=\"item.orderby == '" +
          camelizesUpdateVal +
          "'\">\r\n\t\t\t\t\t\t\t\t\t";
        orderbyConditionItem += " T1." + post.column_name + "\r\n\t\t\t\t\t\t\t\t";
        orderbyConditionItem +=
          '<include refid="CommonSql.descasc"/>\r\n\t\t\t\t\t\t\t\t';
        orderbyConditionItem += "</when>\r\n\t\t\t\t\t\t\t\t";
      });

      let orderByMapper = orderbyConditionItem;

      // sql 입력 값 세팅
      // let inserted = this.insertTabledobj.map(
      //   e => "\n\t\t\t#{" + camelCase(e.column_name) + "}"
      // );

      let inserted = this.insertTabledobj.map(function (data) {
        let obj = "";
        if (data.extra == "auto_increment") {
          obj = "";
        } else if (
          camelCase(data.column_name) === "frstRegistPnttm" ||
          camelCase(data.column_name) === "lastUpdtPnttm"
        ) {
          if(data.dbtype_name==='pgsql'){
            obj = "\n\t\t\now()";
          }else{
            obj = "\n\t\t\tSYSDATE()";
          }
        } else if (camelCase(data.column_name) === "useAt") {
          obj = "\n\t\t\t'Y'";
        } else {
          obj = "\n\t\t\t#{" + camelCase(data.column_name) + "}";
        }
        return obj;
      });

      if (inserted) {
        if (inserted.length > 0 && inserted[0] === "") {
          inserted.splice(0, 1);
        }
      }

      // sql 업데이트 세팅
      // let updated = this.updateTabledobj.map(
      //   e =>
      //     "\n\t\t\t" + e.column_name + " = #{" + camelCase(e.column_name) + "}"
      // );
      let updatedConditionItem = "\n\t\t\tLAST_UPDUSR_ID = #{lastUpdusrId}";
      updatedConditionItem += "\r\n\t\t\t,LAST_UPDT_PNTTM = SYSDATE()\r\n\t\t\t";
      this.updateTabledobj.forEach((post, i) => {
        let camelizesUpdateVal = camelCase(post.column_name);
        let TP = this.dataTypeinitTuTb(post.data_type);

        if (
          camelizesUpdateVal === "frstRegistPnttm" ||
          camelizesUpdateVal === "frstRegisterId" ||
          camelizesUpdateVal === "lastUpdtPnttm" ||
          camelizesUpdateVal === "lastUpdusrId" ||
          (prikeyjsp.indexOf(camelizesUpdateVal) > -1 && prikeyjsp.length > 0)
        ) {
        } else {
          updatedConditionItem +=
            "<if test='" + camelizesUpdateVal + " != " + TP + "'> ,";
          updatedConditionItem +=
            " " + post.column_name + " = #{" + camelizesUpdateVal + "}";
          updatedConditionItem += "</if>";
          updatedConditionItem += "\r\n\t\t\t";
        }
      });

      let updated = updatedConditionItem;

      // sql 리졸트 맵 설정
      let resultMap = this.selectedObj
        .map(
          (e) =>
            "\n\t\t\t" +
            '<result property="' +
            camelCase(e.column_name) +
            '" column="' +
            e.column_name +
            '"/>'
        )
        .join(" ");

      // 페이징 세팅
      let pagingHtml = "LIMIT	#{recordCountPerPage} OFFSET #{firstIndex}";
      if (this.db === "pgsql") pagingHtml = '<include refid="common.pageSql" />';

      // 오늘의 날자 세팅
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      today = mm + "/" + dd + "/" + yyyy;

      let vueVo = this.selectedObj.map((e) => this.vueVo(e)).join("\r\n\t\t, ");

      let columnCommentV = this.selectedObj
        .map((e) => this.vueComment(e))
        .join("\n\t\t ");

      let vueCommentBodyV = this.selectedObj
        .map((e) => this.vueCommentBody(e))
        .join("\n\t\t ");
      let insertBox2 = this.insertTabledobj
        .map((e) => this.vueInsertBox2(e, this.SampleSmIdx, this.SampleSmIdxs))
        .join("\n "); // insert 폼
      let insertBox = this.selectedSearchobj
        .map((e) => this.vueSearchBox2(e))
        .join("\n\t\t\t "); // search 폼

      var notNullOnly = this.selectedObj.filter((str) => {
        //console.log("notNullOnly", str);
        let val = "";
        if (!str.NULL_FLAG) {
          val = str.null_flag;
        } else {
          val = str.NULL_FLAG;
        }
        return val !== "Y";
      });

      //var notNulls = notNullOnly.filter(str => {
      //  console.log("notNulls", str);
      //  return (
      //    "params." +
      //    camelCase(str.column_name) +
      //    " === " +
      //    this.dataTypeInitValue(str.data_type)
      //  );
      //  //return str.NULL_FLAG !== "Y";
      //}).join(" && ");

      //console.log("notNullOnly",notNullOnly);
      let notNulls = this.selectedNotNullsobj
        .map((e) => this.dataTypenotNullslHtml(e, "params"))
        .join(" && ");
      let notNullsEdit = this.selectedNotNullsEditobj
        .map((e) => this.dataTypenotNullslHtml(e, "params"))
        .join(" && ");

      let notNullsTmp = this.selectedNotNullsobj
        .map((e) => this.dataTypenotNullslHtml(e, "items"))
        .join(" && ");
      let notNullsEditTmp = this.selectedNotNullsEditobj
        .map((e) => this.dataTypenotNullslHtml(e, "items"))
        .join(" && ");

      let deletekeys = this.prinameobj
        .map((e) => this.dataTypenotNullslHtml(e, ""))
        .join(" && ");
      let deletekeysTmp = this.prinameobj
        .map((e) => this.dataTypenotNullslHtml(e, "items"))
        .join(" && ");
      // list  리스트
      let contents = this.selectedObj
        .map((e) => this.dataTypeDetailHtml(e))
        .join("\n\t\t ");

      contents = "<tr>\n" + contents + "\n</tr>";

      let contentsRegistHtml = this.insertTabledobj
        .map((e) => this.dataTypeHtml(e))
        .join("\n\t\t ");
      contentsRegistHtml = "<tr>\n" + contentsRegistHtml + "\n</tr>";
      let contentsUpdateHtml = this.updateTabledobj
        .map((e) => this.dataTypeUpdateHtml(e))
        .join("\n\t\t ");
      contentsUpdateHtml = "<tr>\n" + contentsUpdateHtml + "\n</tr>";
      //var notNullOnly = this.selectedObj.filter(function (str) {
      //  return str.NULL_FLAG !== 'Y'
      //});

      let contentsRegistHtmlItemType = this.insertTabledobj
        .map((e) => this.dataTypeinitTuTb2(e))
        .join("\n\t\t\t\t\t");

      let contentsRegistHtmlItemType2 = this.insertTabledobj
        .map((e) => this.dataTypeinitTuTb3(e))
        .join(",\n\t\t\t\t");

      // ag-grid 추가

      let dataTypeAGgridDataHtml = this.insertTabledobj
        .map((e) => this.dataTypeAGgridData(e))
        .join(",\n\t\t\t\t");

      let dataFields = this.insertTabledobj
        .map((e) => "" + camelCase(e.column_name))
        .join(",");
      let dataFieldsNm = this.insertTabledobj.map((e) => "" + e.column_comment).join(",");
      //var notNulls = this.selectedObj.map(function (str) {
      //  return 'params.'+camelCase(str.COLUMN_NAME)+' === '+utils.dataTypeInitValue(str.DATA_TYPE)+' \n'
      //});

      // HDH - datepicker vue function 추가
      let datePickerFncfilterInsert = this.insertTabledobj.filter((str) => {
        return (
          str.data_type.toUpperCase() == "DATE" ||
          str.data_type.toUpperCase() == "DATETIME" ||
          str.data_type.toUpperCase() == "TIMESTAMP" ||
          str.data_type.toUpperCase() == "TIME"
        );
      });

      let datePickerFncfilterSearch = this.selectedSearchobj.filter((str) => {
        return (
          str.data_type.toUpperCase() == "DATE" ||
          str.data_type.toUpperCase() == "DATETIME" ||
          str.data_type.toUpperCase() == "TIMESTAMP" ||
          str.data_type.toUpperCase() == "TIME"
        );
      });

      let datePickerFncInsert = datePickerFncfilterInsert
        .map(function (data) {
          return (
            camelCase(data.column_name) +
            "ItemsVo : function (d){" +
            "\n\t\t\t\t" +
            SampleSm +
            "App.items." +
            camelCase(data.column_name) +
            " = d;" +
            "\n\t\t\t" +
            "},"
          );
        })
        .join("\n\t\t\t");
      let datePickerFncSearch = datePickerFncfilterSearch
        .map(function (data) {
          return (
            camelCase(data.column_name) +
            "SearchVo : function (d){" +
            "\n\t\t\t\t" +
            SampleSm +
            "App.searchVo." +
            camelCase(data.column_name) +
            " = d;" +
            "\n\t\t\t" +
            "},"
          );
        })
        .join("\n\t\t\t");

      // clearsearch datepicker
      let datePickerFncClearsearch = datePickerFncfilterSearch
        .map(function (data) {
          return (
            '$("#' +
            camelCase(data.column_name) +
            "\").datepicker().datepicker('setDate'," +
            SampleSm +
            "App.clearVo." +
            camelCase(data.column_name) +
            "); // " +
            data.column_comment
          );
        })
        .join("\n\t\t\t\t");

      // cleardetail datepicker
      let datePickerFncCleardetail = datePickerFncfilterInsert
        .map(function (data) {
          return (
            '$("#item_' +
            camelCase(data.column_name) +
            "\").datepicker().datepicker('setDate'," +
            SampleSm +
            "App.clearVo." +
            camelCase(data.column_name) +
            "); // " +
            data.column_comment
          );
        })
        .join("\n\t\t\t\t");

      // 오프젝트 설정
      let payload = {
        pageTodays: today,
        today: today,
        items: items,
        tb: item,
        config: config,
        version: config.version,
        team: config.team,
        packagedir: packagedir,
        packagedirUrl: packagedirUrl,
        packageUrl: packageUrl,
        tablename: table_name,
        table_name: table_name,
        join_table_name: join_table_name,
        codedirTitle: codedirTitle,
        codedir: codedir,
        codedirDot: codedirDot,
        pageTitle: codedirTitle,
        pageDocs: servicedocs,
        pageLocation: servicelocation,
        PriKeyNm: PriKeyNm,
        prikey: prikey,
        prikeyset: prikeyset,
        prikeyjsp: prikeyjsp,
        useyn: useyn,
        delyn: delyn,
        ControllerDataTypeName: ControllerDataTypeName,
        Sample: Sample,
        sampleNm: sample,
        sampleNmFirst: sampleNmFirst,
        sample: sample,
        SampleLg: SampleLg,
        SampleSm: SampleSm,
        SampleUrl: SampleUrl,
        SampleSmIdx: SampleSmIdx,
        SampleSmIdxUcfirst: SampleSmIdxUcfirst,
        SampleVoPrivate: this.voHtml(items, "private"),
        SampleVoPublic: this.voHtml(items, "public"),
        SampleAddVO: "",
        selectedmod: selectedmod,
        selected: selectedmod,
        searchConditionMapper: searchConditionMapper,
        orderByMapper: orderByMapper,
        insertedcolumn: insertedcolumn,
        inserted: inserted,
        updated: updated,
        resultMap: resultMap,
        pagingHtml: pagingHtml,
        ViewName: sample,
        whereIdx: whereIdx,
        reguserfdHrml: reguserfdHrml,
        edituserfdHtml: edituserfdHtml,
        loginVo: loginVo,
        loginVoHtml: loginVoHtml,
        loginUserdumy: loginUserdumy,
        contentsRegistHtmlSearch: contentsRegistHtmlSearch,
        thlist: thlist,
        thlistajax: thlistajax,
        contentsRegistHtml4: contentsRegistHtml, // 입력박스 1
        vueVo: vueVo,
        columnComment: columnCommentV,
        vueCommentBody: vueCommentBodyV,
        columnCommentV: columnCommentV,
        insertBox: insertBox, //검색박스 2
        insertBox2: insertBox2, //입력박스 2
        notNulls: notNulls, //입력필수
        notNullsEdit: notNullsEdit, //수정 필수
        deletekeys: deletekeys, //삭제키
        notNullsTmp: notNullsTmp, //입력필수
        notNullsEditTmp: notNullsEditTmp, //수정 필수
        deletekeysTmp: deletekeysTmp, //삭제키
        contentsRegistHtml: contentsRegistHtml,
        contentsUpdateHtml: contentsUpdateHtml,
        contents: contents,
        contentsRegistHtmlItemType: contentsRegistHtmlItemType,
        contentsRegistHtmlItemType2: contentsRegistHtmlItemType2,
        dataFields: dataFields,
        dataFieldsNm: dataFieldsNm,
        datePickerFncSearch: datePickerFncSearch,
        datePickerFncInsert: datePickerFncInsert,
        datePickerFncClearsearch: datePickerFncClearsearch,
        datePickerFncCleardetail: datePickerFncCleardetail,
        PriKeyNmCamel: PriKeyNmCamel,
        serviceEtc1: serviceEtc1,
        serviceEtc2: serviceEtc2,
        serviceEtc3: serviceEtc3,
        dataTypeAGgridDataHtml: dataTypeAGgridDataHtml,
      };
      //console.log(payload);
      localStorage.setItem(sample, JSON.stringify(payload));
      localStorage.setItem(sample + "init", JSON.stringify(payload));
      this.payload = payload;
      return payload;
    },
    setVhtml: function (str) {
      const Ctrl = require(str);
      let payload = this.setPlayLoad(items);
      let r = Ctrl.getCtrl(payload);
      return r;
    },
    getFolders: function (absolutePath) {
      let folders = [];
      // check incoming arg
      if (!absolutePath || typeof absolutePath !== "string") {
        return folders;
      }

      for (const fileInfo of walkFolders(absolutePath, false)) {
        // all files and folders
        if ("error" in fileInfo) {
          console.error(`Error: ${fileInfo.rootDir} - ${fileInfo.error}`);
          continue;
        }
        // we only want folders
        if (!fileInfo.isDir) {
          continue;
        }
        const node = this.createNode(fileInfo);
        folders.push(node);
      }
      return folders;
    },
    getFolderContents: function (folder) {
      let contents = [];

      // check incoming arg
      if (!folder || typeof folder !== "string") {
        return contents;
      }

      for (const fileInfo of walkFolders(folder, false)) {
        // all files and folders
        if ("error" in fileInfo) {
          console.error(`Error: ${fileInfo.rootDir} - ${fileInfo.error}`);
          continue;
        }
        const node = this.createNode(fileInfo);
        contents.push(node);
      }

      return contents;
    },
    createNode: function (fileInfo) {
      let nodeKey = fileInfo.rootDir;
      if (nodeKey.charAt(nodeKey.length - 1) !== path.sep) {
        nodeKey += path.sep;
      }
      if (fileInfo.fileName === path.sep) {
        fileInfo.fileName = nodeKey;
      } else {
        nodeKey += fileInfo.fileName;
      }
      // get file mime type
      const mimeType = mime.lookup(nodeKey);
      // create object
      return {
        label: fileInfo.fileName,
        nodeKey: nodeKey,
        expandable: fileInfo.isDir,
        tickable: true,
        lazy: true,
        children: [],
        data: {
          rootDir: fileInfo.rootDir,
          isDir: fileInfo.isDir,
          mimeType: mimeType,
          stat: fileInfo.stat,
        },
      };
    },
    saveAll() {
      let columns = this.columns;
      let sample = this.sample;
      saveFile(getV1Controller(columns), `${sample}Controller`, "java", "vo");
      saveFile(getV1VO(columns), `${sample}VO`, "java", "controller");
      saveFile(getV1Service(columns), `${sample}Service`, "java", "service");
      saveFile(getV1DAO(columns), `${sample}DAO`, "java", "dao");
      saveFile(getV1Impl(columns), `${sample}Impl`, "java", "impl");
      saveFile(getV1Xml(columns), `${sample}Mapper`, "xml", "xml");
      saveFile(getV1IBsheet(columns), `${sample}IBsheet`, "jsp", "jsp");
      saveFile(getV1Search(columns), `${sample}Search`, "jsp", "jsp");
      saveFile(getV1List(columns), `${sample}List`, "jsp", "jsp");
      saveFile(getV1Detail(columns), `${sample}Detail`, "jsp", "jsp");
      saveFile(getV1Add(columns), `${sample}Add`, "jsp", "jsp");
      saveFile(getV1Update(columns), `${sample}Updt`, "jsp", "jsp");
    },
    saveFile(val, file, ext, mnm) {
      // setJsptotal(columns),`${sample}Total`,'Total','jsp')
      this.getConfig();
      let payload = {
        config: this.config,
        vhtml: val,
        sample: file,
        ext: ext,
        type: mnm,
      };
      setSaveFile(payload);
    },
    openFile() {
      let self = this;
      dialog.showOpenDialog(function (fileNames) {
        if (fileNames === undefined) return;

        var fileName = fileNames[0];
        fs.readFile(fileName, "utf-8", function (err, data) {
          self.textAreaValue = data;
        });
      });
    },
    selectDirectory: function () {
      dialog
        .showOpenDialog({
          properties: ["openFile", "openDirectory", "multiSelections"],
        })
        .then((result) => {
          console.log(result.canceled);
          console.log(result.filePaths);
          if (!result.canceled) this.config.projectdir = result.filePaths;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectDirectory2: function () {
      dialog
        .showOpenDialog({
          properties: ["openFile", "openDirectory", "multiSelections"],
        })
        .then((result) => {
          console.log(result.canceled);
          console.log(result.filePaths);
          this.config.projectdir = result.filePaths;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectDirectorySave: function () {
      localStorage.setItem("selectDirectorySave", this.config.projectdir);
    },
    resetJoins: function () {
      this.joins = [];
    },
    setJoins: function () {
      console.log(this.joinact);
      let join_table_name = "";
      if (this.joinTables1 && this.joinTables2 && this.joins1) {
        if (this.joins.length > 0) {
          join_table_name =
            this.joinact.name +
            " " +
            this.joinTables2 +
            " on(" +
            this.joins1 +
            "=" +
            this.joins2 +
            ")";
        } else {
          join_table_name =
            this.joinTables1 +
            " " +
            this.joinact.name +
            " " +
            this.joinTables2 +
            " on(" +
            this.joins1 +
            "=" +
            this.joins2 +
            ")";
        }

        this.joins.push(join_table_name);
        this.joinTables1 = null;
        this.joinTables2 = null;
        this.joinTables3 = null;
        this.joins1 = null;
        this.joins2 = null;
        this.joins3 = null;
        this.joinact = null;
      }
    },
    getJoins: function () {
      return this.joins.join(" ");
    },
    getV1Controller: function (items) {
      const utils = require("../gen/oems/v1-Controller.js");
      let hHtml = utils.getCtrl(items, this);
      return hHtml; //[SampleVoPrivate, SampleVoPublic];
    },
    getV1VO: function (items) {
      const utils = require("../gen/oems/v1-VO.js");
      let hHtml = utils.getCtrl(items, this);
      return hHtml; //[SampleVoPrivate, SampleVoPublic];
    },
    getV1Service: function (items) {
      const utils = require("../gen/oems/v1-Service.js");
      let hHtml = utils.getCtrl(items, this);
      return hHtml; //[SampleVoPrivate, SampleVoPublic];
    },
    getV1DAO: function (items) {
      const utils = require("../gen/oems/v1-Dao.js");
      let hHtml = utils.getCtrl(items, this);
      return hHtml; //[SampleVoPrivate, SampleVoPublic];
    },
    getV1Impl: function (items) {
      const utils = require("../gen/oems/v1-Impl.js");
      let hHtml = utils.getCtrl(items, this);
      return hHtml; //[SampleVoPrivate, SampleVoPublic];
    },
    getV1Xml: function (items) {
      const utils = require("../gen/oems/v1-Xml.js");
      let hHtml = utils.getCtrl(items, this);
      return hHtml; //[SampleVoPrivate, SampleVoPublic];
    },
    getV1IBsheet: function (items) {
      const utils = require("../gen/oems/v1-IBsheet.js");
      let hHtml = utils.getCtrl(items, this);
      return hHtml; //[SampleVoPrivate, SampleVoPublic];
    },
    getV1Search2: function (items, str) {
      let hHtml = "준비중입니다..";
      if (items.length > 0) {
        const utils = require("../gen/" + str + ".js");
        let hHtml = utils.getCtrl(items, this);
        return hHtml; //[SampleVoPrivate, SampleVoPublic];
      } else {
        hHtml = "모델을";
      }
    },
    getV1Search: function (items) {
      const utils = require("../gen/oems/v1-Search.js");
      let hHtml = utils.getCtrl(items, this);
      return hHtml; //[SampleVoPrivate, SampleVoPublic];
    },
    getV1List: function (items) {
      const utils = require("../gen/oems/v1-List.js");
      let hHtml = utils.getCtrl(items, this);
      return hHtml; //[SampleVoPrivate, SampleVoPublic];
    },
    getV1Detail: function (items) {
      const utils = require("../gen/oems/v1-Detail.js");
      let hHtml = utils.getCtrl(items, this);
      return hHtml; //[SampleVoPrivate, SampleVoPublic];
    },
    getV1Add: function (items) {
      const utils = require("../gen/oems/v1-Add.js");
      let hHtml = utils.getCtrl(items, this);
      return hHtml; //[SampleVoPrivate, SampleVoPublic];
    },
    getV1Update: function (items) {
      const utils = require("../gen/oems/v1-Update.js");
      let hHtml = utils.getCtrl(items, this);
      return hHtml; //[SampleVoPrivate, SampleVoPublic];
    },
    // OEMS
    getset: function (items) {
      let payload = this.setPlayLoad(items);
      let r = this.voCtrl.getCtrl(payload, this);
      return r;
    },
    setInsertTable: function (item) {
      this.insertTabled = [];
      this.insertTabledobj = [];
      this.insertTabled = item.filds;
    },
    setUpdateTable: function (item) {
      this.updateTabled = [];
      this.updateTabledobj = [];
      this.updateTabled = item.filds;
    },
    setPriKey: function (item) {
      this.columns.filter((post, i) => {});

      let array = item.split(",");
      let vHtml = "";
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        vHtml = vHtml + '@RequestParam("' + element + '") int uid';
      }
    },
    setJsptotal: function (items) {
      let payload = this.setPlayLoad(items);
      return this.jsTotalCtrl.getCtrl(payload, this);
    },
    // ag-grid JS 추가
    setAgGridJs: function (items) {
      let payload = this.setPlayLoad(items);
      const Ctrl = require("../gen/js-aggrid.js");
      return Ctrl.getCtrl(payload, this);
    },
    // ag-grid 추가
    setJspAgGrid: function (items) {
      let payload = this.setPlayLoad(items);
      return this.jspAgGridCtrl.getCtrl(payload, this);
    },
    setJspupdate: function (items) {
      let payload = this.setPlayLoad(items);
      return this.jspUpdatelCtrl.getCtrl(payload, this);
    },
    setJspadd: function (items) {
      let payload = this.setPlayLoad(items);
      return this.jspAddCtrl.getCtrl(payload, this);
    },
    setJspdetail: function (items) {
      let payload = this.setPlayLoad(items);
      return this.jspDetailCtrl.getCtrl(payload, this);
    },
    setJsplist: function (items) {
      let payload = this.setPlayLoad(items);
      return this.jspListlCtrl.getCtrl(payload, this);
    },
    setJsplist2: function (items) {
      let payload = this.setPlayLoad(items);
      return this.jspListlCtrl2.getCtrl(payload, this);
    },
    setJs: function (items) {
      let payload = this.setPlayLoad(items);
      const Ctrl = require("../gen/js.js");
      return Ctrl.getCtrl(payload, this);
    },
    setJson: function (items) {
      let payload = this.setPlayLoad(items);
      let json = JSON.stringify(payload);
      let vHtml = json; //JSON.stringify(payload);
      return payload;
    },
    setV3VO: function (items) {
      const Ctrl = require("../gen/v3-VO");
      let payload = this.setPlayLoad(items);
      let r = Ctrl.getCtrl(payload);
      return r;
    },
    setV3DefaultVO: function (items) {
      const Ctrl = require("../gen/v3-DefaultVO");
      let payload = this.setPlayLoad(items);
      let r = Ctrl.getCtrl(payload);
      return r;
    },
    setV3DAO: function (items) {
      const Ctrl = require("../gen/v3-DAO");
      let payload = this.setPlayLoad(items);
      let r = Ctrl.getCtrl(payload);
      return r;
    },
    setV3Service: function (items) {
      const Ctrl = require("../gen/v3-Service.js");
      let payload = this.setPlayLoad(items);
      let r = Ctrl.getCtrl(payload);
      return r;
    },
    setV3ServiceImpl: function (items) {
      const Ctrl = require("../gen/v3-ServiceImpl");
      let payload = this.setPlayLoad(items);
      let r = Ctrl.getCtrl(payload);
      return r;
    },
    setV3Mapper: function (items) {
      const Ctrl = require("../gen/v3-Mapper.js");
      let payload = this.setPlayLoad(items);
      let r = Ctrl.getCtrl(payload);
      return r;
    },
    setV3Controller: function (items) {
      const Ctrl = require("../gen/v3-Controller.js");
      let payload = this.setPlayLoad(items);
      let r = Ctrl.getCtrl(payload);
      return r;
    },
    setXml: function (items) {
      let payload = this.setPlayLoad(items);
      let r = this.xmlCtrl.getCtrl(payload);
      return r;
    },
    setVoCtrl: function (items) {
      let payload = this.setPlayLoad(items);
      let r = this.voCtrl.getCtrl(payload);
      return r;
    },
    setImpl: function (items) {
      let payload = this.setPlayLoad(items);
      let r = this.implCtrl.getCtrl(payload);
      return r;
    },
    setDao: function (items) {
      let payload = this.setPlayLoad(items);
      let r = this.daoCtrl.getCtrl(payload);
      return r;
    },
    setService: function (items) {
      let payload = this.setPlayLoad(items);
      let r = this.serviceCtrl.getCtrl(payload);
      return r;
    },
    setCtrl: function (items) {
      let getsample = camelCase(this.sample);
      let payload = this.setPlayLoad(items);
      let r = this.cTrl.getCtrl(payload);
      return r;
    },
    setController: function (items) {
      let payload = this.setPlayLoad(items);
      let r = this.cTrl2.getCtrl(payload);
      return r;
    },
    setCodeText: function (array) {
      return "123123";
    },
    setcodes2: function (array) {
      let r = "";
      array.forEach((item, i) => {
        if (item.menuNo > 8000000 && item.chkURL !== "dir" && item.upperMenuId !== "0")
          r = r + this.setcodes(item);
      });
      return r;
    },
    setcodes: function (item) {
      //const array = item.chkURL.split("/");
      const dir = item.dir.toLowerCase();
      const dir1 = item.dir.toLowerCase();
      const dir2 = item.dir2;
      const codes = `
          /**
         * ${item.menuNm}
         */
          @RequestMapping(value = "/singarea/${dir}/select${dir2}Json.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
        @ResponseBody()
        public String selectCustomersalesmenList() throws JSONException, SQLException {
          JSONObject item = new JSONObject();

          Connection conn = null;
          conn = EgovGenUtil.getConnection();
          String Qry = tableInfo("${item.menuNm}","FOODATARAK");;
          item.put("result", "success");
          item.put("filds", EgovGenUtil.getSqlArrFirstSm(conn, Qry));
          item.put("total", EgovGenUtil.getSqlArrFirstSm(conn, " select count(*) as total from FOODATARAK.${item.menuNm} "));
          item.put("items", EgovGenUtil.getSqlArrFirstSm(conn, " select * from Foodatarak.${item.menuNm} limit 1000 "));
          try {if (conn != null) {conn.close();}} catch (Exception e) {if (conn != null) {conn.close();}}
          return item.toString();
          }

        @RequestMapping(value="${item.chkURL}")
          public String SelectMaster${item.menuNm}List(ModelMap model) throws Exception {

              model.addAttribute("title", "${item.title} ${item.menuNm}");
              model.addAttribute("listurl", "/singarea/${dir}/select${dir2}Json.do");
              model.addAttribute("detailUrl", "/singarea/${dir}/select${dir2}Detail.do");
              model.addAttribute("insertUrl", "/singarea/${dir}/insert${dir2}.do");
              model.addAttribute("deleteUrl", "/singarea/${dir}/delete${dir2}.do");
              model.addAttribute("updateUrl", "/singarea/${dir}/update${dir2}.do");
              model.addAttribute("table", "${dir2}");
              return "egovframework/com/singarea/${dir}/${dir2}";
          }
      `;
      return codes;
    },
    codesOnChange: function () {},
    drop: function (ev) {
      //var data = ev.dataTransfer.getData("text");

      var data = ev.dataTransfer.getData("text");
      //ev.target.appendChild(document.getElementById(data));
      console.log(data);
    },
    dragstart_handler: function (ev) {
      console.log("22222", ev);
      //ev.preventDefault();
      ev.dropEffect = "move";
      ev.dataTransfer.setData("text/plain", ev.target.innerText);
    },
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    },
    onSelectionChanged() {
      var selectedRows = this.gridApi.getSelectedRows();
      var selectedRowsString = "";
      selectedRows.forEach(function (selectedRow, index) {
        console.log("11111", selectedRow, index);
      });
    },
    getMenu: function () {
      this.$axios
        .get(this.apiserverurl+"/mysqlmlist/" + this.schema)
        .then((response) => {
          this.data = response.data;
          console.log(this.data);
          this.codes = "";
          this.$store.commit("updateMenus", this.data);
          //this.data.forEach((post, i) => {

          //  this.codes = this.codes + setcodes(post);

          //});
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "getMenu Loading failed",
            icon: "info",
          });
        });
    },
    setGen: function () {
      // ajaxJinFormSubmit('#conts','http:// cdn.saesolsoft.co.kr/api/pas','POST','test01')
      axios
        .post("http://cdn.saesolsoft.co.kr/gen/pasgen", {
          apikey: "billion21Apikeyqwe123!@#",
          apikeyenddate: "20181001",
          codedir: this.codedir,
          sample: this.sample,
          servicename: this.servicename,
          tablename: this.tablename,
          selected: this.selected,
          selected2: this.selected2,
          inserted: this.inserted,
          selected_name: this.selectedname,
          SampleSm: this.sample.toLowerCase(),
          SampleLg: this.sample.toUpperCase(),
          SampleUrl: this.codedir,
          SampleSmIdx: this.priname,
          reguserfd: this.reguserfd,
          edituserfd: this.edituserfd,
          roottable: this.roottable,
          deled: this.priname,
          datatype: this.datatype,
          PriKeyNm: this.priname,
        })
        .then(function (response) {
          console.log(response);
          this.msq = response;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    tableset: function (index) {
      console.log("tableset " + index, this.tableitems[index]);
      this.tableitem = this.tableitems[index].column;
      this.tablename = this.tableitems[index].table;

      this.selected = this.inserted = this.tableitem
        .map((e) => e.name || "없음")
        .join(",");
      this.selectedname = this.tableitem.map((e) => e.comment || "없음").join(",");
      this.datatype = this.tableitem.map((e) => e.type || "없음").join(",");
      var kyearray = this.search("PRI", this.tableitem); // (_.invert(hash))['PRI']
      console.log(this.priname);
      this.priname = kyearray.name;
      // this.codedir:null,
      // this.sample:null,
      // this.service_name:null,
      // this.deled:null,
      // this.inserted:null,
      // this.selected_name:null
    },
    search: function (nameKey, myArray) {
      alert(1);
      console.log(myArray);
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].column_key === nameKey) {
          return myArray[i];
        }
      }
    },
    refresh: function () {
      this.tableitem = null;
      this.tablename = null;
      this.selected = null;
      this.inserted = null;
      this.selectedname = null;
      this.datatype = null;
      this.sample = null;
      this.codedir = null;
      this.servicename = null;
      this.priname = null;
    },
    tableinfo: function (item) {
      console.log("itemitemitemitem", item);
      let url =
      this.apiserverurl+"/" +
        item.db +
        "tinfo/" +
        item.db +
        "/" +
        item.schema +
        "/" +
        item.table;
      let url2 =
      this.apiserverurl+"/" +
        item.db +
        "list/" +
        item.db +
        "/" +
        item.schema +
        "/" +
        item.table;
      this.$axios
        .get(url)
        .then((response) => {
          this.data = response.data;
          var objs = [];
          var rows = this.data;
          for (var i = 0; i < rows.length; i++) {
            console.log("Query succesfully executed", rows[i]);
            if (rows[i].pk_flag === "Y") {
              this.$store.commit("updateRowKey", rows[i].column_name);
            }
            if (i === 0) {
              objs.push({
                headerName: rows[i].column_name,
                name: rows[i].column_name,
                field: rows[i].column_name,
                label: rows[i].column_name,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                sortable: true,
                editable: true,
                filter: "agTextColumnFilter",
              });
            } else {
              objs.push({
                headerName: rows[i].column_name,
                name: rows[i].column_name,
                field: rows[i].column_name,
                label: rows[i].column_name,
                sortable: true,
                editable: true,
                filter: "agTextColumnFilter",
              });
            }
          }

          this.$store.commit("updateField", objs);
          this.$store.commit("updateFields", this.data);
          this.$store.commit("updateTableName", rows[0].table_name);
          this.$store.commit(
            "updateTableComent",
            rows[0].table_comment ? rows[0].table_comment : rows[0].table_name
          );
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "mylayout tableinfo Loading failed",
            icon: "info",
          });
        });

      this.$axios
        .get(url2)
        .then((response) => {
          this.data = response.data;
          console.log(this.data);
          //this.$store.commit("updateTables", this.data);_self.$store.commit("updateItems", rows);
          this.$store.commit("updateItems", this.data);
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "mylayout tableinfo mylist Loading failed",
            icon: "report_problem",
          });
        });
    },
    tableinfo_back: function () {
      this.$axios
        .get(this.apiserverurl+"/mysqltlist")
        .then((response) => {
          this.data = response.data;
          console.log(this.data);
          this.$store.commit("updateTables", this.data);
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "tableinfo Loading failed",
            icon: "info",
          });
        });

      /*this.connection = this.mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.pass,
        database: this.dbname
      });
      // connect to mysql
      this.connection.connect(function(err) {
        // in case of error
        if (err) {
          console.log(err.code);
          console.log(err.fatal);
        }
      });
      let query = `SELECT * FROM information_schema.tables WHERE table_schema = '${this.dbname}'`;
      console.log(query);
      let _self = this;
      this.connection.query(query, function(err, rows, fields) {
        if (err) {
          console.log("An error ocurred performing the query.");
          console.log(err);
          return;
        }

        console.log(rows);
        this.tableitems = rows;
        _self.$store.commit("updateTables", this.tableitems);
      });
      // Close the connection
      this.connection.end(function() {
        // The connection has been closed
      });
      */
    },
    tableinfo2: function () {
      this.connection2 = this.oracledb.getConnection(
        {
          user: this.dbConfig.user,
          password: this.dbConfig.password,
          connectString: this.dbConfig.connectString,
        },
        function (err, connection) {
          if (err) {
            console.error(err.message);
            return;
          }
          connection.execute(
            // The statement to execute
            `SELECT
                code_id,
                code,
                code_nm,
                code_dc,
                use_at,
                frst_regist_pnttm,
                frst_register_id,
                last_updt_pnttm,
                last_updusr_id
            FROM
                comtccmmndetailcode
            where code_id = :id`,

            // The 'bind value' 180 for the bind variable ':id'
            ["COM001"],

            // execute() options argument.  Since the query only returns one
            // row, we can optimize memory usage by reducing the default
            // maxRows value.  For the complete list of other options see
            // the documentation.
            {
              maxRows: 1,
              // , outFormat: oracledb.OBJECT  // query result format
              // , extendedMetaData: true      // get extra metadata
              // , fetchArraySize: 100         // internal buffer allocation size for tuning
            },

            // The callback function handles the SQL execution results
            function (err, result) {
              if (err) {
                console.error(err.message);
                this.doRelease(connection);
                return;
              }
              console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
              console.log(result.rows); // [ [ 180, 'Construction' ] ]
              this.doRelease(connection);
            }
          );
        }
      );
    },
    doRelease: function (connection) {
      connection.close(function (err) {
        if (err) {
          console.error(err.message);
        }
      });
    },
    rootcolumninfo: function () {
      this.$axios
        .get(
          this.apiserverurl+"/" +
            this.db +
            "tinfo/" +
            this.db +
            "/" +
            this.schema +
            "/" +
            this.roottable
        )
        .then((response) => {
          this.data = response.data;
          console.log(this.data);
          this.selected2 = this.data
            .map((e) => e.column_comment || e.column_name)
            .join(",");
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "rootcolumninfo Loading failed",
            icon: "info",
          });
        });
      /*this.connection = this.mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.pass,
        database: this.dbname
      });
      this.connection.connect(function(err) {
        // in case of error
        if (err) {
          console.log(err.code);
          console.log(err.fatal);
        }
      });
      console.log("rootTable:::", this.roottable);
      if (this.roottable) {
        let query = `
          SELECT
          ORDINAL_POSITION,
          COLUMN_NAME,
          DATA_TYPE,
          COLUMN_TYPE ,
          COLUMN_KEY ,
          IS_NULLABLE ,
          EXTRA,
          COLUMN_DEFAULT ,
          ifnull(COLUMN_COMMENT,COLUMN_NAME) as COLUMN_COMMENT
          FROM  information_schema.COLUMNS
          WHERE  TABLE_SCHEMA = '${this.dbname}'  AND TABLE_NAME =  '${this.roottable}'
          ORDER BY TABLE_NAME, ORDINAL_POSITION `;

        this.connection.query(query, function(err, rows, fields) {
          if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
          }
          console.log(rows);
          this.selected2 = rows.map(e => e.COLUMN_NAME || "없음").join(",");
        });
      }*/
    },
    columninfo: function (table_name) {
      //alert(tname);
      this.$axios
        .get(
          this.apiserverurl+"/" +
            this.db +
            "tinfo/" +
            this.db +
            "/" +
            this.schema +
            "/" +
            table_name
        )
        .then((response) => {
          this.data = response.data;
          console.log(this.data);
          let _self = this;

          _self.roottable = table_name;
          // _self.tablename = tname;
          _self.codedir = "singarea." + table_name;
          _self.servicename = table_name;
          _self.sample = table_name.stringFirstUpperCase();
          _self.tableitem = this.data;

          console.log(_self.tableitem);
          _self.selected = _self.inserted = _self.selected2 = _self.tableitem
            .map((e) => e.column_name || "없음")
            .join(",");
          _self.selectedname = _self.tableitem
            .map((e) => e.column_comment || e.column_name)
            .join(",");
          _self.datatype = _self.tableitem.map((e) => e.data_type || "없음").join(",");
          _self.selectedArray = _self.insertedArray = _self.tableitem.map(
            (e) => e.column_name || "없음"
          );
          console.log("1231231232", _self.selectedarray);
          _self.selectednameArray = _self.tableitem.map(
            (e) => e.column_comment || "없음"
          );
          _self.datatypeArray = _self.tableitem.map((e) => e.data_type || "없음");

          var priKeyArray = [];
          try {
            let kyearray = this.search("PRI", _self.tableitem); // (_.invert(hash))['pri']

            console.log(kyearray);
            //_self.priname = kyearray.column_name;
          } catch (error) {
            //_self.priname = null;
          }
          for (var i = 0; i < _self.tableitem.length; i++) {
            if (_self.tableitem[i].column_key === "PRI") {
              priKeyArray.push(_self.tableitem[i].column_name);
            }
          }
          _self.priname = priKeyArray.join();
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "columninfo Loading failed",
            icon: "info",
          });
        });
      /*
      this.connection = this.mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.pass,
        database: this.dbname
      });
      // connect to mysql
      this.connection.connect(function(err) {
        // in case of error
        if (err) {
          console.log(err.code);
          console.log(err.fatal);
        }
      });
      console.log(tname);
      // let rquery = ''
      let query = `
      SELECT
      ORDINAL_POSITION,
      COLUMN_NAME,
      DATA_TYPE,
      COLUMN_TYPE ,
      COLUMN_KEY ,
      IS_NULLABLE ,
      EXTRA,
      COLUMN_DEFAULT ,
      ifnull(COLUMN_COMMENT,COLUMN_NAME) as COLUMN_COMMENT
      FROM  information_schema.COLUMNS
      WHERE  TABLE_SCHEMA = '${this.dbname}'  AND TABLE_NAME =  '${tname}'
      ORDER BY TABLE_NAME, ORDINAL_POSITION `;
      console.log(query);
      this.tableitem = null;
      this.selected = null;
      this.inserted = null;
      this.selectedname = null;
      this.datatype = null;
      this.priname = null;

      let _self = this;
      this.connection.query(query, function(err, rows, fields) {
        if (err) {
          console.log("An error ocurred performing the query.");
          console.log(err);
          return;
        }
        _self.roottable = tname;
        // _self.tablename = tname;
        _self.codedir = "singarea." + tname;
        _self.servicename = tname;
        _self.sample = tname.stringFirstUpperCase();
        _self.tableitem = rows;

        console.log(_self.tableitem);
        _self.selected = _self.inserted = _self.selected2 = _self.tableitem
          .map(e => e.COLUMN_NAME || "없음")
          .join(",");
        _self.selectedname = _self.tableitem
          .map(e => e.COLUMN_COMMENT || e.COLUMN_NAME)
          .join(",");
        _self.datatype = _self.tableitem
          .map(e => e.COLUMN_TYPE || "없음")
          .join(",");
        _self.selectedArray = _self.insertedArray = _self.tableitem.map(
          e => e.COLUMN_NAME || "없음"
        );
        _self.selectednameArray = _self.tableitem.map(
          e => e.COLUMN_COMMENT || "없음"
        );
        _self.datatypeArray = _self.tableitem.map(e => e.COLUMN_TYPE || "없음");

        try {
          let kyearray = this.search("PRI", this.tableitem); // (_.invert(hash))['PRI']
          _self.priname = kyearray.name;
        } catch (error) {
          _self.priname = null;
        }
        //_self.setGen();
      });
      // Close the connection
      this.connection.end(function() {
        // The connection has been closed
      });*/
    },
    columninfo2: function (tname) {
      /*this.connection = this.mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.pass,
        database: this.dbname
      });
      // connect to mysql
      this.connection.connect(function(err) {
        // in case of error
        if (err) {
          console.log(err.code);
          console.log(err.fatal);
        }
      });
      console.log(tname);
      let query = `
        SELECT
        ORDINAL_POSITION idx,
        COLUMN_NAME name,
        DATA_TYPE type,
        COLUMN_TYPE length,
        COLUMN_KEY key,
        IS_NULLABLE null,
        EXTRA auto,
        COLUMN_DEFAULT default,
        COLUMN_COMMENT comment
        FROM  information_schema.COLUMNS
        WHERE  TABLE_SCHEMA = '${this.dbname}'  AND TABLE_NAME =  '${tname}'
        ORDER BY TABLE_NAME, ORDINAL_POSITION `;
      console.log(query);
      this.tableitem = null;
      this.tablename = null;
      this.selected = null;
      this.inserted = null;
      this.selectedname = null;
      this.datatype = null;
      this.priname = null;

      // let _self = this
      this.connection.query(query, function(err, rows, fields) {
        if (err) {
          console.log("An error ocurred performing the query.");
          console.log(err);
          return;
        }

        this.tablename = tname;
        this.tableitem = rows;
        console.log(rows);
        this.selected = this.inserted = this.tableitem
          .map(e => e.name || "없음")
          .join(",");
        this.selectedname = this.tableitem
          .map(e => e.comment || "없음")
          .join(",");
        this.datatype = this.tableitem.map(e => e.type || "없음").join(",");

        this.selectedArray = this.insertedArray = this.tableitem.map(
          e => e.name || "없음"
        );
        this.selectednameArray = this.tableitem.map(e => e.comment || "없음");
        this.datatypeArray = this.tableitem.map(e => e.type || "없음");

        try {
          let kyearray = this.search("PRI", this.tableitem); // (_.invert(hash))['PRI']
          this.priname = kyearray.name;
        } catch (error) {
          this.priname = null;
        }
      });
      // Close the connection
      this.connection.end(function() {
        // The connection has been closed
      });*/
    },
    logout: function () {
      location.href = "login.html";
    },
    login: function () {
      if (this.inputEmail && this.inputPassword) {
        $.ajax({
          method: "POST",
          url: "http://cdn.saesolsoft.co.kr/gen/formsignin",
          data: {
            inputEmail: this.inputEmail,
            inputPassword: this.inputPassword,
          },
        }).done(function (msg) {
          if (msg === "1") {
            location.href = "index.html";
          } else {
            alert("아이디 페스워드를 확인하세요!!");
            return false;
          }
        });
      } else {
        alert("아이디 페스워드를 확인하세요!!");
      }
    },
    dbconnect: function () {},
    dbconnectResult: function (data) {
      this.tableitems = data;
      console.log("sdfsdfsdfsdfsdfsdfsdf", this.tableitems);
    },
  },
};
var carMappings = {
  YES: "YES",
  NO: "NO",
};

var colourMappings = {
  cb: "Cadet Blue",
  bw: "Burlywood",
  fg: "Forest Green",
};
function extractValues(mappings) {
  return Object.keys(mappings);
}

function lookupValue(mappings, key) {
  return mappings[key];
}

function lookupKey(mappings, name) {
  for (var key in mappings) {
    if (mappings.hasOwnProperty(key)) {
      if (name === mappings[key]) {
        return key;
      }
    }
  }
}

function colorCellRenderer(params) {
  return (
    "<span style='color:" +
    removeSpaces(params.valueFormatted) +
    "'>" +
    params.valueFormatted +
    "</span>"
  );
}

function currencyFormatter(params) {
  var value = Math.floor(params.value);
  if (isNaN(value)) return "";
  return "\xA3" + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function numberValueSetter(params) {
  if (isNaN(parseFloat(params.newValue)) || !isFinite(params.newValue)) {
    return false;
  }
  params.data.price = params.newValue;
  return true;
}

function removeSpaces(str) {
  return str ? str.replace(/\s/g, "") : str;
}
</script>
<style>
.editor {
  width: 100%;
  height: 500px;
}
</style>
<style lang="css">
.my-sticky-column-table {
  /*
    specifying max-width so the example can
    highlight the sticky column on any browser window
  */
  max-width: 600px;

  /* bg color is important for th; just specify one */
  thead tr:first-child th:first-child {
    background-color: #fff;
    opacity: 1;
  }

  td:first-child {
    background-color: #f5f5dc;
  }

  thead tr:first-child th:first-child, td:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
  }
}

.my-sticky-header-table {
  /* max height is important */
  .q-table__middle {
    max-height: 200px;
  }

  .q-table__top, .q-table__bottom, thead tr:first-child th {
    background-color: #c1f4cd;
  }

  thead tr:first-child th {
    position: sticky;
    top: 0;
    opacity: 1;
    z-index: 1;
  }
}

.my-sticky-header-column-table {
  /*
    specifying max-width so the example can
    highlight the sticky column on any browser window
  */
  max-width: 600px;

  /* max height is important */
  .q-table__middle {
    max-height: 200px;
  }

  .q-table__top, .q-table__bottom, tr:first-child th, td:first-child {
    background-color: #c1f4cd;
  }

  tr:first-child th {
    position: sticky;
    top: 0;
    opacity: 1; /* opacity is important */
    z-index: 2; /* higher than z-index for td below */
  }

  tr:first-child th:first-child {
    z-index: 3; /* highest z-index */
  }

  td:first-child {
    z-index: 1;
  }

  td:first-child, th:first-child {
    position: sticky;
    left: 0;
  }
}

.row .col-3, .row .col-4, .row .col-12, .row .col-6 {
  padding: 5px;
}

.pb-10 {
  padding-bottom: 10px;
}

.pt-10 {
  padding-top: 10px;
}

.q-tab-panel {
  padding: 0px;
}

.q-card__actions {
  padding: 0px;
}

.q-gutter-y-md > *, .q-gutter-md > * {
  margin-top: 10px;
}

.q-splitter__panel.q-splitter__before {
  /* width: 150px !important; */
}

.q-gutter-y-md {
  padding-top: 10px;
}

.q-btn-group {
  box-shadow: none;
}

.q-btn {
  padding: 4px 8px;
  box-shadow: none;
}

.q-table__card {
  border: #a8a0a0 1px solid;
  border-radius: 0px;
  box-shadow: none;
  color: #000;
  /* background-color: #fff; */
  /* border-radius: 4px; */
  /* box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12); */
}

.q-table__top {
  padding: 4px 10px;
  font-size: 12px;
}

.q-table__bottom {
  height: 28px;
  padding: 4px 10px;
  font-size: 12px;
}

.q-table thead tr, .q-table tbody td {
  height: 26px;
}

.q-table tbody td {
  font-size: 12px;
}

.q-table th, .q-table td {
  padding: 0px 5px;
  background-color: inherit;
}

.q-tab-panels.q-panel-parent {
  padding-top: 10px;
}

.q-tab {
  padding: 0 10px;
  min-height: 28px;
}

.q-tab-panels.q-panel-parent {
  padding-top: 0px;
}

.list-group {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
}

.list-group {
  min-height: 10px;
}

.list-group-item:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 5px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.list-group-item {
  cursor: move;
}

.list-group-item {
  cursor: move;
}
</style>
