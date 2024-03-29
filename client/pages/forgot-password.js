import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context/index";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  // state
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

  // context
    const {
    state: { user },
    } = useContext(Context);
  // router
    const router = useRouter();

  // redirect if user is logged in
    useEffect(() => {
    if (user !== null) router.push("/");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post("/api/forgot-password", { email });
            setSuccess(true);
            toast("Check your email for the verification code");
            setLoading(false);
        } catch (err) {
        setLoading(false);
        toast(err.response.data);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post("/api/reset-password", { email, newPassword, code });
            setEmail('');
            setCode('');
            setNewPassword('');
            setLoading(false);
            toast("Password changed, Please log back in.")
        }catch (err) {
            setLoading(false);
            toast(err.response.data);
        }
    };

    return (
        <>
            <h1 className="p-5 mb-4 bg-light rounded-3 text-center square">
                نسيت كلمة السر 
            </h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={success ? handleResetPassword : handleSubmit}>
                    <input
                    type="email"
                    className="form-control mb-4 p-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل البريد الإلكتروني"
                    required
                    />
            {success && (
            <>
                <input
                    type="text"
                    className="form-control mb-4 p-4"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="أدخل رمز التحقق"
                    required
                />

                <input
                    type="password"
                    className="form-control mb-4 p-4"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="كلمة سر جديدة"
                    required
                />
            </>)}
            <button
                type="submit"
                className="btn btn-primary btn-block p-2"
                disabled={loading || !email}
                >
                {loading ? <SyncOutlined spin /> : "ارسال"}
            </button>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
