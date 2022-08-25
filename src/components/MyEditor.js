/**
 * @description React wangEditor usage
 * @author wangfupeng
 */

import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

function MyEditor() {


    // editor 实例
    // const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    const [editor, setEditor] = useState(null)                   // JS 语法

    // 编辑器内容
    const [html, setHtml] = useState('<p>hello</p>')


    // const image=editor.getMenuConfig('uploadImage') 
    // console.log('image',image)

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml('<p>hello world</p>')
        }, 1500)
    }, [])

    // 工具栏配置
    // const toolbarConfig: Partial<IToolbarConfig> = { }  // TS 语法
    const toolbarConfig = { 
        modalAppendToBody:true
        



    }                        // JS 语法
    




    

    // 编辑器配置
    // const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
       
        MENU_CONF:{}
  
    }
    // 修改 uploadImage 菜单配置
editorConfig.MENU_CONF['uploadImage'] = {
    server: 'https://api.metagate.finance/api/v1/image_upload',
    fieldName: 'image',
    headers: {
        authorization:'Bearer fIbCOzGXWrajt2UhHJMH0XjcjaVcKkYwei3U4dq3U9U'
    },

     customInsert(res, insertFn) {                  // JS 语法
        // res 即服务端的返回结果

        // 从 res 中找到 url alt href ，然后插图图片
        insertFn(res.uri, "jfij", res.uri)
    },



        onSuccess(file, res) {          // JS 语法
            console.log(`${file.name} 上传成功`, res)
        },

         onFailed(file, res) {           // JS 语法
         console.log(`${file.name} 上传失败`, res)
        },
}

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                {html}
            </div>
        </>
    )
}

export default MyEditor
