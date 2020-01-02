import React from 'react';
import styled from 'styled-components';

import { palette } from 'styles';

const FormContainer = styled.form`
    width: 400px;
`;

const Input = styled.input`
    display: block;
    border-radius: 5px;
    padding: 10px;
    font-size: 18px;
    margin-bottom: 40px;
    width: 100%;
    border: none;
    background-color: ${palette.gray[1]};
    box-shadow: inset 0px 2px 3px rgba(0, 0, 0, 0.03);
    outline: none;
    color: ${palette.gray[8]};
`;

const Label = styled.label`
    color: ${palette.gray[8]};
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
    background-color: ${palette.blue[5]};
    color: ${palette.gray[1]};
    border-radius: 5px;
`;

const Form = ({ onSubmit, onChange, inputAttrs, values, buttonText, loading }) => {
    return (
        <FormContainer onSubmit={onSubmit}>
            {inputAttrs.map(item => (
                <div key={item.name}>
                    {item.label && <Label htmlFor={item.name}>{item.label}</Label>}
                    <Input
                        placeholder={item.placeholder}
                        value={values[item.name]}
                        id={item.name}
                        onChange={onChange}
                        {...item}
                    />
                </div>
            ))}
            <SubmitButton type="submit" disabled={loading}>
                {buttonText}
            </SubmitButton>
        </FormContainer>
    );
};

Form.defaultProps = {
    buttonText: 'Submit'
};

export default Form;
