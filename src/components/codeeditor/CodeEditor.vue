<template>
  <div>
    <div class="form-group">
      <label class="switch">
        <input
          id="togBtn"
          v-model="darkTheme"
          class="pull-right"
          type="checkbox"
          @change="changeTheme"
        />
        <div class="slider round">
          <span class="on">Dark</span><span class="off">Light</span>
        </div>
      </label>
      <div id="codearea" />
    </div>
    <div class="btns">
      <button class="btn btn-primary btn-lg btn-block" @click="submitSolution">
        RUN
      </button>
    </div>
  </div>
</template>

<script>
// import jQuery from 'jquery/dist/jquery';

/* eslint-disable import/extensions */
import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/autorefresh.js';
import 'codemirror/addon/display/fullscreen.js';
// import 'codemirror/addon/selection/active-line.js';
// editotr modes
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/go/go.js';
import 'codemirror/mode/rust/rust.js';

export default {
  name: 'CodeEditor',
  props: {
    editorLangMode: {
      type: String,
      required: true,
    },
    precode: {
      type: String,
      default: '',
      immediate: true,
    },
  },
  data() {
    return {
      src: '',
      darkTheme: false,
      editor: null,
      snippets: [
        { text: 'const', displayText: 'const declarations' },
        { text: 'let', displayText: 'let declarations' },
        { text: 'var', displayText: 'var declarations' },
        { text: 'console', displayText: 'console print' },
      ],
    };
  },
  watch: {
    editorLangMode() {
      this.setEditorMode();
    },
    precode() {
      this.setEditorValue();
    },
  },
  mounted() {
    setTimeout(() => {
      this.setUpEditor();
    }, 400);
  },
  methods: {
    submitSolution() {
      this.$emit('codeSubmitted', this.src);
    },
    submitShortcut() {
      this.exitFullScreen();
      this.submitSolution();
    },
    changeTheme() {
      let themeName = 'neo';
      if (this.darkTheme === true) {
        themeName = 'material';
      }
      this.setEditorTheme(themeName);
    },
    setEditorTheme(themeName) {
      this.editor.setOption('theme', themeName);
    },
    setEditorMode() {
      if (this.editor) {
        this.editor.setOption('mode', this.editorLangMode);
      }
    },
    setEditorValue() {
      if (this.editor) {
        this.editor.setValue(this.precode);
      }
    },
    hintSnippets() {
      this.editor.showHint({ completeSingle: false });
    },
    toggleFullScreen() {
      this.editor.setOption('fullScreen', !this.editor.getOption('fullScreen'));
    },
    exitFullScreen() {
      if (this.editor.getOption('fullScreen')) {
        this.editor.setOption('fullScreen', false);
      }
    },
    setUpEditor() {
      this.editor = CodeMirror(document.getElementById('codearea'), {
        autoRefresh: true,
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
        indentWithTabs: true,
        lineWrapping: true,
        indentUnit: 4,
      });
      this.editor.setOption('extraKeys', {
        'Cmd-E': this.hintSnippets,
        'Ctrl-E': this.hintSnippets,
        'Cmd-Enter': this.toggleFullScreen,
        'Ctrl-Enter': this.toggleFullScreen,
        'Shift-Cmd-Enter': this.submitShortcut,
        'Shift-Ctrl-Enter': this.submitShortcut,
        Esc: this.exitFullScreen,
      });
      // this.editor.setOption('fullscreen', true);
      // this.editor.on('keyup', (editor, event) => {
      //   if (!editor.state.completionActive
      //       && event.keyCode !== 13) {
      //     CodeMirror.commands.autocomplete(editor, null, { completeSingle: false });
      //   }
      // });
      this.editor.on('changes', () => {
        this.src = this.editor.getValue();
        this.$emit('codeEdited', this.src);
      });
      this.editor.setSize('100%', '100%');
      this.setEditorTheme('neo');
      this.setEditorMode();
      this.setEditorValue();
    },
  },
};
</script>

<style src="./codeeditor.css" />
