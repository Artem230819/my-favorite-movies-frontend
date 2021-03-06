import { Form, Field } from "react-final-form";
import LockIcon from "@mui/icons-material/Lock";
import { ErrorAuth, FormWrapper } from "./css";
import { useTranslation } from "react-i18next";
import { AuthUser } from "services/AuthUser";
import { useHistory } from "react-router-dom";
import { FORM_ERROR } from "final-form";
import IUserCredentials from "types/UserCredentials";

export const LoginForm = () => {
  const { t } = useTranslation();

  const formValidate = (values: IUserCredentials) => {
    let errors = {};
    if (!values.username) {
      errors = { ...errors, username: t("page.login.required") };
    }
    if (!values.password) {
      errors = { ...errors, password: t("page.login.required") };
    }
    return errors;
  };

  const history = useHistory();
  const handleSubmitAuth = (values: IUserCredentials) => {
    if (!AuthUser({ username: values.username, password: values.password })) {
      return { [FORM_ERROR]: t("page.login.loginFailed") };
    }
    localStorage.setItem("Auth", "1");
    history.push("/");
  };
  return (
    <FormWrapper>
      <Form
        validate={(values) => formValidate(values)}
        onSubmit={handleSubmitAuth}
        render={({ submitError, handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field name="username">
              {({ input, meta }) => (
                <div>
                  <label>{t("page.login.username")}</label>
                  <input
                    {...input}
                    type="text"
                    placeholder={t("page.login.username")}
                  />
                  {meta.error && meta.touched && (
                    <ErrorAuth>{meta.error}</ErrorAuth>
                  )}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <label>{t("page.login.password")}</label>
                  <input
                    {...input}
                    type="password"
                    placeholder={t("page.login.password")}
                  />
                  {meta.error && meta.touched && (
                    <ErrorAuth>{meta.error}</ErrorAuth>
                  )}
                </div>
              )}
            </Field>
            {submitError && <ErrorAuth>{submitError}</ErrorAuth>}
            <div>
              <button type="submit" disabled={submitting}>
                <span>
                  <LockIcon color="primary" sx={{ fontSize: 20 }} />
                </span>
                {t("page.login.btn")}
              </button>
            </div>
          </form>
        )}
      />
    </FormWrapper>
  );
};
