<template>
  <div class="index">
    <div class="params">
      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group mr-3 fx-width" role="group" aria-label="first group">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="langSelect">Language</label>
            </div>
            <select class="custom-select" @change="onLangChange($event)"
            id="langSelect" v-model="langSel">
              <option v-for="(lang, ind) in languages" :key="ind"
               :value="lang.id">{{lang.name}}</option>
            </select>
            <div class="input-group-prepend">
              <label class="input-group-text" for="compSelect">Compiler</label>
            </div>
            <select class="custom-select" id="compSelect" v-model="compSel">
              <option v-for="(comp, ind) in compilers" :key="ind"
              :value="comp.id">{{comp.name}}</option>
            </select>
          </div>
        </div>
        <div class="btn-group mr-3" role="group" aria-label="Second group">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Time</span>
            </div>
            <input type="text" class="form-control text-right" aria-label="time" v-model="inTime">
            <div class="input-group-append">
              <span class="input-group-text">s</span>
            </div>
            <div class="input-group-prepend">
              <label class="input-group-text" for="memSelect">Memory</label>
            </div>
            <select class="custom-select text-right" id="memSelect" v-model="memSel">
              <option value="512m">512</option>
              <option value="1g">1024</option>
            </select>
            <div class="input-group-append">
              <span class="input-group-text">mb</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-10">
        <div class="col-md-6">
          <div class="form-group">
            <label class="switch">
              <input class="pull-right" type="checkbox" id="togBtn"
              @change="changeTheme" v-model="themeMode">
                <div class="slider round">
                  <span class="on">Dark</span><span class="off">Light</span>
                </div>
              </label>
            <div id="codearea"></div>
          </div>
          <div class="btns">
            <button class="btn btn-secondary btn-lg btn-block" @click="submitCode" >submit</button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="exampleFormControlTextarea3">Input</label>
            <textarea class="form-control" id="exampleFormControlTextarea3" rows="10"
            v-model="input"></textarea>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea3">Output</label>
            <textarea class="form-control" id="exampleFormControlTextarea3" rows="10"
            v-model="output" readonly></textarea>
          </div>
          <div class="input-group input-group-lg">
            <div class="input-group-prepend">
                <span class="input-group-text">Result</span>
              </div>
              <input type="text" class="form-control text-right" aria-label="verdict"
              readonly :value="verdict" >
            <div class="input-group-prepend">
                <span class="input-group-text">Time</span>
              </div>
              <input type="text" class="form-control text-right" aria-label="time"
              readonly :value="time" >
              <div class="input-group-append">
                <span class="input-group-text">s</span>
              </div>
            <div class="input-group-prepend">
                <span class="input-group-text">Memory</span>
              </div>
              <input type="text" class="form-control text-right" aria-label="mem"
              readonly :value="memory">
              <div class="input-group-append">
                <span class="input-group-text">MB</span>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
// eslint-disable-next-line import/extensions
import 'codemirror/mode/javascript/javascript.js';

// eslint-disable-next-line import/extensions
import 'codemirror/addon/hint/show-hint.js';
// eslint-disable-next-line import/extensions
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/hint/show-hint.css';

// eslint-disable-next-line import/extensions
import 'codemirror/addon/edit/matchbrackets.js';
// eslint-disable-next-line import/extensions
import 'codemirror/addon/edit/closebrackets.js';

// eslint-disable-next-line import/extensions
import 'codemirror/mode/clike/clike.js';
// eslint-disable-next-line import/extensions
import 'codemirror/mode/python/python.js';
// eslint-disable-next-line import/extensions
import 'codemirror/mode/go/go.js';
// eslint-disable-next-line import/extensions
import 'codemirror/mode/rust/rust.js';

import 'codemirror/theme/material.css';
import 'codemirror/theme/neo.css';


function createPromise(executor) {
  let callback;
  function resolve(resolution, arg) {
    Promise.resolve().then(() => {
      callback[resolution](arg);
    });
  }
  try {
    executor(resolve.bind(null, 'fulfill'), resolve.bind(null, 'reject'));
  } catch (e) {
    resolve('reject', e);
  }
  return Promise.resolve({
    then(fulfill, reject) {
      callback = { fulfill, reject };
    },
  });
}

