import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { ADD_POST } from 'graphql/queries';

const Container = styled.section`
    position: relative;
`;

const TitleInput = styled.input`
    font-size: 38px;
    color: #2c3e50;
    outline: none;
    padding-bottom: 10px;
    border: none;
    border-top: 1px solid #eaecef;
    border-left: 1px solid #eaecef;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px 15px;
    width: 100%;

    &::placeholder {
        color: #eaecef;
    }
`;

const SubmitButtom = styled.button`
    cursor: pointer;
    font-size: 30px;
    position: absolute;
    font-weight: 300;
    color: #4e6e8e;
    top: 0;
    right: 0px;
    height: 66px;
    width: 66px;
    outline: none;
    border: none;
    border-top: 1px solid #eaecef;
    border-left: 1px solid #eaecef;
    border-right: 1px solid #eaecef;
    border-top-right-radius: 10px;
    transition: all 0.4s ease-in-out;

    @media (hover: hover) {
        &:hover {
            background: #357ac6;
            color: white;
        }
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
    }
`;

const Editor = ({ title: initialTitle, content: initialContent, history }) => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [addPost, { loading, error, data }] = useMutation(ADD_POST);

    const onSubmit = useCallback(() => {
        addPost({ variables: { title, content } });
    }, [addPost, title, content]);

    useEffect(() => {
        if (data) {
            history.push(`/post/${data.addPost.id}`);
        }
    }, [data]);

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
        if (content) quill.root.innerHTML = initialContent;

        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') setContent(quill.root.innerHTML);
        });
    }, [setContent]);

    return (
        <Container>
            <TitleInput
                placeholder="Title"
                onChange={e => setTitle(e.target.value)}
                name="title"
                value={title}
                autoFocus
            />
            <SubmitButtom onClick={onSubmit} disabled={loading} tabIndex="-1">
                +
            </SubmitButtom>
            <QuillWrapper>
                <div ref={quillElement} />
            </QuillWrapper>
        </Container>
    );
};

export default withRouter(Editor);
