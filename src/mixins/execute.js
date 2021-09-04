/* eslint-disable eol-last */
/* eslint-disable indent */
export default {
    data() {
        return {
            resuming: false,
            initialCode: '',
            langOptions: [],
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
            if (!this.resuming && this.submission.lang !== this.prevLang) {
                this.onLangChange();
            }
            this.resuming = false;
        },
    },
    created() {
        this.setLanguages();
    },
    methods: {
        warnModalClosed(choice) {
            this.showWaringModal = false;
            if (choice) {
                this.changeLanguageSelection();
            } else {
                this.submission.lang = this.prevLang;
            }
        },
        onLangChange() {
            const code = btoa(this.submission.src);
            if (code !== this.initialCode && code.trim().length !== 0) {
                this.warningModalContent = 'Switching to a new language would overwrite your current progress. Are you sure you want to proceed?';
                this.showWaringModal = true;
            } else {
                this.changeLanguageSelection();
            }
        },
        changeLanguageSelection() {
            const langId = this.newlySelLang;
            this.prevLang = langId;
            this.langOptions.forEach((lang) => {
                if (lang.value === langId) {
                    this.langMode = lang.mode;
                    this.langPrecode = lang.precode;
                    this.setCompiler(langId);
                    this.setInitialCode(lang.precode);
                }
            });
        },
        resumeEditorState(state) {
            this.resuming = true;
            this.submission.lang = state.lang;
            this.prevLang = state.lang;
            this.langMode = state.mode;
            this.langPrecode = state.precode;
            this.submission.memory = state.memory;
            this.submission.input = state.input;
            this.submission.time = state.time;
            this.setCompiler(state.lang);
            this.setInitialCode(state.precode);
        },
        preapreEditor() {
            const editorState = localStorage.getItem('editorState');
            if (editorState) {
                this.resumeEditorState(JSON.parse(editorState));
            } else {
                this.submission.lang = this.langOptions[0].value;
            }
        },
        setLanguages() {
            this.$store
                .dispatch('getLanguages')
                .then((languageData) => {
                    languageData.forEach((lang) => {
                        this.langOptions.push({
                            value: lang.id,
                            text: `${lang.name} ${lang.compilers[0].name}`,
                            mode: lang.mode,
                            precode: atob(lang.precode),
                        });
                        // console.log(lang.id, lang.compilers);
                        this.compilerData[lang.id] = lang.compilers;
                    });
                    if (languageData.length === 0) {
                        throw Error('No supported language found');
                    }
                })
                .then(() => {
                    this.preapreEditor();
                })
                .catch((err) => {
                    console.log(err);
                });
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
        saveEditorState() {
            localStorage.setItem('editorState', JSON.stringify({
                lang: this.submission.lang,
                compiler: this.submission.compiler,
                mode: this.langMode,
                precode: this.submission.src,
                input: this.submission.input,
                memory: this.submission.memory,
                time: this.submission.time,
            }));
        },
        codeEdited(src) {
            this.submission.src = src;
        },
        setInitialCode(src) {
            this.initialCode = btoa(src);
            this.submission.src = this.initialCode;
        },
    },
};