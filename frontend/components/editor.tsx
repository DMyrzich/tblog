import React from 'react';
import EditorJS from '@editorjs/editorjs';
import { OutputBlockData } from '@editorjs/editorjs';

interface EditorProps {

    setBody: (blocks: OutputBlockData[]) => void;
    blocks?: OutputBlockData[];
}

export const Editor: React.FC<EditorProps> = ({ setBody, blocks = [] }) => {

    React.useEffect(() => {

        const editor = new EditorJS({
            holder: 'editor',
            placeholder: 'Введите текст вашей статьи',
            data: { blocks },
            async onChange() {

                const { blocks } = await editor.save();
                setBody(blocks);
            }
        });

        return () => { editor.isReady.then(() => { editor.destroy(); }).catch(e => console.error('ERROR editor cleanup', e)); }

    }, []);

    return (<div id="editor" />);
};