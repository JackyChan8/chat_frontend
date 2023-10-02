import style from "./SignIn.module.scss";

import Link from "next/link";

import FormAuth from "../Form/Form";
import DescBlock from "../DescBlock/DescBlock";

const SignIn = () => {
  return (
    <div className={style.signin_page}>
      <main>
        <DescBlock title="Заполните форму входа" text="И начните общаться" />
        <div className={style.right_block}>
          <h1>Добро пожаловать</h1>
          <p>
            У вас нет аккаунта? <Link href="signup">Регистрация</Link>
          </p>
          <FormAuth />
        </div>
      </main>
    </div>
  );
};

export default SignIn;
