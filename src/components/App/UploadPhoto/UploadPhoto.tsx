'use client';
import style from './UploadPhoto.module.scss';

import { useRef, useEffect } from 'react';

import Image from 'next/image';

// PrimeReact
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { Toast } from "primereact/toast";


// Redux
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { setMessage } from '@/redux/photo/slice';
import { selectPhoto } from '@/redux/photo/selectors';
import { reqUploadPhoto } from '@/redux/photo/asyncActions';

import { Logo } from '@/components/Utils/Logo/Logo';

const UploadPhoto = () => {
    const toast = useRef<Toast>(null);
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
    // Redux
    const dispatch = useAppDispatch();
    const { isLoading, statusCode, message } = useSelector(selectPhoto);

    // Upload File
    const onUpload = async (event: FileUploadHandlerEvent) => {
        const file = event.files[0];
        dispatch(reqUploadPhoto({
            file: file
        }));
    };

    useEffect(() => {
        if (statusCode == 201 && message.length > 0) {
            showMessage('success', 'Успех', 'Фото успешно добавленно', 3000);
            setTimeout(() => {
                window.location.href = 'app/menu'
            }, 4000);
        } else {
            if (message.length > 0) {
                showMessage('warn', 'Предупреждение', message, 5000);
            }
        }
        return () => {
            dispatch(setMessage(''));
        }
    }, [dispatch, isLoading, statusCode, message])
    
    return (
        <div className={style.upload_photo}>
            <header>
                <Logo height={100} width={100} />
            </header>
            <main>
                <div className={style.left_block}>
                    <div className={style.description_block}>
                        <h1>Добавьте вашу фотографию</h1>
                        <p>Что люди запомнили вас, и смогли увидеть</p>
                    </div>
                    <div className={style.card}>
                        <FileUpload
                            name="demo[]"
                            url={'/api/upload'}
                            accept="image/*"
                            maxFileSize={1000000}
                            customUpload
                            uploadHandler={onUpload}
                            emptyTemplate={
                                <p className="m-0">Перетащите сюда ваше фото для загрузки.</p>
                            }
                        />
                    </div>
                </div>
                <div className={style.right_block}>
                    <Image src='/App/Upload/photo.png' height={682} width={482} alt='photo'></Image>
                </div>
            </main>
            <div>
                <Toast ref={toast} position="top-right" />
            </div>
        </div>
    )
}

export default UploadPhoto;