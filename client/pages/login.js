import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {SyncOutlined} from '@ant-design/icons';
import Link from 'next/link'
import {Context} from '../context';
import {useRouter} from 'next/router';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    


//state
const {state, dispatch} = useContext(Context);
const {user} = state;
// console.log("STATE", state);

const router = useRouter();


useEffect(() => {
    if(user !== null) router.push("/")
}, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.table({name, email, password});
        try{
            setLoading(true);
            const {data} = await axios.post(`/api/login`, {
                email,
                password,
                });
        // console.log("LOGIN RESPONSE",data);
        dispatch({
            type: "LOGIN",
            payload: data
        });
        //save in local storage
        window.localStorage.setItem('user', JSON.stringify(data));
        
        //redirect to user dashboard
        router.push("/user");
        // toast.success('Login Successful!');
        // setLoading(false);
        } catch (err){
            toast.error(err.response.data);
            setLoading(false);
        }
    }
    
    
    
    
    return(
        <>
            <h1 className = "p-5 mb-4 bg-light rounded-3 text-center square">تسجيل الدخول</h1>

            <div className = "container col-md-4 offset-md-4 pb-5">
                <form onSubmit = {handleSubmit}> 

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
                        disabled = {!email || !password || loading}
                        >
                            {loading ? <SyncOutlined spin /> : "الإرسال"}
                    </button>
                </form>

                <p className='text-center pt-3'>
                    لم تسجل؟{' '}
                    <Link href = "/register">
                        سجل هنا
                    </Link>
                </p>

                <p className='text-center'>
                    <Link href = "/forgot-password" className = 'text-danger'>
                    هل نسيت كلمة السر؟
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Login;