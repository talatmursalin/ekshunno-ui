/* eslint-disable eol-last */
/* eslint-disable indent */
export default {
    data() {
        return {
            resuming: false,
            savingCode: false,
            initialCode: '',
            langOptions: [],
            languageConf: {},
            compOptions: [],
            compilerData: {},
            langMode: '',
            langPrecode: '',
            submission: {
                lang: '',
                compiler: '',
                src: '',
            },
            prevLang: '',
        };
    },
    computed: {
        newlySelLang() {
            return this.submission.lang;
        },
    },
    watch: {
        newlySelLang() {
            // if (!this.resuming && this.submission.lang !== this.prevLang) {
            this.onLangChange();
            // }
            // this.resuming = false;
        },
    },
    created() {
        this.setLanguages();
    },
    methods: {
        setLanguages() {
            this.$store
                .dispatch('getLanguages')
                .then((languageData) => {
                    if (languageData.length === 0) {
                        throw Error('No supported language found');
                    }
                    this.setLangOptions(languageData);
                })
                .then(() => {
                    this.preapreEditor();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        setLangOptions(languageData) {
            languageData.forEach((lang) => {
                const code = this.base64decode(lang.precode);
                this.langOptions.push({
                    value: lang.id,
                    text: `${lang.name} (${lang.compilers[0].name})`,
                    mode: lang.mode,
                    precode: code,
                });
                // console.log(lang.id, lang.compilers);
                this.compilerData[lang.id] = lang.compilers;
                this.languageConf[lang.id] = lang;
                this.languageConf[lang.id].precode = code;
            });
        },
        preapreEditor() {
            const jsonState = this.getEditorState();
            if (Object.keys(jsonState).length !== 0) {
                this.resumeEditorState(jsonState);
            } else {
                this.submission.lang = this.langOptions[0].value;
            }
        },
        resumeEditorState(state) {
            // this.resuming = true;
            // this.prevLang = state.selected;
            this.syncLangOptionCode(state);
            this.submission.lang = state.selected;
            // this.setUpNewLangSelection(state[state.selected],
            //     this.languageConf[state.selected].mode, state.selected);
        },
        syncLangOptionCode(state) {
            this.langOptions.forEach((op, i) => {
                if (op.value in state) {
                    this.langOptions[i].precode = state[op.value];
                }
            });
        },
        setUpNewLangSelection(code, mode, langId) {
            this.langMode = mode;
            this.langPrecode = code;
            this.submission.src = code;
            this.setCompiler(langId);
        },
        setCompiler(langId) {
            this.compOptions = [];
            this.compilerData[langId].forEach((compiler) => {
                this.compOptions.push({
                    value: compiler.id,
                    text: compiler.name,
                });
            });
            this.submission.compiler = this.compOptions[0].value;
        },
        warnModalClosed(choice) {
            this.showWaringModal = false;
            if (choice) {
                this.changeLanguageSelection();
            } else {
                this.submission.lang = this.prevLang;
            }
        },
        onLangChange() {
            // const code = btoa(this.submission.src);
            // if (code !== this.initialCode && code.trim().length !== 0) {
            //     this.warningModalContent = 'Switching to a new language would
            //  overwrite your current progress. Are you sure you want to proceed?';
            //     this.showWaringModal = true;
            // } else {
            this.changeLanguageSelection();
            // }
        },
        changeLanguageSelection() {
            const langId = this.newlySelLang;
            // this.prevLang = langId;
            const jsonState = this.getEditorState();
            this.syncLangOptionCode(jsonState);
            this.langOptions.forEach((lang) => {
                if (lang.value === langId) {
                    this.setUpNewLangSelection(lang.precode, lang.mode, langId);
                    this.saveEditorState();
                }
            });
        },
        saveEditorState() {
            const stateJson = this.getEditorState();
            stateJson[this.submission.lang] = this.submission.src;
            stateJson.selected = this.submission.lang;
            localStorage.setItem('editorState',
                this.base64encode(JSON.stringify(stateJson)));
        },
        saveCurrentCode() {
            if (!this.savingCode) {
                this.savingCode = true;
                this.saveEditorState();
                this.savingCode = false;
            }
        },
        codeEdited(src) {
            this.submission.src = src;
            this.saveCurrentCode();
        },
        getEditorState() {
            const stateBuffer = localStorage.getItem('editorState');
            let stateJson = {};
            if (stateBuffer) {
                stateJson = JSON.parse(this.base64decode(stateBuffer));
            }
            return stateJson;
        },
        base64encode(str) {
            return Buffer.from(str).toString('base64');
        },
        base64decode(str) {
            return Buffer.from(str, 'base64').toString('utf-8');
        },
    },
};