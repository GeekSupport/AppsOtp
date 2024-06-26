import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.tsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Telegram} from "@twa-dev/types";
import Settings from "./pages/Settings.tsx";
import Accounts from "./pages/Accounts.tsx";
import NewAccount from "./pages/NewAccount.tsx";
import {EncryptionManagerProvider} from "./managers/encryption.tsx";
import ManualAccount from "./pages/ManualAccount.tsx";
import {CreateAccount} from "./pages/CreateAccount.tsx";
import EditAccount from "./pages/EditAccount.tsx";

import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import {StorageManagerProvider} from "./managers/storage.tsx";

import "./global.css";
import {SettingsManagerProvider} from "./managers/settings.tsx";
import PasswordSetup from "./pages/PasswordSetup.tsx";
import ResetAccounts from "./pages/ResetAccounts.tsx";
import {PlausibleAnalyticsProvider} from "./components/PlausibleAnalytics.tsx";
import {BiometricsManagerProvider} from "./managers/biometrics.tsx";

declare global {
    interface Window {
        Telegram: Telegram;
    }
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index={true} element={<Accounts />} />
            <Route path="new" element={<NewAccount />} />
            <Route path="manual" element={<ManualAccount />} />
            <Route path="create" element={<CreateAccount />} />
            <Route path="edit" element={<EditAccount />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reset" element={<ResetAccounts />} />
            <Route path="changePassword" element={<PasswordSetup change/>} />
        </Route>
    ),
    {
        basename: import.meta.env.BASE_URL,
    },
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PlausibleAnalyticsProvider domain={import.meta.env.VITE_PLAUSIBLE_DOMAIN}
                                apiHost={import.meta.env.VITE_PLAUSIBLE_API_HOST}>
      <SettingsManagerProvider>
          <BiometricsManagerProvider requestReason="Izinkan akses ke biometrik untuk dapat mendekripsi akun Anda"
                                     authenticateReason="Otentikasi untuk mendekripsi akun Anda">
                  <EncryptionManagerProvider>
                      <StorageManagerProvider>
                          <RouterProvider router={router}/>
                      </StorageManagerProvider>
                  </EncryptionManagerProvider>
          </BiometricsManagerProvider>
      </SettingsManagerProvider>
    </PlausibleAnalyticsProvider>
  </React.StrictMode>,
)
