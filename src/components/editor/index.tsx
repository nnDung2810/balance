import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import { v4 } from 'uuid';

import { editorjsConfig } from './config';

const Editor = forwardRef(({ value, onChange }: { value?: any; onChange?: any }, ref) => {
  useImperativeHandle(ref, () => ({}));
  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById('editorjs' + id.current)) {
        editorjsConfig.holder = 'editorjs' + id.current;
        editorjsConfig.onChange = async (api: any) => onChange(await api.saver.save());
        const editor = new EditorJS(editorjsConfig);
        if (value) {
          setTimeout(() => {
            editor?.blocks.render(
              value.blocks
                ? value
                : {
                    blocks: [
                      {
                        id: 'r3s9SCBudq',
                        type: 'paragraph',
                        data: {
                          text: '',
                        },
                      },
                    ],
                  },
            );
          }, 1000);
        }
      }
    });
  }, []);
  const id = useRef(v4());

  return <div id={'editorjs' + id.current}></div>;
});
Editor.displayName = 'Search';
export default Editor;
