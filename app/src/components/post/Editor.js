import React, { useEffect, useRef, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';

const Container = styled.section``;

const TitleInput = styled.input`
    font-size: 38px;
    color: #2c3e50;
    outline: none;
    padding-bottom: 10px;
    border: none;
    border-top: 1px solid #eaecef;
    border-left: 1px solid #eaecef;
    border-right: 1px solid #eaecef;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px 15px;
    width: 100%;

    &::placeholder {
        color: #eaecef;
    }
`;

const QuillWrapper = styled.div`
    .ql-editor {
        color: #2c3e50;
        min-height: calc(100vh - 320px);
        font-size: 17px;
        line-height: 1.5;
        border: 1px solid #eaecef;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 15px;
    }
    .ql-editor.ql-blank::before {
        left: 0;
        z-index: 999;

        &::placeholder {
            color: #eaecef;
        }
    }
`;

const Editor = ({ title = '', body = '' }) => {
    const values = useRef({ title, body });
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    const onChange = useCallback(
        e => {
            values.current = { ...values.current, [e.target.name]: e.target.value };
        },
        [values]
    );

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            modules: {
                toolbar: [
                    [{ header: '1' }, { header: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'code-block', 'link']
                ]
            }
        });

        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                onChange({ target: { name: 'body', value: quill.root.innerHTML } });
            }
        });
    }, [onChange]);

    return (
        <Container>
            <TitleInput placeholder="Title" onChange={onChange} name="title" autoFocus />
            <QuillWrapper>
                <div ref={quillElement} />
            </QuillWrapper>
        </Container>
    );
};

export default Editor;
