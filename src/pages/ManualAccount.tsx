import {Stack, Typography} from "@mui/material";
import {useState} from "react";
import ManualAnimation from "../assets/manual_lottie.json";
import useTelegramMainButton from "../hooks/telegram/useTelegramMainButton.ts";
import {useNavigate} from "react-router-dom";
import {NewAccountState} from "./CreateAccount.tsx";
import {TOTP} from "otpauth";
import TelegramTextField from "../components/TelegramTextField.tsx";
import LottieAnimation from "../components/LottieAnimation.tsx";

export default function ManualAccount() {
    const [secret, setSecret] = useState("");
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();
    useTelegramMainButton(() => {
        if(secret.length < 1) {
            setInvalid(true);
            return false;
        }
        try {
            navigate("/create", {state: {
                    otp: new TOTP({
                        label: "AppsOTP",
                        secret
                    }),
                } as NewAccountState});
            return true;
        } catch (e) {
            setInvalid(true);
            return false;
        }

    }, "Next");

    return <Stack spacing={2} alignItems="center">
        <LottieAnimation animationData={ManualAnimation}/>
        <Typography variant="h5" fontWeight="bold" align="center">
            Tambahkan akun secara manual
        </Typography>
        <Typography variant="subtitle2" align="center">
            Masukkan rahasia akun yang diberikan
        </Typography>
        <TelegramTextField
            fullWidth
            label="Rahasia"
            value={secret}
            error={invalid}
            helperText={invalid ? "Rahasia tidak valid" : null}
            onChange={e => {
                setSecret(e.target.value);
                setInvalid(false);
            }}
        />
    </Stack>;
}
