import style from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={style.preloader}>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.loader}>
            <div className={style.dot}></div>
          </div>
          <div className={style.loader}>
            <div className={style.dot}></div>
          </div>
          <div className={style.loader}>
            <div className={style.dot}></div>
          </div>
          <div className={style.loader}>
            <div className={style.dot}></div>
          </div>
          <div className={style.loader}>
            <div className={style.dot}></div>
          </div>
          <div className={style.loader}>
            <div className={style.dot}></div>
          </div>
        </div>
        <div className={style.text}>Please wait</div>
      </div>
    </div>
  );
};
