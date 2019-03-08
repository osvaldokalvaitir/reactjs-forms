import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";

import api from "../../services/api";

const tech = [
  { value: 1, label: "ReactJS" },
  { value: 2, label: "NodeJS" },
  { value: 3, label: "React Native" }
];

const UserForm = ({
  handleSubmit,
  errors,
  values,
  handleChange,
  setFieldValue
}) => (
  <form onSubmit={handleSubmit}>
    <input
      placeholder="Nome"
      type="text"
      name="name"
      onChange={handleChange}
      value={values.name}
    />

    {!!errors.name && <span>{errors.name}</span>}

    <input
      placeholder="E-mail"
      type="email"
      name="email"
      onChange={handleChange}
      value={values.email}
    />

    {!!errors.email && <span>{errors.email}</span>}

    <input
      placeholder="Senha"
      type="password"
      name="password"
      onChange={handleChange}
      value={values.password}
    />

    {!!errors.password && <span>{errors.password}</span>}

    <input
      placeholder="Confirmação"
      type="password"
      name="password_confirmation"
      onChange={handleChange}
      value={values.password_confirmation}
    />

    {!!errors.password_confirmation && (
      <span>{errors.password_confirmation}</span>
    )}

    <Select
      placeholder="Tecnologias"
      options={tech}
      isMulti
      onChange={value => setFieldValue("tech", value)}
      value={values.tech}
    />

    <button type="submit">Enviar</button>
  </form>
);

export default withFormik({
  mapPropsToValues: () => ({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  }),

  validateOnChange: false,
  validateOnBlur: false,

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    email: Yup.string()
      .email("E-mail inválido")
      .required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "As senhas não batem")
      .required("Campo obrigatório")
  }),

  handleSubmit: (values, { props }) => {
    const { id } = props.match.params;

    const data = {
      ...values,
      tech: values.tech.map(t => t.value)
    };

    api.postOrPut("users", id, data);
  }
})(UserForm);
