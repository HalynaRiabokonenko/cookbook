import React, { useState } from "react";
import styles from "./ImageUpload.module.css";
import classNames from "classnames";
import { useModeContext } from "../../../providers/mode";

interface ImageUploadTypes {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    photo?: string | null;
}

export const ImageUpload = ({ onChange, photo }: ImageUploadTypes) => {
    const { mode } = useModeContext();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file || null);
    };

    return (
        <div className={classNames(
            styles["image-upload--container"],
            styles[mode]
        )}>

            <input
                type="file"
                name="photo"
                accept="image/*"
                id="fileInput"
                onChange={(e) => {
                    onChange(e);
                    handleFileChange(e);
                }}
                className={classNames(
                    styles["image-upload--input"],
                    styles[mode]
                )}
            />
            <label htmlFor="fileInput" className={classNames(
                styles["image-upload--label"],
                styles[mode]
            )}>
                <div className={classNames(
                    styles["image-upload--image-container"],
                    styles[mode]
                )}>
                    {selectedFile ? selectedFile.name : (photo ? 'Change image ' : 'Add image ')}
                </div>
            </label>
        </div>
    );
};
