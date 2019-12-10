import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { ADD_POST, EDIT_POST } from 'graphql/queries';

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
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
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
    border-top-right-radius: 5px;
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
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 15px;
    }
    .ql-editor.ql-blank::before {
        left: 0;
        z-index: 999;
    }
`;

const Editor = ({
    title: initialTitle,
    content: initialContent,
    id,
    editor,
    history,
    location
}) => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);
    const titleElement = useRef(null);
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [
        fn,
        { loading, error, data: { [editor ? 'editPost' : 'addPost']: post } = {} }
    ] = useMutation(editor ? EDIT_POST : ADD_POST);

    const onSubmit = useCallback(() => {
        const variables = {
            title,
            content
        };
        if (editor) variables.id = id;

        fn({ variables });
    }, [fn, title, content]);

    useEffect(() => {
        if (post) {
            history.push(`/post/${post.id}`);
        }
    }, [post]);

    useEffect(() => {
        if (editor) return;
        setTitle('');
        setContent('');
        titleElement.current.focus();
    }, [location.pathname]);

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
        quill.root.innerHTML = editor ? content : '';

        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') setContent(quill.root.innerHTML);
        });
    }, [setContent, location.pathname]);

    return (
        <Container>
            <TitleInput
                placeholder="Title"
                onChange={e => setTitle(e.target.value)}
                name="title"
                value={title}
                autoFocus
                ref={titleElement}
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
