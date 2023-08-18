
<script lang="ts">
export default {
  name: 'MonocoInit',
}
</script>
<script setup lang="ts">
import { nextTick, ref, onBeforeUnmount,onMounted } from 'vue'
import * as monaco from 'monaco-editor' ///esm/vs/editor/editor.api
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";
import "monaco-editor/esm/vs/basic-languages/html/html.contribution";
import "monaco-editor/esm/vs/basic-languages/css/css.contribution";
// ctrl + f查找功能
import "monaco-editor/esm/vs/editor/contrib/find/browser/findController.js";

const props = defineProps({ 
  textValue: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['update:textValue'])
self.MonacoEnvironment = {
    getWorker(_: any, label: string) {
        if (label === "json") {
            return new jsonWorker();
        }
        if (label === "css" || label === "scss" || label === "less") {
            return new cssWorker();
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return new htmlWorker();
        }
        if (label === "typescript" || label === "javascript") {
            return new tsWorker();
        }
        return new editorWorker();
    },
};
let editor: monaco.editor.IStandaloneCodeEditor
const editorInit = () => {
    type ThemeType = 'light' | 'dark'
    const themeValue = localStorage.getItem("theme") as (ThemeType | null) || "light";
    nextTick(() => {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false,
      })
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2016,
        allowNonTsExtensions: true,
      })

      !editor
        ? (editor = monaco.editor.create(document.querySelector('.codeEditBox') as HTMLElement, {
            value: props.textValue, // 编辑器初始显示文字
            language: 'javascript', // 语言支持自行查阅demo
            automaticLayout: true, // 自适应布局
            theme: themeValue=='light'?'vs':'vs-dark', // 官方自带三种主题vs, hc-black, or vs-dark
            foldingStrategy: 'indentation', // 代码可分小段折叠
            renderLineHighlight: 'all', // 行亮
            selectOnLineNumbers: true, // 显示行号
            minimap: {
              enabled: true,
            },
            readOnly: false, // 只读
            fontSize: 16, // 字体大小
            scrollBeyondLastLine: false, // 取消代码后面一大段空白
            overviewRulerBorder: false, // 不要滚动条的边框
            wordWrap: 'on', // 自动换行
            tabSize: 2, // tab 缩进长度
            // acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
            // acceptSuggestionOnEnter: 'on', // 接受输入建议 "on" | "off" | "smart"
            // accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
            // accessibilitySupport: 'on', // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
            // autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
            // autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
            // autoClosingOvertype: 'always', // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
            // autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
            // autoIndent: 'None', // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
            // automaticLayout: true, // 自动布局
            // codeLens: false, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
            // codeLensFontFamily: '', // codeLens的字体样式
            // codeLensFontSize: 14, // codeLens的字体大小
            // colorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
            // comments: {
            //   ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
            //   insertSpace: true // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
            // }, // 注释配置
            // contextmenu: true, // 启用上下文菜单
            // columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
            // autoSurround: 'never', // 是否应自动环绕选择
            // copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
            // cursorBlinking: 'Solid', // 光标动画样式
            // cursorSmoothCaretAnimation: true, // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
            // cursorStyle: 'UnderlineThin', // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
            // cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
            // cursorSurroundingLinesStyle: 'all', // "default" | "all" 光标环绕样式
            // cursorWidth: 2, // <=25 光标宽度
            // minimap: {
            //   enabled: false // 是否启用预览图
            // }, // 预览图设置
            // folding: true, // 是否启用代码折叠
            // links: true, // 是否点击链接
            // overviewRulerBorder: false, // 是否应围绕概览标尺绘制边框
            // renderLineHighlight: 'gutter', // 当前行突出显示方式
            // roundedSelection: false, // 选区是否有圆角
            // scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
            // readOnly: false, // 是否为只读模式
            // theme: 'vs'// vs, hc-black, or vs-dark
          }))
        : editor.setValue('')
        
      // 监听值的变化
      editor.onDidChangeModelContent(async(val: any)  => {
        showCodeEle.value = false
        let text = await editor.getValue()
        emits('update:textValue',text )
      })
    })
  }
  const showCodeEle = ref(true) 
  const setValue = (str:string)=>{
    editor.setValue(str)
  }
  const getAction = ()=>{ //格式化
    editor.getAction('editor.action.formatDocument').run() //格式化代码
  }
  onMounted(()=>{
    editorInit()
  })
  onBeforeUnmount(() => {
    editor.dispose() //销毁实例
  })
  defineExpose({
    setValue,
    getAction
  })
</script>

<template>
    <div class="codeEditBox" :style="{ height: '100%' }">
      <code v-show="showCodeEle">{{ textValue }}</code>
    </div>
</template>