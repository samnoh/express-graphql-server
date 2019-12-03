import React, { useEffect, useRef, useState, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';

const Container = styled.section``;

const TitleInput = styled.input`
    font-size: 42px;
    outline: none;
    padding-bottom: 10px;
    border: none;
    border-bottom: 1px solid #eaecef;
    margin-bottom: 40px;
    width: 100%;
    &::placeholder {
        color: #eaecef;
    }
`;

const QuillWrapper = styled.div`
    .ql-editor {
        padding: 0;
        min-height: 320px;
        font-size: 17px;
        line-height: 1.5;
    }
    .ql-editor.ql-blank::before {
        left: 0;
        z-index: 1;

        &::placeholder {
            color: #eaecef;
        }
    }
`;

const Editor = ({ title = '', body = '' }) => {
    const [values, setValues] = useState({ title, body });
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            modules: {
                toolbar: [
                    [{ header: '1' }, { header: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'code-block', 'link', 'image']
                ]
            }
        });

        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                onChange({ target: { name: 'body', value: quill.root.innerHTML } });
            }
        });
    }, []);

    const onChange = useCallback(
        e => {
            setValues({ ...values, [e.target.name]: e.target.value });
        },
        [values, setValues]
    );

    return (
        <Container>
            <TitleInput placeholder="Title" onChange={onChange} name="title" value={values.title} />
            <QuillWrapper>
                <div ref={quillElement} />
            </QuillWrapper>
        </Container>
    );
};

export default Editor;