export default {
  name: 'IndexPage',
  data() {
    return {
      languages: [],
      compilers: [],
      src: '',
      input: '',
      output: '',
      langSel: '',
      compSel: '',
      memSel: '512m',
      inTime: 0,
      verdict: '',
      time: 0,
      memory: 0,
      editor: 0,
      themeMode: false,
    };
  },
  created() {
    this.get_languages()
      .then((languages) => {
        this.languages = languages;
        const defaultSelLang = languages[0].id;
        this.langSel = defaultSelLang;
        return defaultSelLang;
      })
      .then((selLang) => {
        this.get_compilers(selLang)
          .then((compilers) => {
            this.compilers = compilers;
            this.compSel = compilers[0].id;
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    window.addEventListener('load', () => {
      this.setUpEditor();
    });
  },
  methods: {
    changeTheme() {
      let themeName = 'neo';
      if (this.themeMode === true) {
        themeName = 'material';
      }
      this.setEditorTheme(themeName);
    },
    showLoader() {
      return this.$loading.show({
        // Optional parameters
        container: this.$refs.formContainer,
        canCancel: false,
        color: '#EFEFEA',
        loader: 'bars',
        width: 128,
        height: 128,
        backgroundColor: '#000',
      });
    },
    postCode() {
      return fetch('http://execute.talatmursalin.tech/api/v1/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang: this.langSel,
          compiler: this.compSel,
          src: this.src,
          input: this.input,
          memory: this.memSel,
          time: this.inTime,
        }),
      });
    },
    startPolling(uuid) {
      return createPromise((resolve, reject) => {
        let pollCnt = 0;
        console.log('poll init');
        const interval = setInterval(() => {
          pollCnt += 1;
          console.log(`request cnt${pollCnt}`);
          if (pollCnt > 15) {
            clearInterval(interval);
            reject('Submit Timed Out. Please Try Again');
          }
          fetch(`http://execute.talatmursalin.tech/api/v1/result/${uuid}`)
            .then((response) => response.json())
            .then((data) => {
              if (Object.keys(data).length > 0) {
                clearInterval(interval);
                resolve(data);
              }
            });
        }, 1000);
      });
    },
    submitCode() {
      console.log(this.memSel, this.compSel, this.langSel, this.inTime);
      if (this.src.trim().length === 0) {
        console.log('empty-src');
        return;
      }
      const loader = this.showLoader();

      this.postCode()
        .then((res) => res.json())
        .then((data) => {
          console.log(data.uuid);
          if (data.status === 'OK') {
            return data.uuid;
          }
          throw new Error(data.uuid);
        })
        .then((uuid) => {
          this.startPolling(uuid)
            .then((result) => {
              this.verdict = result.verdict;
              this.output = result.output;
              this.time = result.time;
              this.memory = result.memory;
            })
            .catch((err) => {
              this.output = err;
            })
            .finally(() => {
              loader.hide();
            });
        })
        .catch((err) => {
          this.output = err;
        });
    },
    get_languages() {
      return fetch('http://execute.talatmursalin.tech/api/v1/languages')
        .then((response) => response.json()).then((data) => {
          if (data.length > 0) {
            return data;
          }
          throw Error('No Supported Languages');
        });
    },
    get_compilers(langId) {
      return fetch(`http://execute.talatmursalin.tech/api/v1/compilers/${langId}`)
        .then((response) => response.json()).then((data) => {
          if (data.length > 0) {
            return data;
          }
          throw Error('No Supported Compilers Found');
        });
    },
    onLangChange(event) {
      const langId = event.target.value;
      this.languages.forEach((lang) => {
        if (lang.id === langId) {
          console.log(lang.name);
          this.setEditorMode(lang.mode);
        }
      });
      this.get_compilers(langId).then((compilers) => {
        this.compilers = compilers;
        if (compilers.length > 0) {
          this.compSel = compilers[0].id;
        }
      });
    },
    setEditorTheme(themeName) {
      this.editor.setOption('theme', themeName);
    },
    setEditorMode(langMode) {
      this.editor.setOption('mode', langMode);
    },
    setUpEditor() {
      this.editor = CodeMirror(document.getElementById('codearea'), {
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
        indentWithTabs: true,
        lineWrapping: true,
        indentUnit: 4,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
      });
      this.editor.on('changes', () => {
        this.src = this.editor.getValue();
      });
      this.editor.setSize('100%', '100%');
      this.setEditorTheme('neo');
      this.setEditorMode('text/x-csrc');

      // eslint-disable-next-line no-unused-vars
      // codearea.on('keyup', (editor, event) => {
      //   // type code and show autocomplete hint in the meanwhile
      //   CodeMirror.commands.autocomplete(editor);
      // });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

.index {
    width: 80%;
    max-width: 1300px;
    margin: 0 auto;
    margin-top:60px;
    padding: 5px;
    text-align: left;
}

.text-right{
  text-align: right;
}

.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}

#codearea{
  height: 577px;
  background: #eee;
  border: 1px solid #eee;
}

.fx-width{
  width: 400px;
}

/* toggle btn */

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 20px;
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #bbb;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #343a40;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(30px);
  -ms-transform: translateX(30px);
  transform: translateX(30px);
}

.on {
  display: none;
}

.on, .off {
  color: white;
  position: absolute;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

.off {
  margin-left:7px;
}

input:checked+ .slider .on {
  display: block;
  margin-left:-7px;
}

input:checked + .slider .off {
  display: none;
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
