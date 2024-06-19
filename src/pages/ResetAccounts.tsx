import {FC, useContext, useState} from "react";
import {Stack, Typography} from "@mui/material";
import {StorageManagerContext} from "../managers/storage.tsx";
import useTelegramMainButton from "../hooks/telegram/useTelegramMainButton.ts";
import LottieAnimation from "../components/LottieAnimation.tsx";
import TelegramTextField from "../components/TelegramTextField.tsx";
import PasswordResetAnimation from "../assets/password_reset_lottie.json";
import {useNavigate} from "react-router-dom";

const ResetAccounts: FC = () => {
    const [phrase, setPhrase] = useState("");
    const [verified, setVerified] = useState(false);
    const storageManager = useContext(StorageManagerContext);
    const navigate = useNavigate();
    useTelegramMainButton(() => {
        if (!verified) return false;
        storageManager?.clearStorage();
        navigate("/");
        return true;
    }, "Hapus SECARA PERMANEN", !verified);

    return <>
        <Stack spacing={2} alignItems="center">
            <LottieAnimation animationData={PasswordResetAnimation}/>
            <Typography variant="h5" fontWeight="bold" align="center">
                Penyetelan ulang kata sandi
            </Typography>
            <Stack>
                <Typography variant="subtitle2" align="center">
                    Anda akan menghapus semua akun Anda <b>SECARA PERMANEN</b>. You won&apos;Anda tidak dapat memulihkannya.
                </Typography>
                <Typography variant="subtitle2" align="center">
                    Jika Anda benar-benar yakin, ketikkan frasa tersebut
                </Typography>
                <Typography variant="subtitle2" align="center" fontWeight={900}>
                    &quot;Ya, hapus semuanya&quot;:
                </Typography>
            </Stack>
            <TelegramTextField
                fullWidth
                type="phrase"
                label="Hapus akun Anda dan setel ulang kata sandi?"
                value={phrase}
                error={!verified}
                helperText={!verified ? "Jenis \"Ya, hapus semuanya\"" : null}
                onChange={e => {
                    const value = e.target.value;
                    setPhrase(value);
                    setVerified(value.trim().toLowerCase() === "ya, hapus semuanya");
                }}
            />
        </Stack>
    </>;
}

export default ResetAccounts;
