import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { t, i18n } = useTranslation();
  const { sendCode, verifyCode, loginWithPassword, setPassword, hasPassword, isNewUser, role } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPasswordValue] = useState("");
  const [step, setStep] = useState<"send" | "verify" | "password">("send");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus(null);
    try {
      await sendCode(phone);
      setStep("verify");
      setStatus(i18n.language === "fa" ? "کد ارسال شد" : "Code sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send code");
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus(null);
    try {
      await verifyCode(phone, code);
      setStatus(t("auth.loggedIn"));
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    }
  };

  const handlePasswordLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus(null);
    try {
      await loginWithPassword(phone, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const handleSetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus(null);
    try {
      await setPassword(password);
      setStatus(i18n.language === "fa" ? "رمز ثبت شد" : "Password saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set password");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">{t("nav.login")}</p>
          <h1>{t("auth.loginTitle")}</h1>
          <p className="lede">{t("auth.remember")}</p>
        </div>
      </div>
      <div className="cards two-col">
        <article className="card">
          <h3>{t("auth.smsLoginTitle")}</h3>
          <form onSubmit={step === "send" ? handleSendCode : handleVerify} className="grid">
            <label className="input">
              <span>{t("auth.phone")}</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="09xxxxxxxxx" />
            </label>
            {step !== "send" && (
              <label className="input">
                <span>{t("auth.code")}</span>
                <input value={code} onChange={(e) => setCode(e.target.value)} required placeholder="1234" />
              </label>
            )}
            <button className="btn primary" type="submit">
              {step === "send" ? t("auth.sendCode") : t("auth.verifyCode")}
            </button>
          </form>
        </article>
        <article className="card">
          <h3>{t("auth.passwordLogin")}</h3>
          <form onSubmit={handlePasswordLogin} className="grid">
            <label className="input">
              <span>{t("auth.phone")}</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </label>
            <label className="input">
              <span>{t("auth.password")}</span>
              <input type="password" value={password} onChange={(e) => setPasswordValue(e.target.value)} required />
            </label>
            <button className="btn secondary" type="submit">
              {t("auth.passwordLogin")}
            </button>
          </form>
          {!hasPassword && role && (
            <form onSubmit={handleSetPassword} className="grid" style={{ marginTop: "0.75rem" }}>
              <label className="input">
                <span>{t("auth.setPassword")}</span>
                <input type="password" value={password} onChange={(e) => setPasswordValue(e.target.value)} required />
              </label>
              <button className="btn primary" type="submit">
                {t("auth.setPassword")}
              </button>
            </form>
          )}
          {isNewUser && <p className="status info">{t("auth.newUser")}</p>}
        </article>
      </div>
      {status && <p className="status success">{status}</p>}
      {error && <p className="status error">{error}</p>}
    </div>
  );
}

export default LoginPage;
