"use client";

// PrimeReact
import { Avatar } from "primereact/avatar";

// Redux
import { useSelector } from "react-redux";
import { selectProfile } from "@/redux/profile/selectors";
import { SERVER_STORAGE } from "@/constants";

const AvatarUser = () => {
  const { profile } = useSelector(selectProfile);

  return (
    <div>
      <Avatar
        size="xlarge"
        shape="circle"
        image={
          profile
            ? `${SERVER_STORAGE}/${profile.photo.filename}`
            : "/App/Menu/Header/avatar.png"
        }
      />
    </div>
  );
};

export default AvatarUser;
