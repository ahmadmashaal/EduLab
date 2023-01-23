import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {SyncOutlined} from '@ant-design/icons';
import Link from 'next/link';
import {Context} from '../context';
import {useRouter} from 'next/router';
import user from "../../server/models/user";

// const user = require('../../server/models/user');

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        state: {user},
    } = useContext(Context);
    // const {user} = state;

    // user = useContext(Context);

    const router = useRouter();
    
    useEffect(() => {
    if(user !== null) router.push("/");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.table({name, email, password});
        try{
            setLoading(true);
            const {data} = axios.post(`/api/register`, {
                name,
                email,
                password,
                });
        // console.log("REGISTER RESPONSE",data);
        toast.success('تم التسجيل بنجاح. الرجاء تسجيل الدخول');
        setName('');
        setEmail('');
        setPassword('');
        setLoading(false);
        } catch (err){
            toast.error(err.response.data);
            setLoading(false);
        }
    }
    
    
    
    
    return(
        <>
            <h1 className = "p-5 mb-4 bg-light rounded-3 text-center square">انشاء حساب</h1>

            <div className = "container col-md-4 offset-md-4 pb-5">
                <form onSubmit = {handleSubmit}> 
                    <input
                    type="text"
                    className="form-control mb-4 p-4"
                    value = {name}
                    onChange={e => setName(e.target.value)}
                    placeholder = "أدخل الاسم"
                    required
                    />

                    <input
                    type="email"
                    className="form-control mb-4 p-4"
                    value = {email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder = "أدخل البريد الإلكتروني"
                    required
                    />
                    
                    <input
                    type="password"
                    className="form-control mb-4 p-4"
                    value = {password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder = "أدخل كلمة المرور"
                    required
                    />


                    <button type = "submit" className = "btn btn-block btn-primary"
                        disabled = {!name || !email || !password || loading}
                        >
                            {loading ? <SyncOutlined spin /> : "ارسال"}
                    </button>
                </form>

                <p className='text-center p-3'>
                    مسجل بالفعل؟{' '}
                    <Link href = "/login">
                        سجل دخولك
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Register;