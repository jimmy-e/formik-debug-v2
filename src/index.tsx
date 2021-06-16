import React, { ChangeEventHandler } from "react";
import ReactDOM from "react-dom";
import { Form, Formik, useFormikContext } from "formik";
// eslint-disable-next-line import/no-webpack-loader-syntax
import "!style-loader!css-loader!sass-loader!./index.scss";
import './index.css';

interface Props {
  isChecked: 'true' | 'false';
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Switch: React.FC<Props> = ({ isChecked, onChange }) => (
  <div style={{ margin: '8px' }}>
    <label className="switch">
      <input type="checkbox" checked={isChecked === 'true'} onChange={onChange}/>
      <span className="slider round" />
    </label>
  </div>
);

const Content = () => {
  const { values, handleChange } = useFormikContext<any>();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Switch
        isChecked={values.a}
        onChange={() => handleChange('a')(values.a === 'true' ? 'false' : 'true')}
      />
      <Switch
        isChecked={values.b}
        onChange={() => handleChange('b')(values.b === 'true' ? 'false' : 'true')}
      />
      <Switch
        isChecked={values.c}
        onChange={() => handleChange('c')(values.c === 'true' ? 'false' : 'true')}
      />
    </div>
  );
};

const App = () => (
  <Formik initialValues={{ a: 'false', b: 'false', c: 'false' }} onSubmit={() => {}}>
    <Form>
      <Content />
    </Form>
  </Formik>
);

ReactDOM.render(<App />, document.getElementById("root"));
