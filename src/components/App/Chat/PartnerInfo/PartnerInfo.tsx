import style from "./PartnerInfo.module.scss";
import { useEffect } from "react";

import Image from "next/image";

// Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { selectPartner } from "@/redux/partner/selectors";
import { reqGetPartnerInfo } from "@/redux/partner/asyncActions";

import { SERVER_STORAGE } from "@/constants";

type Props = {
  currentDialogId: number | null;
};

const PartnerInfo = ({ currentDialogId }: Props) => {
  const dispatch = useAppDispatch();
  const { partner } = useSelector(selectPartner);

  useEffect(() => {
    if (currentDialogId) {
      dispatch(reqGetPartnerInfo(currentDialogId));
    }
  }, [dispatch, currentDialogId]);
  return (
    <div className={style.user_info}>
      {partner ? (
        <>
          <div className={style.user_info__avatar}>
            <Image
              width={130}
              height={130}
              alt="user_photo"
              src={`${SERVER_STORAGE}/${partner.photo}`}
            ></Image>
          </div>
          <div className={style.user_info__name}>
            <p>{partner.firstName} {partner.lastName}</p>
          </div>
          <div className={style.user_info__email}>
            <p>{partner.email}</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PartnerInfo;
