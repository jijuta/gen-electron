<template>
  <div style="width:100%">
    <q-card>
      <q-card-actions>
        <q-btn flat>{{title}}</q-btn>
        <q-btn flat @click="setSaveFile(payload)">저장</q-btn>
        <q-btn flat @click="setMaxEditor()">최대화</q-btn>
        <q-btn flat @click="setMaxEditorSend()">서버전송</q-btn>
      </q-card-actions>
      <MonacoEditor
        class="editor"
        style="width: 100%;height:299px;"
        :value="vhtml"
        :language="ext"
      />
    </q-card>
    <!-- 최대화 모달창 -->
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">{{dialogTitle}}</div>
        </q-card-section>

        <MonacoEditor
          class="editor full-height"
          :value="dialogEditorHtml"
          :language="dialogLan"
          style="width: 100%;height:800px;"
        />
      </q-card>
    </q-dialog>
    <!-- 최대화 모달창 끝 -->
  </div>
</template>

<script>
import MonacoEditor from "vue-monaco";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import saveFile from "../gen/utils/index"

export default {
  name: "monaco-editors",
  components: { MonacoEditor, upperFirst, camelCase },
  data() {
    return {
      dialog: false,
      dialogTitle: "",
      dialogLan: "java",
      maximizedToggle: true,
      dialogEditorHtml: "",
      payload: {
        config: this.config,
        title: this.title,
        vhtml: this.vhtml,
        sample: this.sample,
        ext: this.ext,
        type: this.type,
      }
    };
  },
  props: {
    title: String,
    vhtml: String,
    sample: String,
    ext: String,
    type: String,
    config: {}
  }, //["payload", "vhtml", "sample", "ext", "type"],
  methods: {
    setMaxEditor: function() {
      this.dialog = true;
      this.dialogTitle = this.sample + this.title;
      this.dialogLan = this.ext;
      this.dialogEditorHtml = this.vhtml;
    },
    setSaveFile(payload) {
      saveFile.getSaveFile(payload);
    },
    setMaxEditorSend: function() {
      alert(3);
    }
  }
};
</script>
