"use client";
import style from "./Form.module.scss";

import { useRef, useState, FormEvent, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation'

// PrimeReact
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from 'primereact/progressspinner';

// Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { setMessage } from "@/redux/auth/slice";
import { selectAuth } from "@/redux/auth/selectors";
import { reqSignIn, reqSignUp } from "@/redux/auth/asyncActions";

const FormAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const toast = useRef<Toast>(null);
  
  const router = useRouter();
  const pathname = usePathname();
  const formCurrent = pathname.includes('signin');

  // Redux
  const dispatch = useAppDispatch();
  const { isLoading, statusCode, message } = useSelector(selectAuth);

  const showMessage = (
    severity: "success" | "info" | "warn" | "error" | undefined,
    summary: string,
    detail: string,
    life: number
  ) => {
    toast.current?.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
    });
  };

  const checkValieEmail = (value: string) => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return value.match(isValidEmail);
  }

  const submitForm = async (e: FormEvent) => {
    try {
        e.preventDefault();

        // Проверка Имени и Фамилии
        if (!formCurrent) {
            if (firstName.length < 0) {
                showMessage('warn', 'Предупреждение', 'Имя не должно быть пустым', 2000);
                return;
            }
            if (lastName.length < 0) {
                showMessage('warn', 'Предупреждение', 'Фамилия не должна быть пустым', 2000)
                return;
            }
        }
        // Проверка Почты
        if(!checkValieEmail(email)){
            showMessage('warn', 'Предупреждение', 'Не правильный Email Адрес', 2000);
            return;
        }
        // Проверка пароля
        if (password.length < 8) {
            showMessage('warn', 'Предупреждение', 'Пароль должен быть минимум 8 символов', 2000);
            return;
        }

        // Отправка Формы'
        if (formCurrent) {
            let formData = {
                email: email,
                password: password,
            };

            await dispatch(reqSignIn(formData))
        } else {
            let formData = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
            };

            await dispatch(reqSignUp(formData))
        }
        
    } catch (err) {
        console.log('Error Submit Form Auth');
    }
  };

  useEffect(() => {
    if (!formCurrent) {
        if (statusCode === 201 && message.length > 0) {
            showMessage('success', 'Успех', 'Успешная регистрация', 3000);
            setTimeout(() => {
                router.push('/auth/signin');
            }, 4000);
        } else {
            if (message.length > 0) {
                showMessage('warn', 'Предупреждение', message, 5000);
            }
        }
    } else {
        if (statusCode === 200) {
            showMessage('success', 'Успех', 'Успешная авторизация', 3000);
            setTimeout(() => {
                router.push('/app');
            }, 4000);
        } else {
            if (message.length > 0) {
                showMessage('warn', 'Предупреждение', message, 5000);
            }
        }
    }

    return () => {
        dispatch(setMessage(''));
    }
  }, [dispatch, statusCode, message, router])

  return (
    <div>
      <form onSubmit={submitForm}>
        {!formCurrent && (
            <>
                <div className={`card flex justify-content-center ${style.block_firstname}`}>
                    <span className="p-float-label">
                        <InputText
                        id="fisrtname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{ width: "100%" }}
                        />
                        <label htmlFor="fisrtname">Имя</label>
                    </span>
                
                </div>
                <div className={`card flex justify-content-center ${style.block_lastname}`}>
                    <span className="p-float-label">
                        <InputText
                        id="lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{ width: "100%" }}
                        />
                        <label htmlFor="lastname">Фамилия</label>
                    </span>
                </div>
            </>
        )}
        <div className="card flex justify-content-center">
          <span className="p-float-label">
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%" }}
            />
            <label htmlFor="email">Email</label>
          </span>
        </div>
        <div className={`card flex justify-content-center ${style.block_password}`}>
          <span className="p-float-label">
            <Password
              inputId="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%" }}
            />
            <label htmlFor="password">Password</label>
          </span>
        </div>
        <Button 
            rounded
            disabled={
                formCurrent
                    ? (email.length <= 0 || password.length < 8 ? true : false)
                    : (email.length <= 0 || password.length < 8 || firstName.length <= 0 || lastName.length <= 0 ? true : false)}
            type="submit"
            label={formCurrent ? "Логин" : "Зарегистрироваться"}
            severity="info"
        />
      </form>
      <div>
        <Toast ref={toast} position="top-right" />
      </div>
      {isLoading && (
        <div className={style.loading}>
          <ProgressSpinner />
        </div>
      )}
    </div>
  );
};

export default FormAuth;
