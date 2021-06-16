import React from "react";
import ReactDOM from "react-dom";
import { Form, Formik, useFormikContext } from "formik";
import { EuiButtonGroup } from "@elastic/eui";
import "!style-loader!css-loader!sass-loader!./index.scss";

const Content = () => {
  const { values, handleChange } = useFormikContext<any>();
  const fieldNameOne = "a";
  const fieldNameTwo = "b";
  const fieldNameThree = "c";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <EuiButtonGroup
        id={fieldNameOne}
        idSelected={values[fieldNameOne]}
        legend=""
        onChange={(value: any) => {
          handleChange(fieldNameOne)(value);
        }}
        options={[
          { id: "Yes", label: "Yes" },
          { id: "No", label: "No" },
        ]}
      />
      <EuiButtonGroup
        id={fieldNameTwo}
        idSelected={values[fieldNameTwo]}
        legend=""
        onChange={(value: any) => {
          handleChange(fieldNameTwo)(value);
        }}
        options={[
          { id: "Yes", label: "Yes" },
          { id: "No", label: "No" },
        ]}
      />
      <EuiButtonGroup
        id={fieldNameThree}
        idSelected={values[fieldNameThree]}
        legend=""
        onChange={(value: any) => {
          handleChange(fieldNameThree)(value);
        }}
        options={[
          { id: "Yes", label: "Yes" },
          { id: "No", label: "No" },
        ]}
      />
    </div>
  );
};

const App = () => (
  <Formik initialValues={{ a: "", b: "", c: "" }} onSubmit={() => {}}>
    <Form>
      <Content />
    </Form>
  </Formik>
);

ReactDOM.render(<App />, document.getElementById("root"));
