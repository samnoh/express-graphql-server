import React from 'react';

import styled from 'styled-components';

const Title = styled.div``;

const _Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 60px 180px;
    border-radius: 7px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 20px 48px rgba(0, 0, 0, 0.05),
        0 1px 4px rgba(0, 0, 0, 0.1);
    transition: 0.2s ease-in;
    &:focus-within {
        transform: scale(1.025);
    }
`;

const Input = styled.input`
    display: block;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 10px;
    font-size: 18px;
    margin-bottom: 40px;
`;

const ErrorMessage = styled.label`
    font-weight: 600;
    margin-left: 2px;
    margin-bottom: 8px;
    display: inline-block;
`;

const SubmitButton = styled.button`
    cursor: pointer;
    font-size: 18px;
    border: none;
    width: 100%;
    height: 43px;
    background-color: #4295f7;
    color: white;
    border-radius: 5px;
`;

const Form = ({ onSubmit, onChange, inputAttrs, values, buttonText }) => {
    return (
        <_Form onSubmit={onSubmit}>
            {inputAttrs.map(item => (
                <div>
                    {item.label && <ErrorMessage for={item.name}>{item.label}</ErrorMessage>}
                    <Input
                        placeholder={item.placeholder}
                        type={item.type}
                        name={item.name}
                        value={values[item.name]}
                        id={item.name}
                        onChange={onChange}
                    />
                </div>
            ))}
            <SubmitButton type="submit">{buttonText}</SubmitButton>
        </_Form>
    );
};

Form.defaultProps = {
    buttonText: 'Submit'
};

export default Form;
