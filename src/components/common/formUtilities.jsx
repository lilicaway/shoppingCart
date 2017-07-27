import React from 'react'; // required because we use jsx.

// Adapted from http://redux-form.com/7.0.0/examples/syncValidation/

export const validatableFieldRenderer = ({ input, label, type, meta: { touched, error, warning } }) =>
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      ((error &&
        <span>
          {error}
        </span>) ||
        (warning &&
          <span>
            {warning}
          </span>))}
  </div>;

export const parseAsFloat = (value, name) => {
  return parseFloat(value);
};

export const parseAsInt = (value, name) => {
  return parseInt(value, 10);
};
