import style from "./SignUp.module.scss";

import Link from "next/link";

import FormAuth from "../Form/Form";
import DescBlock from "../DescBlock/DescBlock";

const SignUp = () => {
  return (
    <div className={style.signup_page}>
      <main>
        <DescBlock
          title="Заполните форму регистрации"
          text="И присоединяйтесь к нам"
        />
        <div className={style.right_block}>
          <h1>Создание аккаунта</h1>
          <p>
            У вас уже есть аккаунта? <Link href="signin">Логин</Link>
          </p>
          <FormAuth />
        </div>
      </main>
    </div>
  );
};

export default SignUp;
