import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import hljs from 'highlight.js';
import 'highlight.js/styles/darcula.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { ADD_POST, EDIT_POST } from 'graphql/queries';
import { showNoti } from 'store/actions/noti';
import palette from 'styles/palette';

const Container = styled.section`
    position: relative;
`;

const TitleInput = styled.input`
    font-size: 38px;
    color: ${palette.gray[8]};
    outline: none;
    padding-bottom: 10px;
    border: none;
    border-top: 1px solid ${palette.gray[1]};
    border-left: 1px solid ${palette.gray[1]};
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
    color: ${palette.gray[6]};
    top: 0;
    right: 0px;
    height: 66px;
    width: 66px;
    outline: none;
    border: none;
    border-top: 1px solid ${palette.gray[1]};
    border-left: 1px solid ${palette.gray[1]};
    border-right: 1px solid ${palette.gray[1]};
    border-top-right-radius: 5px;
    transition: all 0.4s ease-in-out;

    @media (hover: hover) {
        &:hover {
            background: ${palette.blue[5]};
            color: ${palette.gray[0]};
        }
    }
`;

const QuillWrapper = styled.div`
    .ql-editor {
        color: ${palette.gray[8]};
        min-height: calc(100vh - 320px);
        font-size: 17px;
        line-height: 1.5;
        border: 1px solid ${palette.gray[1]};
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 15px;
        white-space: normal;
    }

    .ql-editor.ql-blank::before {
        left: 0;
        z-index: 999;
    }
`;

hljs.configure({
    languages: ['javascript', 'python']
});

const modules = {
    syntax: {
        highlight: text => hljs.highlightAuto(text).value
    },
    toolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'video',
    'code-block'
];

const Editor = ({
    title: initialTitle,
    content: initialContent,
    id,
    editor,
    history,
    location
}) => {
    const dispatch = useDispatch();
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
    }, [fn, title, content, editor, id]);

    const onChange = useCallback(
        value => {
            setContent(value);
        },
        [setContent]
    );

    useEffect(() => {
        if (post) {
            history.push(`/post/${post.id}`, { notiOnNextPage: true });
            dispatch(showNoti(`Successfully ${editor ? 'updated' : 'added'}`, 'primary', 3));
        }
    }, [post, dispatch, history, editor]);

    useEffect(() => {
        if (editor) return;
        setTitle('');
        setContent('');
        titleElement.current.focus();
    }, [editor, location.pathname]);

    useEffect(() => {
        if (error) {
            dispatch(showNoti(error.message, 'danger', 3));
        }
    }, [error, dispatch]);

    return (
        <Container>
            <TitleInput
                placeholder="Title"
                onChange={e => setTitle(e.target.value)}
                name="title"
                value={title}
                ref={titleElement}
                autoFocus
            />
            <SubmitButtom onClick={onSubmit} disabled={loading} tabIndex="-1">
                +
            </SubmitButtom>
            <QuillWrapper>
                <ReactQuill
                    defaultValue={content}
                    onChange={onChange}
                    theme="bubble"
                    modules={modules}
                    formats={formats}
                />
            </QuillWrapper>
        </Container>
    );
};

export default withRouter(Editor);
