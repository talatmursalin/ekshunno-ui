<template>
    <div class="simple-editpr">
        <div class="editor-node" ref="editorNode"></div>
    </div>
</template>


<script>
import Quill from 'quill';

export default {
  name: 'QuillTextEditor',
  props: {
    value: {
      default: '',
      type: String,
    },
  },

  data() {
    return {
      editorContent: null,
      editorInstance: null,
      editorOpts: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ size: ['14px', '16px', '18px'] }],
            [{ font: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
            [{ color: [] }, { background: [] }],
            ['clean'],
            ['link', 'image'],
            [{ direction: 'rtl' }],
          ],
        },
        theme: 'snow',
      },
    };
  },

  watch: {
    value(newVal) {
      // Only update the content if it's changed from an external source
      // or else it'll act weird when you try to type anything
      if (newVal !== this.editorContent) {
        this.editorInstance.pasteHTML(newVal);
      }
    },
  },

  mounted() {
    this.initializeEditor();
  },

  beforeDestroy() {
    // Turn off all listeners set on text-change
    this.editorInstance.off('text-change');
  },

  methods: {
    initializeEditor() {
      // Set initial content that's going to be picked up by Quill
      this.$refs.editorNode.innerHTML = this.value;
      // Create the Quill instance
      const Size = Quill.import('attributors/style/size');
      Size.whitelist = ['14px', '16px', '18px'];
      Quill.register(Size, true);
      this.editorInstance = new Quill(this.$refs.editorNode, this.editorOpts);
      // Setup handler for whenever things change inside Quill
      this.editorInstance.on('text-change', this.onEditorContentChange);
      // Save any initial content to this.editorContent
      this.setEditorContent();
    },
    onEditorContentChange() {
      // Whenever we change anything, update this.editorContent
      this.setEditorContent();
      // Then emit its value as input so we have a working v-model
      // This $emit will be catched up in the watch:value
      // that's why we guard against calling pasteHTML
      // calling that function while we are typing is undesirable
      this.$emit('input', this.editorContent);
    },
    setEditorContent() {
      this.editorContent = this.editorInstance.getText().trim()
        ? this.editorInstance.root.innerHTML
        : '';
    },
  },
};
</script>


<style lang="css" src='../../../node_modules/quill/dist/quill.snow.css'/>
